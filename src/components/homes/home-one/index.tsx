'use client'
import HeaderOne from "@/layout/headers/HeaderOne"
import HeroArea from "./HeroArea"
import ImpactCounter from "./ImpactCounter"
import ChooseArea from "./ChooseArea"
import OurCause from "./OurCause"
import Projects from "./Projects"
import Event from "./Event"
import MediaHighlights from "./MediaHighlights" 
import Blog from "./Blog"
import FooterOne from "@/layout/footers/FooterOne"
import About from "./About"
import BecomeVolunteer from "./BecomeVolunteer"
import Testimonial from "./Testimonial"
import FeaturedStories from "@/components/common/FeaturedStories"
import SponsorMeal from "./SponsorMeal"
import LocationMap from "@/components/inner-pages/contact/LocationMap"
import type { HomeBanner } from "./HeroArea"

type HomeOneProps = {
   banners: HomeBanner[]
}

const HomeOne = ({ banners }: HomeOneProps) => {
   return (
      <>
         <HeaderOne style_1={false} style_2={false} />
         <main>
            <HeroArea banners={banners} />
            <ImpactCounter />
            <About />
            <ChooseArea />
            <OurCause noOfPosts={4} style={false} />
            <SponsorMeal />
            <Projects />
            <FeaturedStories />
            <Event />
            <Blog style={true} />
            <MediaHighlights headerPadding={`pt-10`} />
            <Testimonial />
            <BecomeVolunteer />
            <LocationMap />
         </main>
         <FooterOne />
      </>
   )
}

export default HomeOne
