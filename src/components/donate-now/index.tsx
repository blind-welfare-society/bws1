'use client'
import Banner from "@/components/common/Banner";
import FooterOne from "@/layout/footers/FooterOne";
import HeaderOne from "@/layout/headers/HeaderOne";
import DonateArea from "./DonateArea";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";

const DonateNow = () => {
    let fullPathName = '/banner-image/donate';
        
    const [cmsContent, setCmsContent] = useState({} as any);
    

    useEffect(() => {
        axios.get(fullPathName).then((res) => {
            //console.log(res.data); // Check the response structure
            setCmsContent(res.data);
        });
    }, [fullPathName]);
    const imageUrl = cmsContent?.image_url;
    
    return (
        <>
        <HeaderOne style_1={false} style_2={false} />
        <main>
            <Banner image_url={imageUrl} />
            <DonateArea />
         </main>
         <FooterOne />
        </>
    )
}

export default DonateNow;