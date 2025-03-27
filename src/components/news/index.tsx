'use client'
import Banner from "@/components/common/Banner"
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import NewsArea from "./NewsArea"
import BecomeVolunteer from "@/components/homes/home-one/BecomeVolunteer"
import Blog from "@/components/homes/home-one/Blog"
import FeaturedStories from "@/components/common/FeaturedStories"
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { usePathname } from "next/navigation";

const NewsEvents = () => {
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
                    <div className="col-12">
                        <h1 className="text-center headings-with-border">News & Events</h1>
                    </div>
                </div>
            </div>
               <NewsArea />
               <FeaturedStories />
               <BecomeVolunteer />
               <Blog />
         </main>
         <FooterOne />
      </>
   )
}

export default NewsEvents;
