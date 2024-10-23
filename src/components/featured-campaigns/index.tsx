'use client'
import Banner from "@/components/common/Banner"
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import FeaturedStories from "@/components/common/FeaturedStories"
import BecomeVolunteer from "@/components/homes/home-one/BecomeVolunteer"
import Blog from "@/components/homes/home-one/Blog"
import FeaturedCampaignsArea from "./FeaturedCampaignsArea"
import { useEffect, useState } from "react";
import axios from "@/lib/axios";


const FeaturedCampaigns = () => {
    
    return (
      <>
         <HeaderOne />
         <main>
            <Banner image_url="assets/img/background/bws_banner.jpg" />
            <FeaturedCampaignsArea />
            <FeaturedStories />
            <BecomeVolunteer />
            <Blog />
         </main>
         <FooterOne />
      </>
   )
}

export default FeaturedCampaigns;
