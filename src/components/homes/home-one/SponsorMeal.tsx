'use client'
import Image from "next/image"
import Link from "next/link"
import axios from "@/lib/axios";
import { useEffect, useState } from "react";

import volunteerShape_1 from "@/assets/img/shapes/hand-glass.png";
import volunteerShape_2 from "@/assets/img/shapes/circle-with-line-red.png";
import volunteerShape_3 from "@/assets/img/shapes/heart.png";
import volunteerShape_4 from "@/assets/img/shapes/house-heart.png";
const SponsorMeal = () => {
    
    const [walkingContent, setWalkingContent] = useState<any>({});
    
    const pathName = '/sponsor-a-meal-on-any-special-occasion';

    useEffect(() => {
      axios.get(pathName).then((res) => {
          setWalkingContent(res.data);
      });
   }, [pathName]);

   const { title, brief, image } = walkingContent;

    return (
       <div className="volunteer-area pt-120 pb-90 rel z-1">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-10 col-md-10">
                        <div className="section-title text-center mb-50">
                            <h3><span>{ title }</span></h3>
                            <p>{brief}</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xl-6">
                        <h4 className="pt-10"></h4>
                         { image && (
                                <Image src={image} alt="Cause" width={640} height={304} style={{width: '100%', height: 'auto', border:'1px solid #ccc', padding:'10px'}} />  
                        )}
                         <div className="cause-btn mt-30 mb-20 text-center">
                            <Link className={`cr-btn btn--lightblue`} href={pathName}>Donate now</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="valunteet-shapres">
                <Image className="one top_image_bounce" src={volunteerShape_1} alt="Shape" />
                <Image className="two left_image_bounce" src={volunteerShape_2} alt="Shape" />
                <Image className="three right_image_bounce" src={volunteerShape_3} alt="Shape" />
                <Image className="four top_image_bounce" src={volunteerShape_4} alt="Shape" />
            </div>
        </div>
    )
}

export default SponsorMeal