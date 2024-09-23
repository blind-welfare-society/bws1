'use client'
import Banner from "@/components/common/Banner"
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import TestimonialsArea from "./TestimonialsArea"
import FeaturedStories from "@/components/common/FeaturedStories"
import BecomeVolunteer from "@/components/homes/home-one/BecomeVolunteer"
import Blog from "@/components/homes/home-one/Blog"


const Testimonials = () => {
   return (
      <>
         <HeaderOne style_1={false} style_2={false} />
         <main>
               <Banner image_url="assets/img/background/background.jpg" />
               <div className="container">
                  <div className="row">
                     <div className="col-12 mb-40">
                           <h1 className="text-center headings-with-border">Testimonials</h1>
                     </div>
                  </div>
               </div> 
            <TestimonialsArea />
            <FeaturedStories />
            <BecomeVolunteer />
            <Blog style={false} />
         </main>
         <FooterOne />
      </>
   )
}

export default Testimonials;
