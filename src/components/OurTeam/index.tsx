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
               <div className="row justify-content-center">
                  <div className="col-10">
                        <h1 className="text-center headings-with-border">Our Team</h1>
                        <p className="text-center"><strong>At the Blind Welfare Society, our team is a blend of passionate individuals dedicated to creating a world where blindness is not a limitation but a pathway to new opportunities. From experienced leaders to tireless volunteers, we work as a united force to empower visually impaired individuals, particularly in rural and underserved communities.</strong></p>
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