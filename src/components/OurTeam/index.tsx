'use client'
import Banner from "@/components/common/Banner"
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import FeaturedStories from "@/components/common/FeaturedStories"
import TeamArea from "./TeamArea"
import OurCause from "@/components/homes/home-one/OurCause"

const Blogs = () => {
   return (
      <>
         <HeaderOne style_1={false} style_2={false} />
         <main>
            <Banner image_url="assets/img/blog/blog-banner.jpg" />
            <div className="container">
               <div className="row">
                  <div className="col-12">
                        <h1 className="text-center headings-with-border">Our Team</h1>
                  </div>
               </div>
            </div>
            <TeamArea />
            <OurCause noOfPosts={4} style={true} />
            <FeaturedStories />
         </main>
         <FooterOne />
      </>
   )
}

export default Blogs;
