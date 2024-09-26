"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react";
import { fetchPosts, Post } from '@/utils/apiBlogs';

import blogShape_1 from "@/assets/img/shapes/three-round-yellow.png"

const HomeOneBlog = ({ style }: any) => {
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
         console.log(data);
      } catch (error) {
         setError(error as Error);
      } finally {
       setLoading(false);
      }
   };

   getPosts();
   }, [page]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

   return (
      <div className={`pt-120 pb-60 rel z-1 ${style ? "blog-area-two overlay" : "blog-area"}`}>
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-x col-lg-8 col-md-10">
                  <div className={`section-title text-center ${style ? "text-white mb-55" : "mb-60"}`}>
                     <span className="section-title__subtitle mb-10">Our Blog Post</span>
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
                           <Link href={`/blogs/${item.slug}`}><Image src={item.blog_images} width={420} height={280} alt="Blog" /></Link>
                        </div>
                        <div className="blog-item__content blog-container">
                           <h4><Link href={`/blogs/${item.slug}`}>{item.title}</Link></h4>
                           <p className="post-date"><i className="flaticon-calendar"></i> {item.blog_date}</p>
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
                           <p dangerouslySetInnerHTML={{ __html: item.brief}}></p>
                           <Link href={`/blogs/${item.slug}`} className="read-more">Read More <i className="fas fa-arrow-right"></i></Link>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            <div className="text-center pt-30">
               <Link href="/blogs" className="cr-btn">View All</Link>
            </div>
         </div>
         {style ? "" : <Image className="blog-shape-one top_image_bounce" src={blogShape_1} alt="Shape" />}
      </div>
   )
}

export default HomeOneBlog
