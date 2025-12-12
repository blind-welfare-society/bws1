'use client'
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import FeaturedStories from "@/components/common/FeaturedStories"
import RelatedCause from "./RelatedCause"
import ProjectDetailsArea from "./ProjectDetailsArea"
import BecomeVolunteer from "@/components/homes/home-one/BecomeVolunteer"
import Blog from "@/components/homes/home-one/Blog"
import Tabs from "@/components/common/Tabs"
import ShareButtons from "@/components/common/ShareButtons";
import axios from "@/lib/axios";
import { useState, useEffect } from "react"

const ProjectDetails = (props:any) => {
   const slug = props.slug; 
   
   const [projectContent, setProjectContent] = useState({} as any);
   const [productList, setProductList] = useState({} as any);
   const [recentDonarList, setRecentDonarList] = useState({} as any);
   const [mostGenerousDonar, setMostGenerousDonar] = useState({} as any);

   useEffect(() => {
      axios.get(`/project-detail/${slug}`).then((res) => {
          setProjectContent(res.data.data.project);
          setProductList(res.data.data.product_list);
          setMostGenerousDonar(res.data.data.mostGenerousDonar);
          setRecentDonarList(res.data.data.recentDonar);
      });
   }, [slug]);
   
   return (
      <>
         <HeaderOne style_1={false} style_2={false} />
           <main>
            <ProjectDetailsArea project_content={projectContent} product_list={productList} />
            <Tabs mostGenerousDonar={mostGenerousDonar} recentDonarList={recentDonarList} />
            <div className="container">
               <div className="row">
                  <div className="col-md-12">
                     <ShareButtons />
                  </div>
               </div>
            </div>
            <RelatedCause noOfPosts={4} slug={slug} />
            <FeaturedStories />
            <Blog />
            <BecomeVolunteer />
         </main>
         <FooterOne />
      </>
   )
}

export default ProjectDetails;
