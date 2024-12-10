'use client'
import Banner from "@/components/common/Banner"
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import BlogDetailsArea from "./BlogDetailsArea"
import FeaturedStories from "@/components/common/FeaturedStories"
import OurCause from "@/components/homes/home-one/OurCause"
import axios from "@/lib/axios";
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation";


const BlogDetails = (props:any) => {
   const slug = props.slug; 

   const pathName = usePathname();
   const router = useRouter();
   
   const [cmsContent, setCmsContent] = useState({} as any);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
     const fetchData = async () => {
         try {
            const res = await axios.get(`/blog-detail/${slug}`);
            const data = res.data.data;
            // If title is blank, redirect to 404
            if (!data?.title) {
               router.push('/');
               return;
            }

            setCmsContent(data);
         } catch (error) {
            router.push('/'); // Redirect to 404 on fetch failure
         } finally {
            setIsLoading(false);
         }
      };

      fetchData();
   }, [slug, pathName, router]);

   if (isLoading) {
      return <div>Loading...</div>; // Optional: Show a loading state while fetching data
   }

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