"use client"
import Image from "next/image"
import { useState, useEffect } from "react";
import { fetchTestimonialsPosts, Post, PaginatedResponse } from '@/utils/apiTestimonials';
import Link from "next/link"

const Testimonial = () => {
   const [posts, setPosts] = useState<Post[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<Error | null>(null);
   const [page, setPage] = useState(1);
   const [total, setTotal] = useState(0);

   const limit = 3;
   useEffect(() => {
   const getPosts = async () => {
      try {
         setLoading(true);
         const { data, total } = await fetchTestimonialsPosts(page, limit);
         setPosts(data);
      } catch (error) {
         setError(error as Error);
      } finally {
      setLoading(false);
      }
   };

   getPosts();
   }, [page]);

   return (
      <div className="testimonials-area-three py-120 rel z-1">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6 col-lg-8 col-md-10">
                  <div className="section-title text-center mb-30">
                     <span className="section-title__subtitle mb-10">Testimonials</span>
                     <h3>What Say Our <span>Supporters</span></h3>
                     <p>Here are few words of appreciation from our donors, supporters and volunteers.</p>
                  </div>
               </div>
            </div>
            
            <div className="row justify-content-center">
               {posts?.map((item: any) => (
               <div key={item.id} className="col-xl-4 col-md-6">
                  <div className={`testimonial-item-three`}>
                     <div className="author"><Image src={item.image || ""} alt={item.name}  width={100} height={100} /></div>
                     <div className="text">{item.description}</div>
                     <h4 className="name">{item.name}</h4>
                     <span className="designation">{item.location}</span>
                  </div>
               </div>
               ))}
            </div>
            <div className="text-center pt-30">
               <Link href="/testimonials" className="cr-btn">View All</Link>
            </div>
         </div>
         <div className="testimonials-bg bgs-cover" style={{ backgroundImage: `url(assets/img/background/feature-bg.jpg)` }}>
         </div>
      </div>
   )
}

export default Testimonial
