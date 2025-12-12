import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import Image from "next/image";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useSearchParams } from 'next/navigation'
import ProductListForDonation from "./ProductListForDonation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface FormData {
   donation_amount: number;
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
   frm_products?: string[] | null;
}

const schema = yup
   .object({
      donation_amount: yup.number()
      .required("Donation Amount is required")
      .min(300, "Please enter amount 300 or more than 300")
      .label("Donation Amount"),
      first_name: yup.string()
         .transform((value) => value?.trim())
         .required()
         .matches(/^[A-Za-z\s]+$/, "First name must contain only letters")
         .min(2, "First name must be at least 2 characters")
         .label("First Name"),
      last_name: yup.string()
            .transform((value) => value?.trim())
            .label("Last Name")
            .required("Last name is required")
            .matches(/^[A-Za-z\s]+$/, "Last name must contain only letters")
            .min(2, "Last name must be at least 2 characters"),
      email: yup.string().required().email().label("Enter Email"),
      phone: yup.string()
         .required('Phone number is required')
         .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
      form_80G: yup.string().required(),
      pan: yup.string().when("form_80G", (form_80G: string[], schema) => form_80G[0] === "1" 
         ? schema.required("PAN is required for 80G receipt")
         .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i, 'Invalid PAN format')
         .transform((value) => value?.trim().toUpperCase())
         : schema.notRequired()
      ),
      address: yup.string()
        .transform((value) => value?.trim())
        .when("form_80G", (form_80G: string[], schema) => form_80G[0] === "1" 
         ? schema.required("Address is required for 80G receipt").min(5, "Address must be at least 5 characters")
         : schema.notRequired()
      ),
      country: yup.string()
         .transform((value) => value?.trim())
         .label("Country")
         .when("form_80G", (form_80G: string[], schema) => form_80G[0] === "1" 
         ? schema.required("Country is required for 80G receipt")
         .matches(/^[A-Za-z\s]+$/, "Country must contain only letters")
         .min(2, "Country must be at least 2 characters")
         : schema.notRequired()
      ),
      state: yup.string()
         .transform((value) => value?.trim())
         .label("State")
         .when("form_80G", (form_80G: string[], schema) => form_80G[0] === "1" 
         ? schema.required("state is required for 80G receipt")
         .matches(/^[A-Za-z\s]+$/, "State must contain only letters")
         .min(2, "State must be at least 2 characters")
         : schema.notRequired()
      ),
      city: yup.string()
         .transform((value) => value?.trim())
         .label("City")
         .when("form_80G", (form_80G: string[], schema) => form_80G[0] === "1" 
         ? schema.required("City is required for 80G receipt") 
         .matches(/^[A-Za-z\s]+$/, "City must contain only letters")
         .min(2, "City must be at least 2 characters")
         : schema.notRequired()
      ),
      pincode: yup.string()
         .transform((value) => value?.trim())
         .label("Pincode")
         .when("form_80G", (form_80G: string[], schema) => form_80G[0] === "1" 
         ? schema.required("Pincode is required for 80G receipt") 
         .matches(/^[A-Za-z0-9\s-]{3,10}$/, "Invalid postal code format")
         : schema.notRequired()
      ),
      frm_products: yup.array().notRequired(),
   })
.required();

const DonationForm = () => {
    const searchParams = useSearchParams();

   const utm_source = searchParams.get('utm_source');
   const utm_medium = searchParams.get('utm_medium');
   const utm_campaign = searchParams.get('utm_campaign');
   const utm_content = searchParams.get('utm_content');
   const utm_id = searchParams.get('utm_id');
   const utm_term = searchParams.get('utm_term');

   const [currentUrl, setCurrentUrl] = useState('');
   const [totalPrice, setTotalPrice] = useState(0);
   const [formattedProducts, setFormattedProducts] = useState<string[]>([]);
    
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
    
    
    const { register, handleSubmit, formState: { errors },  watch, setValue, unregister, clearErrors} = useForm<FormData>({
      resolver: yupResolver(schema),
      defaultValues: {
         form_80G: "0"
      }
   });

    const is80GSelected = watch("form_80G") === "1";

    useEffect(() => {
        setValue("donation_amount", totalPrice);

        // Filter out duplicate product entries
        const uniqueProducts = formattedProducts.filter((item, index, self) => 
            self.indexOf(item) === index
        );

        // Unregister fields not in the updated list
        const allFields = (watch("frm_products") || []).filter(Boolean);
        allFields.forEach((_, index) => {
            if (!uniqueProducts.includes(allFields[index])) {
                unregister(`frm_products.${index}`);
            }
        });

        // Update form values with unique products
        uniqueProducts.forEach((product, index) => {
            setValue(`frm_products.${index}`, product);
        });
    }, [setValue, formattedProducts, totalPrice, unregister, watch]);

    useEffect(() => {
    if (!is80GSelected) {
        setValue("pan", "");
        setValue("address", "");
        setValue("country", "");
        setValue("state", "");
        setValue("city", "");
        setValue("pincode", "");
        clearErrors(["pan", "address", "country", "state", "city", "pincode"]);
    }
    }, [is80GSelected, setValue, clearErrors]);
    

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            const response = await axios.post('/save-donation-data', {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email, // Adjust or pass from form
                phone: data.phone,
                donation_amount: data.donation_amount,
                form_80G: data.form_80G,
                pan: data.pan,
                address: data.address,
                country: data.country,
                state: data.state,
                city: data.city,
                pincode: data.pincode,
                frm_products: data.frm_products,
                utm_source: utm_source,
                utm_medium: utm_medium,
                utm_campaign: utm_campaign,
                utm_content: utm_content,
                utm_id: utm_id,
                utm_term: utm_term,
                sourceUrl: currentUrl
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
                     axios.post('/update-donation-status', {
                        order_id: response.razorpay_order_id,
                        payment_id: response.razorpay_payment_id,
                        signature: response.razorpay_signature,
                        saveData_id: saveData_id
                     })
                     .then(function (response) {
                        
                        //console.log(dynamicId);
                        window.location.href = `/donationsuccess/${saveData_id}`;
                        
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
        }catch (error) {
            console.error('Error:', error);
        }finally {
            setLoading(false); // Set loading to false after response is received
        }
    };

    return (
        <div className="donate-form-wrapper">
        <div className="row">
            <div className="col-md-6">
                <h4>Select your donation option</h4>
            </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} id="donateForm">
            <div className="row donationItems">
                <div className="col-md-12 itemHeader">
                    <div className="row">
                        <div className="col-md-5"></div>
                        <div className="col-md-7">
                            <div className="row">
                                <div className="col-md-4">Cost</div>
                                <div className="col-md-4 text-center">Units</div>
                                <div className="col-md-4 text-right">Amount</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProductListForDonation setTotalPrice={setTotalPrice} setFormattedProducts={setFormattedProducts} />
            <div className="row donationItems">
                <div className="col-md-12 text-right">
                    <div className="row" style={{borderBottom:'1px solid #ccc', padding:'10px'}} id="donation_amount">
                        <div className="col-md-8"></div>
                        <div className="col-md-3"><p style={{fontWeight:'600',color:'#363b97',fontSize:'20px'}}>Total Amount:</p></div>
                        <div className="col-md-1">
                            <input type="hidden" {...register("donation_amount")} id="amountVal" />
                            {formattedProducts && formattedProducts.length > 0 && formattedProducts.map((item: any, index: number) => (
                            <input type="hidden" {...register(`frm_products.${index}`)} className="frmProductDesc" key={index} id={`frm_product_${index}`} /> 
                            ))}
                            <p>₹<span className="finalAmount">{totalPrice}</span></p>
                        </div>
                        <p className="form_error text-end fw-bold">{errors.donation_amount?.message}</p>
                    </div>
                </div>
            </div>
            <h4 className="px-3">Personal Info</h4>
            <div className="row px-3">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="first_name">First Name <span className="required" title="This field is required.">*</span></label>
                        <input 
                            type="text"
                            id="name"
                            {...register("first_name")}
                            aria-required="true"
                            aria-invalid={!!errors.first_name}
                            aria-describedby={errors.first_name ? 'first_name-error' : undefined}
                            className="form-control" />
                        <p className="form_error">{errors.first_name?.message}</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="last_name">Last Name <span className="required" title="This field is required.">*</span></label>
                        <input 
                            type="text"
                            id="last_name"
                            {...register("last_name")}
                            aria-required="true"
                            aria-invalid={!!errors.last_name}
                            aria-describedby={errors.last_name ? 'last_name-error' : undefined}
                            className="form-control" />
                        <p className="form_error">{errors.last_name?.message}</p>
                    </div>
                </div>
            </div>
            <div className="row px-3">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="email">Email Address <span className="required" title="This field is required.">*</span></label>
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
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="phone">Phone <span className="required" title="This field is required.">*</span></label>
                        <input 
                            type="text"
                            id="phone"
                            {...register("phone")}
                            aria-required="true"
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? 'phone-error' : undefined}
                            className="form-control" />
                        <p className="form_error">{errors.phone?.message}</p>
                    </div>
                </div>
            </div>
            <div className="row px-3">
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
                    <h4>Billing Details</h4>
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
                <p className="mb-0"><span>Donation Total <span>₹</span><span id="total_donation">{totalPrice}</span></span></p>
                <p className="mb-4"><span className="form_error fw-bold">{errors.donation_amount?.message}</span></p>
                <p className='donate_info'>All payments go through a secure gateway</p>
                <div className="col-md-12">
                    <div className="form-group pt-10 mb-0">
                        <button type="submit" className="cr-btn ml-5" disabled={loading}>
                            {loading ? 'Please wait...' : 'Donate Now'}
                        </button>
                    </div>
                </div> 
            </div>
        </form>
        </div>
    )
}

export default DonationForm;