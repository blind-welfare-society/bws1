'use client'
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "@/lib/axios";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface FormData {
   donation_amount: number;
   amount_choosed: string;
   name: string;
   email: string;
   phone: string;
   occasion: string;
   form_80G: string;
   pan?: string;
   address?: string;
   country?: string;
   state?: string;
   city?: string;
   pincode?: string;
   booking_date: {
      booking_day: string;
      booking_month: string;
      booking_year: string;
   };
   book_for: string;
}

const schema = yup
   .object({
      donation_amount: yup.number()
      .required("Donation Amount is required")
      .min(400, "Please Enter amount More than 400")
      .label("Donation Amount"),
      amount_choosed: yup.string().required().label("Amount Choosed"),
      name: yup.string().required().label("First Name"),
      email: yup.string().required().email().label("Enter Email"),
      book_for:yup.string().required().label("Duration"),
      phone: yup.string()
         .required('Phone number is required')
         .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
      occasion: yup.string().required().label("Occasion"),
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
      booking_date: yup
      .object({
         booking_day: yup.string().required("Day is required"),
         booking_month: yup.string().required("Month is required"),
         booking_year: yup.string().required("Year is required"),
      })
      .test(
         "all-required",
         "Booking date is empty",
         (value) => {
            return (
               !!value &&
               !!value.booking_day &&
               !!value.booking_month &&
               !!value.booking_year
            );
         }
      )
      .required(),
   })
   .required();

const SponsorMealForm = () => {
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
         amount_choosed: "₹8000 will provide lunch & dinner to blind girls of the hostel",
         form_80G: "0"
      }
      
   });
   
   const [donationAmount, setDonationAmount] = useState("8000");
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
         const response = await axios.post('/save-sponsor-meal', {
            name: data.name,
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
            book_for: data.book_for,
            occasion: data.occasion,
            booking_day: data.booking_date.booking_day,
            booking_month: data.booking_date.booking_month,
            booking_year: data.booking_date.booking_year,
         });
         
         if (response.status === 200) {
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
                     axios.post('/update-sponsor-meal-status', {
                        order_id: response.razorpay_order_id,
                        payment_id: response.razorpay_payment_id,
                        signature: response.razorpay_signature,
                        saveData_id: saveData_id
                     })
                     .then(function (response) {
                        const dynamicId = "sponsormeal-" + saveData_id;
                        window.location.href = `/thank-you/${dynamicId}`;
                        
                     })
                     .catch(function (error) {
                        toast.error('Something went wrong. Please try again.', { position: 'top-center' });
                     });
               },
               prefill: {
                  name: data.name,
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
         //console.error('Error:', error.response?.data || error.message);
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
                        placeholder="Enter custom amount"
                        id="donation_amount"
                        // Placeholder when empty
                     />
                     <p className="form_error">{errors.donation_amount?.message}</p>
                  </div>
                  <input type="radio" {...register("amount_choosed")} id="amount_choose1" value="₹4000 will provide Lunch to blind girls of the hostel" data-value="4000" title="₹4000 will provide Lunch to blind girls of the hostel" data-field="fixed" onChange={handleRadioChange}></input>
                  <label htmlFor="amount_choose1" className="radiolable"> ₹4000 will provide Lunch to blind girls of the hostel</label>
                  <br />
                  <input type="radio" {...register("amount_choosed")} id="amount_choose2" value="₹4000 will provide Dinner to blind girls of the hostel" data-value="4000" title="₹4000 will provide Dinner to blind girls of the hostel" data-field="fixed" onChange={handleRadioChange}></input>
                  <label htmlFor="amount_choose2" className="radiolable">  ₹4000 will provide Dinner to blind girls of the hostel</label>
                  <br />
                  <input type="radio" {...register("amount_choosed")} id="amount_choose3" value="₹8000 will provide lunch & dinner to blind girls of the hostel" data-value="8000" title="₹8000 will provide lunch & dinner to blind girls of the hostel" data-field="fixed" onChange={handleRadioChange}></input>
                  <label htmlFor="amount_choose3" className="radiolable"> ₹8000 will provide lunch & dinner to blind girls of the hostel</label>
                  <br />
                  <input type="radio" {...register("amount_choosed")} id="amount_choose8" value="Donate any Amount of your Choice" data-value="0" title="Donate any Amount of your Choice" data-field="fixed" onChange={handleRadioChange}></input>
                  <label htmlFor="amount_choose8" className="radiolable"> Donate any Amount of your Choice</label>
                  <br />
                  <div className="row">
                     <div className="col-md-12">
                        <div className="form-group">
                           <label htmlFor="occasion">Select Occasion <span className="required" title="This field is required.">*</span></label>
                           <select {...register("occasion")} className="form-control" id="">
                              <option value="">Select Occasion</option>
                              <option value="Birthday" data-value="Birthday">Birthday</option>
                              <option value="Marriage Anniversary" data-value="Marriage Anniversary">Marriage Anniversary</option>
                              <option value="Death Anniversary" data-value="Death Anniversary">Death Anniversary</option>
                              <option value="Any Other Special Occasion" data-value="Any Other Special Occasion">Any Other Special Occasion</option>
                           </select>
                           <p className="form_error">{errors.occasion?.message}</p>
                        </div>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-md-12">
                        <div className="form-group mb-1">
                           <label htmlFor="booking_day">Date of Booking (DD/MM/YYYY) <span className="required" title="This field is required.">*</span></label>
                           <div className="date-items">
                              <div className='date-item'>
                                 <select {...register("booking_date.booking_day")} className="form-control" id="booking_day">
                                    <option value="">Day</option>
                                    {[...Array(31)].map((_, i) => (
                                       <option value={i + 1} key={i + 1}>{i + 1}</option>
                                    ))}
                                 </select>
                              </div>
                              <div className='date-item'>
                                 <select {...register("booking_date.booking_month")} className="form-control" id="booking_month">
                                    <option value="">Month</option>
                                    {[
                                       "January", "February", "March", "April", "May", 
                                       "June", "July", "August", "September", 
                                       "October", "November", "December",
                                    ].map((month, i) => (
                                       <option value={i + 1} key={i + 1}>{month}</option>
                                    ))}
                                 </select>
                              </div>
                              <div className='date-item'>
                                <select {...register("booking_date.booking_year")} className="form-control" id="booking_year">
                                    <option value="">Year</option>
                                    {
                                       ["2024","2025","2026","2027","2028","2029","2030","2031","2032","2033","2034","2035"].map((month) => (
                                          <option value={month} data-value={month} key={month}>{month}</option>
                                       ))
                                    }
                                 </select>
                              </div>
                           </div>
                        </div>
                       <p className="form_error">{errors.booking_date?.root?.message}</p>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-md-12">
                        <div className="form-group">
                           <label htmlFor="book_for">I would Like to Book for <span className="required" title="This field is required.">*</span></label>
                           <select {...register("book_for")} className="form-control" id="book_for">
                              <option value="">Select</option>
                              <option value="Yearly" data-value="Yearly">Yearly</option>
                              <option value="One-Time" data-value="One-Time">One-Time</option>
                           </select>
                           <p className="form_error">{errors.book_for?.message}</p>
                        </div>
                     </div>
                  </div>
                  <h4>Personal Info</h4>
                  <div className="row">
                     <div className="col-md-12">
                        <div className="form-group">
                           <label htmlFor="name">Your Name <span className="required" title="This field is required.">*</span></label>
                           <input type="text" id="name"  {...register("name")} className="form-control" />
                           <p className="form_error">{errors.name?.message}</p>
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

export default SponsorMealForm