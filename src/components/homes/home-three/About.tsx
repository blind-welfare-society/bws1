'use client'
import Image from "next/image"

import aboutThumb from "@/assets/img/about/about-three-right.png"
import axios from "@/lib/axios";
import { useEffect, useState } from "react";


interface ContentType {
   sub_title: string;
   title: JSX.Element;
   desc: JSX.Element;
   list: string[];
   author: string;
   designation: string;
}

const about_content: ContentType = {
   sub_title: "About us",
   title: (<>We make a different life for <span>African people</span></>),
   desc: (<>There are many variations of passages of available but the majority have suffered alteration in some form, by injected humou ndomised words even slightly believable Making this the first true.</>),
   list: [],
   author: "Ronald Richards",
   designation: "Funder & CEO , Charity Club",
}

const { sub_title, title, desc, list, author, designation } = about_content;

const About = () => {

   const [cmsContent, setCmsContent] = useState({} as any);

   useEffect(() => {
      axios.get('/about-us').then((res) => {
         setCmsContent(res.data)
      });
   }, []);

   return (
      <div className="about-us-three pt-120 pb-55">
         <div className="container">
            <div className="row gap-80 align-items-center">
               <div className="col-xl-6">
                  <div className="about-us-content-three mb-65">
                     <div className="section-title mb-65">
                        <span className="section-title__subtitle mb-10">{sub_title}</span>
                        <h2>{cmsContent['title']}</h2>
                     </div>
                      <div dangerouslySetInnerHTML={{ __html: cmsContent['content'] }}></div>
                     <ul className="list-style-one pt-15">
                        {list.map((list, index) => (<li key={index}>{list}</li>))}
                     </ul>
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
