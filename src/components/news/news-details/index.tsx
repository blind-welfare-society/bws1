'use client'
import Banner from "@/components/common/Banner"
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import NewsDetailsArea from "./NewsDetailsArea"
import FeaturedStories from "@/components/common/FeaturedStories"
import BecomeVolunteer from "@/components/homes/home-one/BecomeVolunteer"
import Blog from "@/components/homes/home-one/Blog"
import axios from "@/lib/axios";
import { useState, useEffect } from "react"
import OurCause from "@/components/homes/home-one/OurCause"


const NewsDetails = (props:any) => {
   const slug = props.slug; 
   
   const [cmsContent, setCmsContent] = useState({} as any);

   useEffect(() => {
      axios.get(`/news-detail/${slug}`).then((res) => {
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
            <NewsDetailsArea cmsContent={cmsContent} key={cmsContent?.id} />
            <OurCause noOfPosts={4} style={true} />
            <FeaturedStories />
            <BecomeVolunteer />
            <Blog />
         </main>
         <FooterOne />
      </>
   )
}

export default NewsDetails;
