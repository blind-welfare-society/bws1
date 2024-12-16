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
   full_name: string;
   email: string;
   phone: string;
   contributor_name_display: string;
   campaign_id: string;
   form_80G: string;
   pan?: string;
   address?: string;
   country?: string;
   state?: string;
   city?: string;
   pincode?: string;
   frm_products?: string[] | null;
}

const getSchema = (minimum_amount: number | undefined) =>
    yup
   .object({
      donation_amount: yup.number()
      .required("Donation Amount is required")
      .typeError('Donation Amount must be a number')
      .min(minimum_amount || 500, `Please enter an amount more than ${minimum_amount || 500}`)
      .label("Donation Amount"),
      full_name: yup.string().required().label("First Name"),
      email: yup.string().required().email().label("Enter Email"),
      phone: yup.string()
         .required('Phone number is required')
         .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
      form_80G: yup.string().required(),
      contributor_name_display: yup.string().required().label("Display Name"),
      campaign_id: yup.string().required(),
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
         ? schema.required("State is required for 80G receipt") 
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
      frm_products: yup.array().notRequired(),
   })
    .required();
   
   
const ContributeForm = (props: any) => {
    const searchParams = useSearchParams();

    const utm_source = searchParams.get('utm_source');
    const utm_medium = searchParams.get('utm_medium');
    const utm_campaign = searchParams.get('utm_campaign');
    const utm_content = searchParams.get('utm_content');
    const utm_id = searchParams.get('utm_id');
    const utm_term = searchParams.get('utm_term');

    const preferredSlot = props.preferred_slot;
    const products = props.products;
    const donationAmount = props.donation_amount;
    const formattedProducts = props.formattedProducts;
    const onProductChange = props.onProductChange; 
    const onPreferredSlotClick = props.onPreferredSlotClick;
    const minimum_amount = props.minimum_amount;

    const [totalDonationAmount, setTotalDonationAmount] = useState(donationAmount);
    const [loading, setLoading] = useState(false); 
    const [currentUrl, setCurrentUrl] = useState('');
    
    useEffect(() => {
    // Access window only after the component is mounted (client-side)
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.origin + window.location.pathname);
    }
    }, []);
    

    const chooseDonationAmount = (amount: any) => {
        setTotalDonationAmount(amount);
        onProductChange([]);
        onPreferredSlotClick();
        setValue("frm_products", []);
    // Pass selected slot amount up to reset counts in parent
    };
    
    useEffect(() => {
        if (donationAmount != 0) {
            setTotalDonationAmount(0); // Reset to 0 when donation amount is reset
        }
    }, [donationAmount]);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
        document.body.removeChild(script);
        };
    }, []);
    
    const { register, handleSubmit, reset, formState: { errors }, setValue, watch,} = useForm<FormData>({
      resolver: yupResolver(getSchema(minimum_amount)),
      defaultValues: {
         form_80G: "0",
         contributor_name_display:"full_name",
      }
    });

    useEffect(() => {
        // Set form values dynamically
        const donationAmt = totalDonationAmount || donationAmount;
        setValue("campaign_id", props.project_id);
        setValue("donation_amount", donationAmt);
        // Dynamically set `frm_products` values
        if (formattedProducts) {
            formattedProducts.forEach((product:any, index:any) => {
                setValue(`frm_products.${index}`, product);
            });
        }
    }, [props.project_id, setValue, totalDonationAmount, donationAmount, formattedProducts]);

    const donationAmountField = watch("donation_amount", totalDonationAmount || donationAmount);

    const is80GSelected = watch("form_80G") === "1";
    
    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            const response = await axios.post('/save-project-data', {
                full_name: data.full_name,
                email: data.email, // Adjust or pass from form
                donation_amount: data.donation_amount,
                contributor_name_display: data.contributor_name_display,
                pan: data.pan,
                address: data.address,
                country: data.country,
                state: data.state,
                city: data.city,
                pincode: data.pincode,
                phone: data.phone,
                form_80G: data.form_80G,
                frm_products: data.frm_products,
                campaign_id: data.campaign_id,
                utm_source: utm_source,
                utm_medium: utm_medium,
                utm_campaign: utm_campaign,
                utm_content: utm_content,
                utm_id: utm_id,
                utm_term: utm_term,
                sourceUrl: currentUrl
            });

            if (response.status === 200) { 
                //console.log(response.data);
                const order_id    = response.data.data.order_id;
                const saveData_id = response.data.data.saveData_id;

                const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                    amount: response.data.donation_amount,
                    currency: "INR",
                    name: "Blind Welfare Society",
                    description: "Donation",
                    image: "../../assets/img/logos/logo.png",
                    order_id: order_id,
                    handler: function (response:any) {
                            axios.post('/update-project-donation-status', {
                                order_id: response.razorpay_order_id,
                                payment_id: response.razorpay_payment_id,
                                signature: response.razorpay_signature,
                                saveData_id: saveData_id
                            })
                            .then(function (response) {
                                const dynamicId = "bws-" + saveData_id;
                                //console.log(dynamicId);
                                window.location.href = `/thank-you/${dynamicId}`;
                                
                            })
                            .catch(function (error) {
                                toast.error('Something went wrong. Please try again.', { position: 'top-center' });
                                console.log(response.razorpay_signature);
                            });
                    },
                    prefill: {
                        name: data.full_name,
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
        } catch (error:any) {
            console.error('Error:', error.response?.data || error.message);
            toast.error('Failed to send message. Please check your network or try again.', { position: 'top-center' });
        }finally {
            setLoading(false); // Set loading to false after response is received
        }
    }
    //console.log(formattedProducts);
    return (
        <form className="campaign_donation_payment" onSubmit={handleSubmit(onSubmit)} id="donateForm">
        <input type="hidden" id="campaign_id" {...register("campaign_id")} />
        <h5 style={{ marginBottom: "5px",fontWeight: "600",fontSize: "20px"}}>Contribute</h5>
        <div className='donate-amount-placeholder'>
        <ul>
        {
            preferredSlot.map((item: any) => 
                <li onClick={() => chooseDonationAmount(item)} data-value={item} key={item}>₹ {item}</li>
            )    
        }  
        </ul>                    
        </div>  
        <div className="donate_amount_field">
            <div className="donate_currency">₹</div>
            <input type="number"
                id="donation_amount"
                {...register("donation_amount", {
                    onChange: (e) => setValue("donation_amount", e.target.value), // Update form value
                })}
                className="form-control amount" 
                value={donationAmountField || ""} 
                placeholder={`Enter other amount - ₹${minimum_amount || 500} or more`} />
            <p className="form_error">{errors.donation_amount?.message}</p>
        </div> 
        {formattedProducts && formattedProducts.length > 0 && formattedProducts.map((item: any, index: number) => (
           <input type="hidden" {...register(`frm_products.${index}`)} value={item} className="frmProductDesc" key={index} id={`frm_product_${index}`} /> 
        ))}
        <p className='form_desc'>Filling up all the details below is mandatory!</p>
        <div className="form-group row">
            <div className="col-md-12">
                <input 
                    type="text" 
                    id="full_name"  
                    aria-required="true"
                    aria-invalid={!!errors.full_name}
                    aria-describedby={errors.full_name ? 'full_name-error' : undefined}
                    {...register("full_name")} 
                    className="form-control" />
                <p className="form_error">{errors.full_name?.message}</p>
            </div>
            <div className="col-md-12">
                <input 
                    type="email" 
                    id="email"  
                    {...register("email")}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className="form-control" />
                <p className="form_error">{errors.email?.message}</p>      
            </div>
            <div className="col-md-12">      
                <input 
                    type="tel" 
                    id="phone"  
                    {...register("phone")} 
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    className="form-control" />
                <p className="form_error">{errors.phone?.message}</p>   
            </div> 
        </div> 
        <p className='form_desc2'>
            <strong>Contribution Appearance</strong> <br />Choose a name to be displayed publicly next to your contribution on the Supporter list of the campaign page or choose to be an Anonymous wellwisher.
        </p>
        <div className="row form-group mb-0">
            <div className="col-md-12">
                <div className="name_display_wrap">
                    <label>
                        <input type="radio" {...register("contributor_name_display")} value="full_name" /> Full Name 
                    </label> 
                    <label>
                        <input type="radio" {...register("contributor_name_display")} value="anonymous" /> Anonymous
		            </label>    
                </div> 
                <p className="form_error">{errors.contributor_name_display?.message}</p>     
            </div>
        </div>
        <div className="form-group row">
            <div className="col-md-12">
                <label style={{ fontSize: '12px' }}>I need 80G exempted donation receipt.</label> 
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
                    <input 
                        type="text" 
                        id="pan" 
                        {...register("pan")} 
                        aria-required="true"
                        aria-invalid={!!errors.pan}
                        aria-describedby={errors.pan ? 'pan-error' : undefined}
                        className="form-control" />
                    <p className="form_error">{errors.pan?.message}</p>
                    </div>
                </div>
            </div>
                    <h4 style={{ fontWeight: 600, fontSize: '18px', marginBottom: '20px'}}>Billing Details</h4>
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                    <label htmlFor="address">Your Address <span className="required" title="This field is required.">*</span></label>
                    <input 
                        type="text" 
                        id="address" 
                        {...register("address")} 
                        aria-required="true"
                        aria-invalid={!!errors.address}
                        aria-describedby={errors.address ? 'address-error' : undefined}
                        className="form-control" />
                    <p className="form_error">{errors.address?.message}</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="country">Country <span className="required" title="This field is required.">*</span></label>
                    <input 
                        type="text" 
                        id="country" 
                        {...register("country")} 
                        aria-required="true"
                        aria-invalid={!!errors.country}
                        aria-describedby={errors.country ? 'country-error' : undefined}
                        className="form-control" />
                    <p className="form_error">{errors.country?.message}</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="state">State <span className="required" title="This field is required.">*</span></label>
                    <input 
                        type="text" 
                        id="state" 
                        {...register("state")} 
                        aria-required="true"
                        aria-invalid={!!errors.state}
                        aria-describedby={errors.state ? 'state-error' : undefined}
                        className="form-control" />
                    <p className="form_error">{errors.state?.message}</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="city">City <span className="required" title="This field is required.">*</span></label>
                    <input 
                        type="text" 
                        id="city" 
                        {...register("city")} 
                        aria-required="true"
                        aria-invalid={!!errors.city}
                        aria-describedby={errors.city ? 'city-error' : undefined}
                        className="form-control" />
                    <p className="form_error">{errors.city?.message}</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="pincode">Zip Code <span className="required" title="This field is required.">*</span></label>
                    <input 
                        type="text" 
                        id="pincode" 
                        {...register("pincode")} 
                        aria-required="true"
                        aria-invalid={!!errors.pincode}
                        aria-describedby={errors.pincode ? 'pincode-error' : undefined}
                        className="form-control" />
                    <p className="form_error">{errors.pincode?.message}</p>
                    </div>
                </div>
            </div>
        </div>
        )}
        <p style={{ fontSize: '.92rem' }} className='mb-1'><strong>All payments go through a secure gateway</strong></p>
        <div className="donate-form-button">
                <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
                    <i className="fa fa-heart" aria-hidden="true"></i>&nbsp;
                    {loading ? 'Please wait...' : 'Donate Now'}
                </button>
        </div>
        </form>
    )
}

export default ContributeForm;