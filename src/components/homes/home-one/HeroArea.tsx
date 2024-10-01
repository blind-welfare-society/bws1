'use client'
import Link from "next/link"
import Image from "next/image"
import axios from "@/lib/axios";
import { useEffect, useState } from "react";

const HeroArea = () => {
   interface Banner {
      id: number;
      bannerImage: string;
   }
   const [banner, setBanner] = useState({ data: [] } as any);

   useEffect(() => {
      axios.get('/home-banners').then((res) => {
         setBanner(res.data);
      }).catch(err => console.error(err));
   }, []);

   const bannerList = banner.data;

   return (
      <div className="hero-area">
         <div className="grid">
            {bannerList.map((item: Banner, index: number) => (
               <div className="grid__item" key={index}>
                  <Image src={item.bannerImage} alt="Home Banner" priority={false} width={373} height={249} />
               </div>
            ))}
         </div>
      </div>
   )
}

export default HeroArea
