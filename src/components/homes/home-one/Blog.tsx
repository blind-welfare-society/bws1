//"use client"
import Image from "next/image"
import Link from "next/link"
//import { useState, useEffect } from "react";
import { fetchBlogPosts, Post } from '@/utils/apiBlogs';

import blogShape_1 from "@/assets/img/shapes/three-round-yellow.png"

const HomeOneBlog = async ({ style }: any) => {
   const { data: posts } = await fetchBlogPosts(1, 3);

   return (
      <div className={`pt-120 rpt-50 pb-60 rel z-1 ${style ? "blog-area-two overlay" : "blog-area"}`}>
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-x col-lg-8 col-md-10">
                  <div className={`section-title text-center ${style ? "text-white mb-55" : "mb-60"}`}>
                     <h2>Our Latest <span>Blogs</span></h2>
                     <p>Read our blogs to understand the major challenges face by people with blindness.</p>
                  </div>
               </div>
            </div>

            <div className="row justify-content-center">
               {posts.map((item) => (
                  <div key={item.id} className="col-xl-4 col-md-6">
                     <div className="blog-item">
                        <div className="blog-item__img">
                           <Link href={`/blogs/${item.slug}`}><Image src={item.blog_images} width={420} height={280} alt={item.title} /></Link>
                        </div>
                        <div className="blog-item__content blog-container">
                           <h4><Link href={`/blogs/${item.slug}`}>{item.title}</Link></h4>
                           <p className="post-date"><i className="flaticon-calendar"></i> {item.blog_date}</p>
                           {/*
                           <div className="blog-categories">
                              {Array.isArray(item.cat_name) && item.cat_name.length > 0 ? (
                                 item.cat_name.map((category, index) => (
                                 <span key={`${category.slug}-${index}`}>
                                    <Link href={`/blog/${category.slug}`}>{category.name}</Link>
                                    {index < item.cat_name.length - 1 ? ', ' : ''}
                                 </span>
                                 ))
                              ) : "" }
                           </div>
                           */}
                           <p dangerouslySetInnerHTML={{ __html: item.brief }}></p>
                           <Link href={`/blogs/${item.slug}`} className="read-more" aria-label="Read More">
                              Read More <i className="fas fa-arrow-right" aria-hidden="true"></i>
                           </Link>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            <div className="text-center pt-30">
               <Link href="/blogs" className="cr-btn" aria-label="View All Blogs">
                  View All
               </Link>
            </div>
         </div>
         {style ? "" : <Image className="blog-shape-one top_image_bounce" src={blogShape_1} alt="Shape" />}
      </div>
   )
}

export default HomeOneBlog
