'use client'
import Banner from "@/components/common/Banner"
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import FeaturedStories from "@/components/common/FeaturedStories"
import ProjectListArea from "./ProjectListArea"

const ProjectsList = () => {
   return (
      <>
         <HeaderOne style_1={false} style_2={false} />
         <main>
            <Banner image_url="assets/img/blog/blog-banner.jpg" />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center headings-with-border">Our Projects</h1>
                    </div>
                </div>
            </div>
            <ProjectListArea />
            <FeaturedStories />
         </main>
         <FooterOne />
      </>
   )
}

export default ProjectsList;
