'use client'
import Breadcrumb from "@/components/common/Breadcrumb"
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import About from "@/components/homes/home-three/About"
import Features from "@/components/homes/home-one/Features"
import Volunteer from "@/components/homes/home-one/Volunteer"
import Testimonial from "@/components/homes/home-two/Testimonial"
import CtaArea from "@/components/homes/home-three/CtaArea"
import FAQ from "@/components/homes/home-one/FAQ"
import { useEffect, useState } from "react";
import axios from "@/lib/axios";


const InnerAbout = () => {
   const [cmsContent, setCmsContent] = useState({} as any);

   useEffect(() => {
      axios.get('/banner-image/about-us').then((res) => {
         console.log(res.data); // Check the response structure
         setCmsContent(res.data);
      });
   }, []);

   const imageUrl = cmsContent?.image_url;
   const fullPath = "https://admin.kitchenkirana.com/public/storage/cms_pages/" + imageUrl;
   

   return (
      <>
         <HeaderOne style_1={false} style_2={false} />
         <main>
            <Breadcrumb page_title="About Us" page_list="About" image_url={fullPath} style={false} />
            <About />
            <Features />
            <Volunteer style={true} />
            <Testimonial style={false} />
            <CtaArea />
            <FAQ />
         </main>
         <FooterOne />
      </>
   )
}

export default InnerAbout;