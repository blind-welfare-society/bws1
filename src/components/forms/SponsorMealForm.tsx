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
   occasion: string;
   booking_day: string;
   booking_month: string;
   booking_year: string;
   book_for: string;
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
      occasion: yup.string().required().label("Occasion"),
      booking_day: yup.string().required().label("Booking Day"),
      booking_month: yup.string().required().label("Booking Month"),
      booking_year: yup.string().required().label("Booking Year"),
      book_for: yup.string().required().label("Book For"),
   })
   .required();

const SponsorMealForm = () => {
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
                  <input type="radio" {...register("amount_choosed")} id="amount_choose1" value="₹4000 will provide Lunch to blind girls of the hostel" data-value="4000" title="₹4000 will provide Lunch to blind girls of the hostel" data-field="fixed"></input>
                  <label htmlFor="amount_choose1" className="radiolable"> ₹4000 will provide Lunch to blind girls of the hostel</label>
                  <br />
                  <input type="radio" {...register("amount_choosed")} id="amount_choose2" value="₹4000 will provide Dinner to blind girls of the hostel" data-value="4000" title="₹4000 will provide Dinner to blind girls of the hostel" data-field="fixed" checked></input>
                  <label htmlFor="amount_choose2" className="radiolable"> ₹4000 will provide Dinner to blind girls of the hostel</label>
                  <br />
                  <input type="radio" {...register("amount_choosed")} id="amount_choose3" value="₹8000 will provide lunch & dinner to blind girls of the hostel" data-value="8000" title="₹8000 will provide lunch & dinner to blind girls of the hostel" data-field="fixed"></input>
                  <label htmlFor="amount_choose3" className="radiolable"> ₹8000 will provide lunch & dinner to blind girls of the hostel</label>
                  <br />
                  <input type="radio" {...register("amount_choosed")} id="amount_choose8" value="Donate any Amount of your Choice" data-value="0" title="Donate any Amount of your Choice" data-field="fixed"></input>
                  <label htmlFor="amount_choose8" className="radiolable"> Donate any Amount of your Choice</label>
                  <br />
                  <div className="row">
                     <div className="col-md-12">
                        <div className="form-group">
                           <label htmlFor="occasion">Select Occasion <span className="required" title="This field is required.">*</span></label>
                           <select {...register("occasion")} className="form-control" id="" required>
                              <option value="">Select Occasion</option>
                              <option value="Birthday" data-value="Birthday">Birthday</option>
                              <option value="Marriage Anniversary" data-value="Marriage Anniversary">Marriage Anniversary</option>
                              <option value="Death Anniversary" data-value="Death Anniversary">Death Anniversary</option>
                              <option value="Any Other Special Occasion" data-value="Any Other Special Occasion">Any Other Special Occasion</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-md-12">
                        <div className="form-group">
                           <label htmlFor="booking_day">Date of Booking (DD/MM/YYYY) <span className="required" title="This field is required.">*</span></label>
                           <div className="date-items">
                              <div className='date-item'>
                                 <select {...register("booking_day")} className="form-control" id="" required>
                                    <option value="">Date</option>
                                    {
                                       [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map((day) => (
                                          <option value={day} data-value={day} key={day}>{day}</option>
                                       ))
                                    }
                                 </select>
                              </div>
                              <div className='date-item'>
                                 <select {...register("booking_month")} className="form-control" id="" required>
                                    <option value="">Month</option>
                                    {
                                       ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                                          <option value={month} data-value={month} key={month}>{month}</option>
                                       ))
                                    }
                                 </select>
                              </div>
                              <div className='date-item'>
                                <select {...register("booking_year")} className="form-control" id="" required>
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
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-md-12">
                        <div className="form-group">
                           <label htmlFor="book_for">Select Occasion <span className="required" title="This field is required.">*</span></label>
                           <select {...register("book_for")} className="form-control" id="" required>
                              <option value="">Select</option>
                              <option value="Yearly" data-value="Yearly">Yearly</option>
                              <option value="One-Time" data-value="One-Time">One-Time</option>
                           </select>
                        </div>
                     </div>
                  </div>
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

export default SponsorMealForm
