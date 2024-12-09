import Image from "next/image"
import Link from "next/link"
import CircleProgress from "@/hooks/Circular"
import { useState, useEffect } from "react";
import { fetchPosts, Post, PaginatedResponse } from '@/utils/apiFeaturedCampaigns';

import causeShape_1 from "@/assets/img/shapes/half-circle-with-dots.png";
import causeShape_2 from "@/assets/img/shapes/circle-with-line-red.png";
import causeShape_3 from "@/assets/img/shapes/circle-with-line-green.png";

const OurCause = ({ noOfPosts, style }: { noOfPosts: number, style: boolean }) => {

   const [posts, setPosts] = useState<Post[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<Error | null>(null);
   const [page, setPage] = useState(1);
   const [total, setTotal] = useState(0);

   const limit = noOfPosts;

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
   }, [page, limit]);



   return (
      <div className="urgent-cause-area pt-120 rpt-50 pb-90 rel z-1 overlay bgs-cover " style={{ backgroundImage: `url(/assets/img/causes/bws-girls.jpg)` }}>
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-8 col-lg-10 col-md-10">
                  <div className="section-title text-center mb-50">
                     <h3>Featured <span> Campaigns</span></h3>
                     <p><strong>By contributing to our feature donation campaigns, you are not just supporting us, you are fostering independence, education, and accessibility for the people with blindness.</strong></p>
                  </div>
               </div>
            </div>
            
            <div className="row">
               {posts.map((item) => (
                  <div key={item.id} className={ `${style ? "col-md-3 four-cols pe-0 ps-0" : "col-md-6"} featured-campaigns`}>
                     <h2 className={ `${style ? "" : "headings-with-border"} text-center`}>{item.project_Name}</h2>
                     <div className={`cause-two-item cause-blue`}>
                        <div className="image">
                           <Image src={item.image} alt={item.project_Name} width={386} height={184} />
                        </div>
                        <div className="content">
                           <div className={ `${style ? "project-box-wrapper-style2" : "project-box-wrapper"} pt-4`}>
                              <h4 className="title"><Link href={`/projects/${item.project_slug}`}>{item.project_title}</Link></h4>
                              {item.project_brief && <p>{item.project_brief}</p>}
                              <div className="row">
                                 <div className="col-md-6">
                                    <p className="donateDetails">₹{item.totalAmount}<br /><small>raised of ₹{item.target_amount}</small></p>
                                 </div>
                                 <div className="col-md-6">
                                    <div className="counterBox">
                                       <div className="box">
                                         {item.percent_count && <p>{`${item.percent_count}%`}</p>}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className={ `${style ? "mb-2" : "mb-4"} row donarDetails`}>
                                 <div className="col-md-6">
                                    <p><strong>{item.left_days}</strong> Days left</p>
                                 </div>
                                 <div className="col-md-6">
                                    <p><strong>{item.total_donar}</strong> Supporters</p>
                                 </div>
                              </div>
                              <div className="cause-btn">
                                 <Link className={`cr-btn btn--lightblue`} href={`/projects/${item.project_slug}`}>Donate Now</Link>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
               {style  && (
                  <div className="text-center pt-30">
                  <Link href="/featured-campaigns" className="cr-btn">View All</Link>
                  </div>
               )}
            </div>

         </div>
         <div className="urgent-cause-shapes">
            <Image className="one top_image_bounce" src={causeShape_1} alt="Shape" />
            <Image className="two left_image_bounce" src={causeShape_2} alt="Shape" />
            <Image className="three right_image_bounce" src={causeShape_3} alt="Shape" />
         </div>
      </div>
   )
}

export default OurCause
