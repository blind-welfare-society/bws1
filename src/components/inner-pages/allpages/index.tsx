'use client'
import Banner from "@/components/common/Banner"
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import CmsPages from "@/components/cmspages"
import Volunteer from "@/components/homes/home-one/Volunteer"
import Testimonial from "@/components/homes/home-two/Testimonial"
import CtaArea from "@/components/homes/home-three/CtaArea"
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
   const fullPath = "http://localhost/bws-admin/public/storage/cms_pages/" + imageUrl;
   

   return (
      <>
         <HeaderOne style_1={false} style_2={false} />
         <main>
            <Banner image_url={fullPath} />
            <CmsPages />
            <Volunteer style={true} />
            <CtaArea />
            <Testimonial style={false} />
         </main>
         <FooterOne />
      </>
   )
}

export default InnerCmsPage;
