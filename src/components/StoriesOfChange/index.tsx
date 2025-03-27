'use client'
import Banner from "@/components/common/Banner"
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import StoryOfChangeArea from "./StoryOfChangeArea"
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { usePathname } from "next/navigation";


const StoriesOfChange = () => {
   const pathName = usePathname();
   let fullPathName = '/page-banners' + pathName;
    
   const [cmsContent, setCmsContent] = useState({} as any);

   useEffect(() => {
      axios.get(fullPathName).then((res) => {
         //console.log(res.data); // Check the response structure
         setCmsContent(res.data);
         window.scrollTo(0, 0);
      });
   }, [fullPathName]);

   const imageUrl = cmsContent?.image_url;

   return (
      <>
         <HeaderOne style_1={false} style_2={false} />
         <main>
            <Banner image_url={imageUrl != "" ? imageUrl : "assets/img/blog/blog-banner.jpg"}  />
            <div className="container">
               <div className="row">
                  <div className="col-12 mb-40 pt-20">
                     <h1 className="text-center headings-with-border">Stories of Change</h1>
                  </div>
               </div>
            </div> 
            <StoryOfChangeArea />
         </main>
         <FooterOne />
      </>
   )
}

export default StoriesOfChange;
