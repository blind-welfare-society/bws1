'use client'
import { usePathname } from "next/navigation";
import PaymentMods from "@/components/common/PaymentMods";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import ProjectFaqs from "@/components/common/ProjectFaqs";
import DonateWalkingCaneForm from "@/components/forms/DonateWalkingCaneForm";


const WalkingCane = () => {

   const pathName = usePathname();

   const [cmsContent, setCmsContent] = useState({} as any);

   useEffect(() => {
      axios.get(pathName).then((res) => {
         setCmsContent(res.data);
      });
   }, [pathName]);

   console.log(cmsContent);

   return (
      <div className="about-us-three pt-10 pb-15">
         <div className="container">
            <div className="row">
               <div className="col-md-12 mb-40">
                  <h1 className="text-center headings-with-border">{cmsContent['title']}</h1>
               </div>
               <div className="col-xl-8">
                  <div className="about-us-content-three mb-25">
                     <div dangerouslySetInnerHTML={{ __html: cmsContent['content'] }}></div>
                  </div>
                  <div className="about-us-content-three mb-25">
                     <div dangerouslySetInnerHTML={{ __html: cmsContent['description'] }}></div>
                  </div>
                  <div className="about-us-content-three mb-25">
                     <PaymentMods />
                     <ProjectFaqs />
                  </div>
               </div>
               <div className="col-xl-4">
                  <DonateWalkingCaneForm />
               </div>
            </div>
         </div>
      </div>
   )
}

export default WalkingCane