'use client'
import Image from "next/image"

import aboutThumb from "@/assets/img/about/about-three-right.png"
import axios from "@/lib/axios";
import { useEffect, useState } from "react";


const About = () => {

   const [cmsContent, setCmsContent] = useState({} as any);

   useEffect(() => {
      axios.get('/about-us').then((res) => {
         setCmsContent(res.data);
      });
   }, []);

   return (
      <div className="about-us-three pt-40 pb-55">
         <div className="container">
            <div className="row gap-80 align-items-center">
               <div className="col-xl-6">
                  <div className="about-us-content-three mb-65">
                     <div className="section-title mb-65">
                        <span className="section-title__subtitle mb-10"></span>
                        <h2>{cmsContent['title']}</h2>
                     </div>
                      <div dangerouslySetInnerHTML={{ __html: cmsContent['content'] }}></div>
                    
                     <hr className="mt-30 mb-5" />
                  </div>
               </div>
               <div className="col-xl-6">
                  <div className="about-us-image-three mb-65">
                     <Image src={aboutThumb} alt="About" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default About
