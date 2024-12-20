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

const ContactForm = () => {
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
         toast('Message sent successfully', { position: 'top-center' });
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
            <div className="col-xl-11 mb-10">
               <p>We’d love to hear from you! Whether you have questions, suggestions, or simply want to connect, we’re with you to help. Reach out using any of the methods below, and our team will get back to you as soon as possible.</p>
            </div>
            <div className="col-sm-6">
               <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                     type="text"
                     id="name"
                     {...register("name")}
                     aria-required="true"
                     aria-invalid={!!errors.name}
                     aria-describedby={errors.name ? 'name-error' : undefined}
                     className="form-control"
                     placeholder='Enter your name'
                  />
                  <p className="form_error">{errors.name?.message}</p>
               </div>
            </div>
            <div className="col-sm-6">
               <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                     type="email"
                     id="email"
                     {...register("email")}
                     aria-required="true"
                     aria-invalid={!!errors.email}
                     aria-describedby={errors.email ? 'email-error' : undefined}
                     className="form-control"
                     placeholder='Enter your email'
                  />
                  <p className="form_error">{errors.email?.message}</p>
               </div>
            </div>
            <div className="col-sm-6">
               <div className="form-group">
                  <label htmlFor="phone_number">Phone Number</label>
                  <input
                     type="text"
                     id="phone_number"
                     {...register("phone")}
                     aria-required="true"
                     aria-invalid={!!errors.phone}
                     aria-describedby={errors.phone ? 'phone-error' : undefined}
                     className="form-control"
                     placeholder='Enter your Phone Number'
                  />
                  <p className="form_error">{errors.phone?.message}</p>
               </div>
            </div>
            <div className="col-sm-6">
               <div className="form-group">
                  <label htmlFor="phone_number">Subject</label>
                  <input
                     type="text"
                     id="subject"
                     {...register("subject")}
                     aria-required="true"
                     aria-invalid={!!errors.subject}
                     aria-describedby={errors.subject ? 'subject-error' : undefined}
                     className="form-control"
                     placeholder='Enter your subject'
                  />
                  <p className="form_error">{errors.subject?.message}</p>
               </div>
            </div>
            <div className="col-md-12">
               <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                     id="comment"
                     {...register("comment")}
                     aria-required="true"
                     aria-invalid={!!errors.comment}
                     aria-describedby={errors.comment ? 'comment-error' : undefined}
                     className="form-control"
                     rows={3} placeholder='Enter your message'></textarea>
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

export default ContactForm