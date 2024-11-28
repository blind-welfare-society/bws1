import Image from "next/image";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import Link from "next/link";

import volunteerShape_1 from "@/assets/img/shapes/hand-glass.png";
import volunteerShape_2 from "@/assets/img/shapes/circle-with-line-red.png";
import volunteerShape_3 from "@/assets/img/shapes/heart.png";
import volunteerShape_4 from "@/assets/img/shapes/house-heart.png";

const FeaturedStories =() => {

   const [cmsContent, setCmsContent] = useState({} as any);

   const pathName = "stories-of-change-featured";

   useEffect(() => {
      axios.get(pathName).then((res) => {
         setCmsContent(res.data);
      });
   }, [pathName]);

   const featuredData = cmsContent.data
   
   return (
      <div className="volunteer-area pt-120 pb-90 rel z-1">
         <div className="container container-1170">
            <div className="row justify-content-center">
               <div className="col-xl-6 col-lg-8 col-md-10">
                  <div className="section-title text-center mb-60">
                     <h3>Stories of  <span>Change</span></h3>
                     <p>The following stories highlight the transformative journey of these remarkable individuals within our organization.</p>
                  </div>
               </div>
            </div>

            <div className="row justify-content-center">
               {featuredData?.map((item: any) => (
                  <div key={item.id} className="col-xl-4 col-md-6">
                     <div className="storyBox">
                           <div className="storyBox__img">
                              <Image src={item.thumb} alt={item.name} width={100} height={100}  /> 
                           </div>
                           <div className="storyBox__content">
                           <h6><Link href={`/${item.slug}`}>{item.name}</Link></h6>
                           <p className="mb-1">{item.brief}</p>
                           <Link href={`/${item.slug}`} className="read-more">Read More</Link>
                           </div>
                     </div>
                  </div>
               ))}
               <div className="text-center pt-30">
                  <Link href="/stories-of-change" className="cr-btn">View All</Link>
               </div>
            </div>
         </div>
         
        <div className="valunteet-shapres">
            <Image className="one top_image_bounce" src={volunteerShape_1} alt="Shape" />
            <Image className="two left_image_bounce" src={volunteerShape_2} alt="Shape" />
            <Image className="three right_image_bounce" src={volunteerShape_3} alt="Shape" />
            <Image className="four top_image_bounce" src={volunteerShape_4} alt="Shape" />
        </div>
      </div>
   )
}

export default FeaturedStories;