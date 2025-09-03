"use client"

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchPosts, Post, PaginatedResponse } from '@/utils/apiMediaHeights';
import aboutShape_1 from "@/assets/img/shapes/three-round-green.png";
import aboutShape_2 from "@/assets/img/shapes/three-round-red.png";


const MediaHighlights = ({ headerPadding }: any) => {
   const [posts, setPosts] = useState<Post[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<Error | null>(null);
   const [page, setPage] = useState(1);
   const [total, setTotal] = useState(0);

   const header_padding = headerPadding || 'pt-120';

   const limit = 4;

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
      <div className={`our-event-area rpt-50 pt-10 pb-md-95 pb-40 rel z-1 ${header_padding}`}>
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6 col-lg-8 col-md-10">
                  <div className="section-title text-center mb-65">
                     <h3>Media <span>Highlights</span></h3>
                     <p>Explore media coverage of our initiatives and their impact on people with visual Challenges.</p>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="image">
                  <Image className="shape one top_image_bounce" src={aboutShape_1} alt="Shape" />
               </div>
               {posts.map((item) => (
                  <div key={item.id} className="col-xl-3 col-md-6">
                     <div className="media-highlight-item mb-30">
                        <div className="media-highlight-item__img">
                           <Link href={`${item.media_link}`} target="_blank"><Image src={item.media_image} width={400} height={200} alt={item.media_name} /></Link>
                        </div>
                        <div className="media-highlight-item__content">
                           <h4><Link href={`${item.media_link}`} target="_blank">{item.media_name}</Link></h4>
                        </div>
                     </div>
                  </div>
               ))} 
               <div className="image">
                  <Image className="shape two top_image_bounce" src={aboutShape_2} alt="Shape" />
               </div>
            </div> 
         </div>
      </div>
   )
}

export default MediaHighlights
