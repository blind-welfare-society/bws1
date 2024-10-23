'use client'
import Banner from "@/components/common/Banner"
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import ContactArea from "./ContactArea"
import LocationMap from "./LocationMap"
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import FeaturedStories from "@/components/common/FeaturedStories"
import CtaArea from "@/components/homes/home-one/CtaArea"
import Blog from "@/components/homes/home-one/Blog"

const Contact = () => {
   const pathName = "/contact-us";
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
            <ContactArea/>
            <LocationMap />
            <FeaturedStories />
            <CtaArea />
            <Blog />
         </main>
         <FooterOne />
      </>
   )
}

export default Contact;
