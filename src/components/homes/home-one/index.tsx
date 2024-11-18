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
import Features from "./Features"

const HomeOne = () => {
   return (
      <>
         <HeaderOne style_1={false} style_2={false} />
         <main>
            <HeroArea />
            <About />
            <ChooseArea />
            <OurCause />
            <Projects />
            <FeaturedStories />
            <Event />
            <Blog style={true} />
            <Testimonial />
            <BecomeVolunteer />
         </main>
         <FooterOne />
      </>
   )
}

export default HomeOne
