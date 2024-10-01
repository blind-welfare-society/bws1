'use client'
import Image from "next/image"
import Link from "next/link"
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
const DonateCane = () => {
  const [walkingContent, setWalkingContent] = useState<any>({}); // Initialize with an empty object
  
  const pathName = '/donate-a-walking-cane-lighten-the-life-of-the-blind';

  useEffect(() => {
    axios.get(pathName).then((res) => {
      setWalkingContent(res.data);
    });
  }, [pathName]);

  const { title, brief, image } = walkingContent;

  return (
    <div className="col-md-6 featured-campaigns1">
      <h2 className="text-center headings-with-border">Donate a Walking Cane</h2>
      <div className={`cause-two-item cause-blue`}>
        <div className="image">
          {image && ( // Ensure image exists before rendering
            <Image src={image} alt="Cause" width={386} height={184} />
          )}
        </div>
        <div className="content">
          <h4 className="pt-30">{title}</h4>
          <p>{brief}</p>
          <div className="cause-btn mb-20">
            <Link className="cr-btn btn--yellow" href={pathName}>
              Donate now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};


export default DonateCane