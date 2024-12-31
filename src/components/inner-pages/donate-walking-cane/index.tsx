'use client'
import Banner from "@/components/common/Banner"
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import WalkingCane from "./WalkingCane"
import FeaturedStories from "@/components/common/FeaturedStories"
import BecomeVolunteer from "@/components/homes/home-one/BecomeVolunteer"
import Blog from "@/components/homes/home-one/Blog"
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { usePathname } from "next/navigation";


const InnerCmsPage = () => {
   const pathName = usePathname();
   let fullPathName = '/banner-image' + pathName;
    
   const [cmsContent, setCmsContent] = useState({} as any);

   useEffect(() => {
      axios.get(fullPathName).then((res) => {
         //console.log(res.data); // Check the response structure
         setCmsContent(res.data);
      });
   }, [fullPathName]);

   const imageUrl = cmsContent?.image_url;
   

   return (
      <>
         <HeaderOne style_1={false} style_2={false} />
         <main>
            <Banner image_url={imageUrl} />
            <WalkingCane />
            <FeaturedStories />
            <BecomeVolunteer />
            <Blog />
         </main>
         <FooterOne />
      </>
   )
}

export default InnerCmsPage;
