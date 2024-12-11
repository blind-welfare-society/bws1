'use client'
import { usePathname } from "next/navigation";
import PaymentMods from "@/components/common/PaymentMods";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import ProjectFaqs from "@/components/common/ProjectFaqs";
import SponsorMealForm from "@/components/forms/SponsorMealForm";


const SponsorMeal = () => {

   const pathName = usePathname();

   const [cmsContent, setCmsContent] = useState({} as any);

   useEffect(() => {
      axios.get(pathName).then((res) => {
         setCmsContent(res.data);
      });
   }, [pathName]);

   //console.log(cmsContent);
   const minamount = cmsContent?.minamount;

   return (
      <div className="about-us-three pt-10 pb-15">
         <div className="container">
            <div className="row">
               <div className="col-md-12 mb-40">
                  <h1 className="text-center headings-with-border">{cmsContent['title']}</h1>
               </div>
               <div className="col-xl-8">
                  <div className="about-us-content-three mb-25">
                     <div dangerouslySetInnerHTML={{ __html: cmsContent['video_content'] }}></div>
                  </div>
                  <div className="about-us-content-three mb-25">
                     <div dangerouslySetInnerHTML={{ __html: cmsContent['content'] }}></div>
                  </div>
               </div>
               <div className="col-xl-4">
                  <SponsorMealForm minamount={minamount} />
               </div>
            </div>
            <div className="row">
               <div className="col-md-8">
                  <div className="about-us-content-three mb-25">
                     <div dangerouslySetInnerHTML={{ __html: cmsContent['description'] }}></div>
                  </div>
                  <div className="about-us-content-three mb-25">
                     <PaymentMods />
                     <ProjectFaqs />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default SponsorMeal