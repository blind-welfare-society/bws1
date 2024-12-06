'use client'
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import FeaturedStories from "@/components/common/FeaturedStories"
import OurCause from "@/components/homes/home-one/OurCause"
import ProjectDetailsArea from "./ProjectDetailsArea"
import BecomeVolunteer from "@/components/homes/home-one/BecomeVolunteer"
import Blog from "@/components/homes/home-one/Blog"
import axios from "@/lib/axios";
import { useState, useEffect } from "react"

const ProjectDetails = (props:any) => {
   const slug = props.slug; 
   
   const [projectContent, setProjectContent] = useState({} as any);
   const [productList, setProductList] = useState({} as any);

   useEffect(() => {
      axios.get(`/project-detail/${slug}`).then((res) => {
          setProjectContent(res.data.data.project);
          setProductList(res.data.data.product_list);
      });
   }, [slug]);
   
   
   return (
      <>
         <HeaderOne style_1={false} style_2={false} />
           <main>
            <ProjectDetailsArea project_content={projectContent} product_list={productList} />
            <OurCause noOfPosts={4} style={true} />
            <FeaturedStories />
            <BecomeVolunteer />
            <Blog />
         </main>
         <FooterOne />
      </>
   )
}

export default ProjectDetails;
