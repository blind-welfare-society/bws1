"use client"

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchPosts, Post, PaginatedResponse } from '@/utils/apiNews';

import aboutShape_1 from "@/assets/img/shapes/three-round-green.png";
import aboutShape_2 from "@/assets/img/shapes/three-round-red.png";


const Event = () => {
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
         const { data, total } = await fetchPosts(page, limit);
         setPosts(data);
         setTotal(total);
      } catch (error) {
         setError(error as Error);
      } finally {
       setLoading(false);
      }
   };

   getPosts();
   }, [page]);

   return (
      <div className="our-event-area pt-120 pb-95 rel z-1">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6 col-lg-8 col-md-10">
                  <div className="section-title text-center mb-65">
                     <h3>Our <span>News & Events</span></h3>
                     <p>Explore our news section to stay updated on our latest events that impact the lives of people with blindness.</p>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="image">
                  <Image className="shape one top_image_bounce" src={aboutShape_1} alt="Shape" />
               </div>
               {posts.map((item) => (
                  <div key={item.id} className="col-xl-4 col-md-6">
                     <div className="blog-item ">
                        <div className="blog-item__img">
                           <Link href={`/news/${item.slug}`}><Image src={item.news_image} width={416} height={278} alt={item.title} /></Link>
                        </div>
                        <div className="blog-item__content news-container">
                           <h4><Link href={`/news/${item.slug}`}>{item.title}</Link></h4>
                           <p dangerouslySetInnerHTML={{ __html: item.brief}}></p>
                           <Link href={`/news/${item.slug}`} className="read-more">Read More</Link>
                        </div>
                     </div>
                  </div>
               ))} 
               <div className="text-center pt-30">
                  <Link href="/news" className="cr-btn">View All</Link>
               </div>
               <div className="image">
                  <Image className="shape two top_image_bounce" src={aboutShape_2} alt="Shape" />
               </div>
            </div> 
         </div>
      </div>
   )
}

export default Event
