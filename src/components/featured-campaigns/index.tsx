'use client'
import Banner from "@/components/common/Banner"
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import FeaturedStories from "@/components/common/FeaturedStories"
import BecomeVolunteer from "@/components/homes/home-one/BecomeVolunteer"
import Blog from "@/components/homes/home-one/Blog"
import FeaturedCampaignsArea from "./FeaturedCampaignsArea"
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { usePathname } from "next/navigation";


const FeaturedCampaigns = () => {
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
         <HeaderOne />
         <main>
         <Banner image_url={imageUrl != "" ? imageUrl : "assets/img/blog/blog-banner.jpg"}  />
            <FeaturedCampaignsArea />
            <FeaturedStories />
            <BecomeVolunteer />
            <Blog />
         </main>
         <FooterOne />
      </>
   )
}

export default FeaturedCampaigns;
