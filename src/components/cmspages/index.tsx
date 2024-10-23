'use client'
import { usePathname } from "next/navigation";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";


const CmsPages = () => {

   const pathName = usePathname();

   const [cmsContent, setCmsContent] = useState({} as any);

   useEffect(() => {
      axios.get(pathName).then((res) => {
         setCmsContent(res.data);
      });
   }, [pathName]);

   return (
      <div className="about-us-three pt-10 pb-15">
         <div className="container">
            <div className="row gap-80 align-items-center">
               <div className="col-xl-12">
                  <div className="about-us-content-three mb-25">
                     <div className="row">
                        <div className="col-md-12 mb-40">
                           <h1 className="text-center headings-with-border">{cmsContent['title']}</h1>
                        </div>
                     </div>
                     <div dangerouslySetInnerHTML={{ __html: cmsContent['content'] }}></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default CmsPages
