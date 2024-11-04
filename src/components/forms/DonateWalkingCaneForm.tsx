'use client'
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "@/lib/axios";

interface FormData {
   donation_amount: string;
   amount_choosed: string;
   first_name: string;
   last_name: string;
   contact_email: string;
   phone: string;
}

const schema = yup
   .object({
      donation_amount: yup.string().required().label("Donation Amount"),
      amount_choosed: yup.string().required(),
      first_name: yup.string().required().label("Enter First Name"),
      last_name: yup.string().required().label("Enter Last Name"),
      contact_email: yup.string().required().email().label("Enter Email"),
      phone: yup.string()
         .required('Phone number is required')
         .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
   })
   .required();

const DonateWalkingCaneForm = () => {
   const [loading, setLoading] = useState(false); 
   const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });
   
   const onSubmit = async (data: FormData) => {
      setLoading(true);
   };

   return (
      <div className="donate-form-wrapper sub-donate">
         <form onSubmit={handleSubmit(onSubmit)} id="donateForm">
            <div className="row">
               <div className="col-md-12">
                  <h4>Select your Donation Option</h4>
                  <div className="form-group">
                     <input type="hidden" id="amountVal"  {...register("donation_amount")} className="form-control" placeholder="donation_amount" />
                     <input type="text" id="donation_amount" value="₹1200.00" data-validation="required" className="form-control valid" readOnly></input>
                  </div>
                  <input type="radio" {...register("amount_choosed")} id="amount_choose1" value="₹400 will provide walking cane to 1 blind person" data-value="400" title="₹400 will provide walking cane to 1 blind person" data-field="fixed"></input>
                  <label htmlFor="amount_choose1" className="radiolable"> ₹400 will provide walking cane to 1 blind person</label>
                  <br />
                  <input type="radio" {...register("amount_choosed")} id="amount_choose2" value=" ₹1200 will provide walking canes to 3 blind persons" data-value="1200" title=" ₹1200 will provide walking canes to 3 blind persons" data-field="fixed" checked></input>
                  <label htmlFor="amount_choose2" className="radiolable">  ₹1200 will provide walking canes to 3 blind persons</label>
                  <br />
                  <input type="radio" {...register("amount_choosed")} id="amount_choose3" value="₹2000 will provide walking canes to 5 blind persons" data-value="2000" title="₹2000 will provide walking canes to 5 blind persons" data-field="fixed"></input>
                  <label htmlFor="amount_choose3" className="radiolable"> ₹2000 will provide walking canes to 5 blind persons</label>
                  <br />
                  <input type="radio" {...register("amount_choosed")} id="amount_choose4" value="₹4000 will provide walking canes to 10 blind persons" data-value="4000" title="₹4000 will provide walking canes to 10 blind persons" data-field="fixed"></input>
                  <label htmlFor="amount_choose4" className="radiolable"> ₹4000 will provide walking canes to 10 blind persons</label>
                  <br />
                  <input type="radio" {...register("amount_choosed")} id="amount_choose5" value="₹10000 will provide walking canes to 25 blind persons" data-value="10000" title="₹10000 will provide walking canes to 25 blind persons" data-field="fixed"></input>
                  <label htmlFor="amount_choose5" className="radiolable"> ₹10000 will provide walking canes to 25 blind persons</label>
                  <br />
                  <input type="radio" {...register("amount_choosed")} id="amount_choose6" value="₹20000 will provide walking canes to 50 blind persons" data-value="20000" title="₹20000 will provide walking canes to 50 blind persons" data-field="fixed"></input>
                  <label htmlFor="amount_choose6" className="radiolable"> ₹20000 will provide walking canes to 50 blind persons</label>
                  <br />
                  <input type="radio" {...register("amount_choosed")} id="amount_choose7" value="₹40000 will provide walking canes to 100 blind persons" data-value="40000" title="₹40000 will provide walking canes to 100 blind persons" data-field="fixed"></input>
                  <label htmlFor="amount_choose7" className="radiolable"> ₹40000 will provide walking canes to 100 blind persons</label>
                  <br />
                  <input type="radio" {...register("amount_choosed")} id="amount_choose8" value="Donate any Amount of your Choice" data-value="0" title="Donate any Amount of your Choice" data-field="fixed"></input>
                  <label htmlFor="amount_choose8" className="radiolable"> Donate any Amount of your Choice</label>
                  <br />
                  <h4>Personal Info</h4>
                  <div className="row">
                     <div className="col-md-12">
                        <div className="form-group">
                           <label htmlFor="first_name">First Name <span className="required" title="This field is required.">*</span></label>
                           <input type="text" {...register("first_name")} className="form-control" placeholder="Enter First Name" required />
                        </div>
                     </div>
                     <div className="col-md-12">
                        <div className="form-group">
                           <label htmlFor="last_name">Last Name <span className="required" title="This field is required.">*</span></label>
                           <input type="text" {...register("last_name")} className="form-control" placeholder="Enter Last Name" required />
                        </div>
                     </div>
                     <div className="col-md-12">
                        <div className="form-group">
                           <label htmlFor="contact_email">Email Address <span className="required" title="This field is required.">*</span></label>
                           <input type="text" {...register("contact_email")} className="form-control" placeholder="Enter Email" required />
                        </div>
                     </div>
                     <div className="col-md-12">
                        <div className="form-group">
                           <label htmlFor="phone">Phone <span className="required" title="This field is required.">*</span></label>
                           <input type="text" {...register("phone")} className="form-control" placeholder="Enter Phone" required />
                        </div>
                     </div>
                     <div className="col-md-12">
                        <div className="form-group">
                           <label htmlFor="form_80G">I need 80G exempted donation receipt.</label>
                           <div className="name_display_wrap">
                              <label>
                              <input type="radio" name="form_80G" className="form_80G" value="0" checked /> No
                              </label>
                              <label>
                              <input type="radio" name="form_80G" className="form_80G" value="1" /> Yes
                              </label>
                           </div>
                        </div>
                     </div>
                     <div className="80gInfo">
                        <div className="row">
                           <div className="col-md-12">
                              <div className="form-group">
                                 <label htmlFor="pan">Your PAN <span className="required" title="This field is required.">*</span></label>
                                 <input type="text" name="pan" className="form-control" placeholder="Enter PAN" />
                              </div>
                           </div>
                        </div>
                        <h4>Billing Details</h4>
                        <div className="row">
                           <div className="col-md-12">
                              <div className="form-group">
                                 <label htmlFor="address">Your Address <span className="required" title="This field is required.">*</span></label>
                                 <input type="text" name="address" className="form-control" placeholder="Enter Address" />
                              </div>
                           </div>
                        </div>
                        <div className="row">
                           <div className="col-md-6">
                              <div className="form-group">
                                 <label htmlFor="country">Country <span className="required" title="This field is required.">*</span></label>
                                 <input type="text" name="country" className="form-control" placeholder="Enter Address" />
                              </div>
                           </div>
                        </div>
                     </div>
                     <span>Donation Total <span>₹</span><span id="total_donation">1200.00</span></span>
                     <p className='donate_info'>All payments go through a secure gateway</p>
                  </div>
               </div>
            </div>
         </form>
      </div>
   )
}

export default DonateWalkingCaneForm
