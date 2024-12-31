'use client'
import Banner from "@/components/common/Banner"
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import VideoArea from "./VideoArea"
import FeaturedStories from "@/components/common/FeaturedStories"
import Blog from "@/components/homes/home-one/Blog"
import { useEffect, useState } from "react";
import axios from "@/lib/axios";


const Videos = () => {
    
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
            <VideoArea />
            <FeaturedStories />
            <Blog />
            </main>
            <FooterOne />
        </>
    )
}

export default Videos;
