'use client'
import Banner from "@/components/common/Banner"
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import BlogDetailsArea from "./BlogDetailsArea"
import FeaturedStories from "@/components/common/FeaturedStories"
import OurCause from "@/components/homes/home-one/OurCause"
import axios from "@/lib/axios";
import { useState, useEffect } from "react"


const BlogDetails = (props:any) => {
   const slug = props.slug; 
   
   const [cmsContent, setCmsContent] = useState({} as any);

   useEffect(() => {
      axios.get(`/blog-detail/${slug}`).then((res) => {
         //console.log(res.data); // Check the response structure
         setCmsContent(res.data.data);
      });
   }, [slug]);

   const imageUrl = cmsContent.banner_image;

   return (
      <>
         <HeaderOne style_1={false} style_2={false} />
         <main>
            <Banner image_url={imageUrl} />
            <BlogDetailsArea cmsContent={cmsContent} key={cmsContent?.id} />
            <OurCause noOfPosts={4} style={true} />
            <FeaturedStories />
         </main>
         <FooterOne />
      </>
   )
}

export default BlogDetails;
