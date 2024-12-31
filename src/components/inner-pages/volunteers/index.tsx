'use client'
import Banner from "@/components/common/Banner"
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import CmsPages from "@/components/cmspages"
import FeaturedStories from "@/components/common/FeaturedStories"
import VolunteerArea from "./VolunteerArea"
import Blog from "@/components/homes/home-one/Blog"
import { useEffect, useState } from "react";
import axios from "@/lib/axios";


const Volunteers = () => {
    
    let fullPathName = '/banner-image/volunteer';

    const [cmsContent, setCmsContent] = useState({} as any);

    useEffect(() => {
        axios.get(fullPathName).then((res) => {
            setCmsContent(res.data);
        });
    }, [fullPathName]);

    const imageUrl = cmsContent?.image_url;
   

    return (
        <>
            <HeaderOne style_1={false} style_2={false} />
            <main>
            <Banner image_url={imageUrl} />
            <CmsPages />
            <VolunteerArea /> 
            <FeaturedStories />
            <Blog />
            </main>
            <FooterOne />
        </>
    )
}

export default Volunteers;
