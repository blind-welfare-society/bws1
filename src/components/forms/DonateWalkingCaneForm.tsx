'use client'
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "@/lib/axios";
import { useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface FormData {
   donation_amount: number;
   amount_choosed: string;
   first_name: string;
   last_name: string;
   email: string;
   phone: string;
   form_80G: string;
   pan?: string;
   address?: string;
   country?: string;
   state?: string;
   city?: string;
   pincode?: string;
}

const schema = yup
   .object({
      donation_amount: yup.number()
      .required("Donation Amount is required")
      .min(400, "Enter other amount - ₹400 or more")
      .label("Donation Amount"),
      amount_choosed: yup.string().required().label("Amount Choosed"),
      first_name: yup.string().required().label("First Name"),
      last_name: yup.string().required("Last name is required"),
      email: yup.string().required().email().label("Enter Email"),
      phone: yup.string()
         .required('Phone number is required')
         .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
      form_80G: yup.string().required(),
      pan: yup.string().when("form_80G", (form_80G: string[], schema) => form_80G[0] === "1" 
         ? schema.required("PAN is required for 80G receipt") 
         : schema.notRequired()
      ),
      address: yup.string().when("form_80G", (form_80G: string[], schema) => form_80G[0] === "1" 
         ? schema.required("Address is required for 80G receipt") 
         : schema.notRequired()
      ),
      country: yup.string().when("form_80G", (form_80G: string[], schema) => form_80G[0] === "1" 
         ? schema.required("Country is required for 80G receipt") 
         : schema.notRequired()
      ),
      state: yup.string().when("form_80G", (form_80G: string[], schema) => form_80G[0] === "1" 
         ? schema.required("state is required for 80G receipt") 
         : schema.notRequired()
      ),
      city: yup.string().when("form_80G", (form_80G: string[], schema) => form_80G[0] === "1" 
         ? schema.required("City is required for 80G receipt") 
         : schema.notRequired()
      ),
      pincode: yup.string().when("form_80G", (form_80G: string[], schema) => form_80G[0] === "1" 
         ? schema.required("Pincode is required for 80G receipt") 
         : schema.notRequired()
      ),
   })
   .required();

const DonateWalkingCaneForm = () => {
   const searchParams = useSearchParams();

   const utm_source = searchParams.get('utm_source');
   const utm_medium = searchParams.get('utm_medium');
   const utm_campaign = searchParams.get('utm_campaign');
   const utm_content = searchParams.get('utm_content');
   const utm_id = searchParams.get('utm_id');
   const utm_term = searchParams.get('utm_term');

   const [currentUrl, setCurrentUrl] = useState('');
    
    useEffect(() => {
    // Access window only after the component is mounted (client-side)
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.origin + window.location.pathname);
    }
    }, []);

   const [loading, setLoading] = useState(false); 

   useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
   }, []);

   const { register, handleSubmit, reset, formState: { errors }, setValue, watch} = useForm<FormData>({
      resolver: yupResolver(schema),
      defaultValues: {
         amount_choosed: "₹1200 will provide walking canes to 3 blind persons",
         form_80G: "0"
      }
   });
   
   const [donationAmount, setDonationAmount] = useState("1200");
   const [isEditable, setIsEditable] = useState(false);
   const is80GSelected = watch("form_80G") === "1";

   const handleRadioChange = (event:any) => {
    const selectedAmount = event.target.getAttribute("data-value");
      setDonationAmount(selectedAmount);
      setValue('donation_amount', selectedAmount);
      setIsEditable(selectedAmount === "0");
   };

   const handleAmountChange = (event:any) => {
      const inputAmount = event.target.value.replace(/[^0-9]/g, "");
      setDonationAmount(inputAmount);
   };

   const onSubmit = async (data: FormData) => {
      setLoading(true);
      try {
         const response = await axios.post('/save-walking-cain-data', {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email, // Adjust or pass from form
            donation_amount: data.donation_amount,
            amount_choosed: data.amount_choosed,
            pan: data.pan,
            address: data.address,
            country: data.country,
            state: data.state,
            city: data.city,
            pincode: data.pincode,
            phone: data.phone,
            form_80G: data.form_80G,
            utm_source: utm_source,
            utm_medium: utm_medium,
            utm_campaign: utm_campaign,
            utm_content: utm_content,
            utm_id: utm_id,
            utm_term: utm_term,
            sourceUrl: currentUrl
         });
         
         if (response.status === 200) {
            //console.log(response.data.data);
            const order_id    = response.data.data.order_id;
            const saveData_id = response.data.data.saveData_id;

            const options = {
               key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
               amount: response.data.amount,
               currency: "INR",
               name: "Blind Welfare Society",
               description: "Donation",
               image: "../../assets/img/logos/logo.png",
               order_id: order_id,
               handler: function (response:any) {
                     axios.post('/update-walking-cain-status', {
                        order_id: response.razorpay_order_id,
                        payment_id: response.razorpay_payment_id,
                        signature: response.razorpay_signature,
                        saveData_id: saveData_id
                     })
                     .then(function (response) {
                        const dynamicId = "walkingcane-" + saveData_id;
                        //console.log(dynamicId);
                        window.location.href = `/thank-you/${dynamicId}`;
                        
                     })
                     .catch(function (error) {
                        toast.error('Something went wrong. Please try again.', { position: 'top-center' });
                     });
               },
               prefill: {
                  name: `${data.first_name} ${data.last_name}`,
                  email: data.email,
                  contact: data.phone,
               },
               theme: {
                  color: "#F37254",
               },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
         } else {
          toast.error('Something went wrong. Please try again.', { position: 'top-center' });
         }
      } catch (error: any) {
         console.error('Error:', error.response?.data || error.message);
         toast.error('Failed to send message. Please check your network or try again.', { position: 'top-center' });
      }finally {
         setLoading(false); // Set loading to false after response is received
      }
   };

   return (
      <div className="donate-form-wrapper sub-donate">
         <form onSubmit={handleSubmit(onSubmit)} id="donateForm">
            <div className="row">
               <div className="col-md-12">
                  <h4>Select your Donation Option</h4>
                  <div className="form-group">
                     <input
                        type="text"
                        //value={isEditable ? donationAmount : `₹${donationAmount}.00`}
                        value={donationAmount}
                        data-validation="required"
                        className="form-control valid"
                        {...register("donation_amount")}
                        readOnly={!isEditable}
                        onChange={handleAmountChange} // Allow manual editing if editable
                        placeholder="Enter other amount - ₹400 or more"
                        id="donation_amount"
                        // Placeholder when empty
                     />
                     <p className="form_error">{errors.donation_amount?.message}</p>
                  </div>
                  <input type="radio" {...register("amount_choosed")} id="amount_choose1" value="₹400 will provide walking cane to 1 blind person" data-value="400" title="₹400 will provide walking cane to 1 blind person" data-field="fixed" onChange={handleRadioChange}></input>
                  <label htmlFor="amount_choose1" className="radiolable"> ₹400 will provide walking cane to 1 blind person</label>
                  <br />
                  <input type="radio" {...register("amount_choosed")} id="amount_choose2" value="₹1200 will provide walking canes to 3 blind persons" data-value="1200" title="₹1200 will provide walking canes to 3 blind persons" data-field="fixed" onChange={handleRadioChange}></input>
                  <label htmlFor="amount_choose2" className="radiolable">  ₹1200 will provide walking canes to 3 blind persons</label>
                  <br />
                  <input type="radio" {...register("amount_choosed")} id="amount_choose3" value="₹2000 will provide walking canes to 5 blind persons" data-value="2000" title="₹2000 will provide walking canes to 5 blind persons" data-field="fixed" onChange={handleRadioChange}></input>
                  <label htmlFor="amount_choose3" className="radiolable"> ₹2000 will provide walking canes to 5 blind persons</label>
                  <br />
                  <input type="radio" {...register("amount_choosed")} id="amount_choose4" value="₹4000 will provide walking canes to 10 blind persons" data-value="4000" title="₹4000 will provide walking canes to 10 blind persons" data-field="fixed" onChange={handleRadioChange}></input>
                  <label htmlFor="amount_choose4" className="radiolable"> ₹4000 will provide walking canes to 10 blind persons</label>
                  <br />
                  <input type="radio" {...register("amount_choosed")} id="amount_choose5" value="₹10000 will provide walking canes to 25 blind persons" data-value="10000" title="₹10000 will provide walking canes to 25 blind persons" data-field="fixed" onChange={handleRadioChange}></input>
                  <label htmlFor="amount_choose5" className="radiolable"> ₹10000 will provide walking canes to 25 blind persons</label>
                  <br />
                  <input type="radio" {...register("amount_choosed")} id="amount_choose6" value="₹20000 will provide walking canes to 50 blind persons" data-value="20000" title="₹20000 will provide walking canes to 50 blind persons" data-field="fixed" onChange={handleRadioChange}></input>
                  <label htmlFor="amount_choose6" className="radiolable"> ₹20000 will provide walking canes to 50 blind persons</label>
                  <br />
                  <input type="radio" {...register("amount_choosed")} id="amount_choose7" value="₹40000 will provide walking canes to 100 blind persons" data-value="40000" title="₹40000 will provide walking canes to 100 blind persons" data-field="fixed" onChange={handleRadioChange}></input>
                  <label htmlFor="amount_choose7" className="radiolable"> ₹40000 will provide walking canes to 100 blind persons</label>
                  <br />
                  <input type="radio" {...register("amount_choosed")} id="amount_choose8" value="Donate any Amount of your Choice" data-value="0" title="Donate any Amount of your Choice" data-field="fixed" onChange={handleRadioChange}></input>
                  <label htmlFor="amount_choose8" className="radiolable"> Donate any Amount of your Choice</label>
                  <br />
                  <h4>Personal Info</h4>
                  <div className="row">
                     <div className="col-md-12">
                        <div className="form-group">
                           <label htmlFor="first_name">First Name <span className="required" title="This field is required.">*</span></label>
                           <input type="text" id="name"  {...register("first_name")} className="form-control" />
                           <p className="form_error">{errors.first_name?.message}</p>
                        </div>
                     </div>
                     <div className="col-md-12">
                        <div className="form-group">
                           <label htmlFor="last_name">Last Name <span className="required" title="This field is required.">*</span></label>
                           <input type="text" id="last_name" {...register("last_name")} className="form-control" />
                           <p className="form_error">{errors.last_name?.message}</p>
                        </div>
                     </div>
                     <div className="col-md-12">
                        <div className="form-group">
                           <label htmlFor="email">Email Address <span className="required" title="This field is required.">*</span></label>
                           <input type="text" id="email" {...register("email")} className="form-control" />
                           <p className="form_error">{errors.email?.message}</p>
                        </div>
                     </div>
                     <div className="col-md-12">
                        <div className="form-group">
                           <label htmlFor="phone">Phone <span className="required" title="This field is required.">*</span></label>
                           <input type="text" {...register("phone")} className="form-control" />
                           <p className="form_error">{errors.phone?.message}</p>
                        </div>
                     </div>
                     <div className="col-md-12">
                        <div className="form-group">
                           <label htmlFor="form_80G">I need 80G exempted donation receipt.</label>
                           <div className="name_display_wrap">
                              <label>
                              <input type="radio" className="form_80G" {...register("form_80G")} value="0" /> No
                              </label>
                              <label>
                              <input type="radio" className="form_80G" {...register("form_80G")} value="1" /> Yes
                              </label>
                           </div>
                        </div>
                     </div>
                     {is80GSelected && (
                        <div className="80gInfo">
                           <div className="row">
                              <div className="col-md-12">
                                 <div className="form-group">
                                    <label htmlFor="pan">Your PAN <span className="required" title="This field is required.">*</span></label>
                                    <input type="text" id="pan" {...register("pan")} className="form-control" />
                                    <p className="form_error">{errors.pan?.message}</p>
                                 </div>
                              </div>
                           </div>
                           <h4>Billing Details</h4>
                           <div className="row">
                              <div className="col-md-12">
                                 <div className="form-group">
                                    <label htmlFor="address">Your Address <span className="required" title="This field is required.">*</span></label>
                                    <input type="text" id="address" {...register("address")} className="form-control" />
                                    <p className="form_error">{errors.address?.message}</p>
                                 </div>
                              </div>
                           </div>
                           <div className="row">
                              <div className="col-md-6">
                                 <div className="form-group">
                                    <label htmlFor="country">Country <span className="required" title="This field is required.">*</span></label>
                                    <input type="text" id="country" {...register("country")} className="form-control" />
                                    <p className="form_error">{errors.country?.message}</p>
                                 </div>
                              </div>
                              <div className="col-md-6">
                                 <div className="form-group">
                                    <label htmlFor="state">State <span className="required" title="This field is required.">*</span></label>
                                    <input type="text" id="state" {...register("state")} className="form-control" />
                                    <p className="form_error">{errors.state?.message}</p>
                                 </div>
                              </div>
                              <div className="col-md-6">
                                 <div className="form-group">
                                    <label htmlFor="city">City <span className="required" title="This field is required.">*</span></label>
                                    <input type="text" id="city" {...register("city")} className="form-control" />
                                    <p className="form_error">{errors.city?.message}</p>
                                 </div>
                              </div>
                              <div className="col-md-6">
                                 <div className="form-group">
                                    <label htmlFor="pincode">Zip Code <span className="required" title="This field is required.">*</span></label>
                                    <input type="text" id="pincode" {...register("pincode")} className="form-control" />
                                    <p className="form_error">{errors.pincode?.message}</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}
                    <span>Donation Total <span>₹</span><span id="total_donation">{donationAmount}</span></span>  
                    <p className='donate_info'>All payments go through a secure gateway</p>
                    <div className="col-md-12">
                        <div className="form-group pt-10 mb-0">
                           <button type="submit" className="cr-btn ml-5" disabled={loading}>
                              {loading ? 'Please wait...' : 'Donate Now'}
                           </button>
                        </div>
                     </div> 
                  </div>
               </div>
            </div>
         </form>
      </div>
   )
}

export default DonateWalkingCaneForm