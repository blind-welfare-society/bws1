'use client'
import HeaderOne from "@/layout/headers/HeaderOne"
import HeroArea from "./HeroArea"
import ChooseArea from "./ChooseArea"
import OurCause from "./OurCause"
import Projects from "./Projects"
import Event from "./Event"
import Blog from "./Blog"
import FooterOne from "@/layout/footers/FooterOne"
import About from "./About"
import BecomeVolunteer from "./BecomeVolunteer"
import Testimonial from "./Testimonial"
import FeaturedStories from "@/components/common/FeaturedStories"
import SponsorMeal from "./SponsorMeal"
import LocationMap from "@/components/inner-pages/contact/LocationMap"

const HomeOne = () => {
   return (
      <>
         <HeaderOne style_1={false} style_2={false} />
         <main>
            <HeroArea />
            <About />
            <ChooseArea />
            <OurCause noOfPosts={4} style={false} />
            <SponsorMeal />
            <Projects />
            <FeaturedStories />
            <Event />
            <Blog style={true} />
            <Testimonial />
            <BecomeVolunteer />
            <LocationMap />
         </main>
         <FooterOne />
      </>
   )
}

export default HomeOne
