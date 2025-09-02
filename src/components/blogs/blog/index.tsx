'use client'
import Banner from "@/components/common/Banner"
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import FeaturedStories from "@/components/common/FeaturedStories"
import BlogArea from "./BlogArea"
import OurCause from "@/components/homes/home-one/OurCause"
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { usePathname } from "next/navigation";
import MediaHighlights from "@/components/homes/home-one/MediaHighlights";

const Blogs = () => {
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
                        <h1 className="text-center headings-with-border">Blogs</h1>
                  </div>
               </div>
            </div>
            <BlogArea />
            <OurCause noOfPosts={4} style={true} />
            <FeaturedStories />
            <MediaHighlights headerPadding={`pt-120`} />
         </main>
         <FooterOne />
      </>
   )
}

export default Blogs;
