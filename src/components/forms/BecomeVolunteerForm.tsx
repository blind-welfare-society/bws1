'use client'
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "@/lib/axios";

interface FormData {
   name: string;
   email: string;
   phone: string;
   subject: string;
   comment: string;
}

const schema = yup
   .object({
      name: yup.string().required().label("Name"),
      email: yup.string().required().email().label("Email"),
      phone: yup.string()
         .required('Phone number is required')
         .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
      comment: yup.string().required().label("Message"),
      subject: yup.string().required().label("Subject"),
   })
   .required();

const BecomeVolunteerForm = () => {
   const [loading, setLoading] = useState(false); 
   const { register, handleSubmit, reset, formState: { errors }, } = useForm<FormData>({ resolver: yupResolver(schema), });
   const onSubmit = async (data: FormData) => {
      setLoading(true);
      try {
         const response = await axios.post('/store-contact-us', {
         name: data.name,
         subject: data.subject, // Adjust or pass from form
         phone: data.phone,
         email: data.email,
         comment: data.comment,
         email_subject:"volunteer" // Map 'message' to 'comment'
         });
         
         if (response.status === 200) {
            //toast('Message sent successfully', { position: 'top-center' });
            window.location.href = `/thank-you`;
         reset();
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
      <form onSubmit={handleSubmit(onSubmit)} className="volunteer-form">
         <div className="row">
            <div className="col-sm-6">
               <div className="form-group">
                  <label htmlFor="name" className="fw-bold">Your Name<span className='text-danger'>*</span></label>
                  <input type="text" id="name"  {...register("name")} className="form-control" />
                  <p className="form_error">{errors.name?.message}</p>
               </div>
            </div>
            <div className="col-sm-6">
               <div className="form-group">
                  <label htmlFor="email" className="fw-bold">Your Email<span className='text-danger'>*</span></label>
                  <input type="email" id="email" {...register("email")} className="form-control" />
                  <p className="form_error">{errors.email?.message}</p>
               </div>
            </div>
            <div className="col-sm-6">
               <div className="form-group">
                  <label htmlFor="phone_number" className="fw-bold">Phone Number<span className='text-danger'>*</span></label>
                  <input type="text" id="phone_number"  {...register("phone")} className="form-control" />
                  <p className="form_error">{errors.phone?.message}</p>
               </div>
            </div>
            <div className="col-sm-6">
               <div className="form-group">
                  <label htmlFor="subject" className="fw-bold">Subject<span className='text-danger'>*</span></label>
                  <select id="subject"  {...register("subject")} className="form-control">
                     <option value="">Select</option>
                     <option value="Reading Books">Reading Books</option>
                     <option value="Writing Assignments">Writing Assignments</option>
                     <option value="Content Writing">Content Writing</option>
                     <option value="Website Development">Website Development</option>
                     <option value="Fund Raising">Fund Raising</option>
                     <option value="Events">Events</option>
                     <option value="Picnics">Picnics</option>
                     <option value="Other">Other</option>
                  </select>
                  <p className="form_error">{errors.subject?.message}</p>
               </div>
            </div>
            <div className="col-md-12">
               <div className="form-group">
                  <label htmlFor="comment" className="fw-bold">Message<span className='text-danger'>*</span></label>
                  <textarea id="comment" {...register("comment")} className="form-control" rows={3} ></textarea>
                  <p className="form_error">{errors.comment?.message}</p>
               </div>
            </div>
            <div className="col-md-12">
               <div className="form-group pt-10 mb-0">
                  <button type="submit" className="cr-btn ml-5" disabled={loading}>
                     {loading ? 'Please wait...' : 'Send us a message'}
                  </button>
               </div>
            </div>
         </div>
      </form>
   )
}

export default BecomeVolunteerForm
