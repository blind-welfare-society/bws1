import cause_data from "@/data/causeData"
import Image from "next/image"
import Link from "next/link"
import CircleProgress from "@/hooks/Circular"
import { useState, useEffect } from "react";
import { fetchPosts, Post, PaginatedResponse } from '@/utils/apiFeaturedCampaigns';
import DonateCane from "@/components/homes/home-one/DonateCane";
import SponsorMeal from "@/components/homes/home-one/SponsorMeal";

import causeShape_1 from "@/assets/img/shapes/half-circle-with-dots.png";
import causeShape_2 from "@/assets/img/shapes/circle-with-line-red.png";
import causeShape_3 from "@/assets/img/shapes/circle-with-line-green.png";

const OurCause = () => {

   const [posts, setPosts] = useState<Post[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<Error | null>(null);
   const [page, setPage] = useState(1);
   const [total, setTotal] = useState(0);

   const limit = 12;

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
      <div className="urgent-cause-area pt-120 pb-90 rel z-1 overlay bgs-cover " style={{ backgroundImage: `url(/assets/img/causes/bws-girls.jpg)` }}>
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
                  <div key={item.id} className="col-md-6 featured-campaigns">
                     <h2 className="text-center headings-with-border">{item.project_Name}</h2>
                     <div className={`cause-two-item cause-blue`}>
                        <div className="image">
                           <Image src={item.image} alt="Cause" width={386} height={184} />
                        </div>
                        <div className="content">
                           <div className={`circle-progresss two`}>
                              <div className="chart" data-percent="65">
                                 <span><CircleProgress finish={item.percent_count} /></span>
                              </div>
                           </div>
                           <h4><Link href={`/projects/${item.project_slug}`}>{item.project_title}</Link></h4>
                           <p> {item.project_brief}</p>
                           <div className="row mb-8">
                                <div className="col-md-6">
                                    <div className="cause-price cause-price--yellow">
                                        <p className="donateDetails">₹{item.totalAmount}<br /><small>raised of ₹{item.target_amount}</small></p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>{item.total_donar}</strong> Supporters</p>       
                                </div>
                           </div>
                           <div className="cause-btn">
                              <Link className={`cr-btn btn--yellow`} href="{`/projects/${item.project_slug}`}">Donation now</Link>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            <div className="row">
               <DonateCane />
               <SponsorMeal />
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
