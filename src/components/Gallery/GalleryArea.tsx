
'use client'
import GalleryPhotos from "./GalleryPhotos"
import axios from "@/lib/axios";
import { useEffect, useState } from "react";

const GalleryArea = () => {
    const [imageData, setImageData] = useState([] as any[]);

    useEffect(() => {
        axios.get('/photo-gallery').then((res) => {
        const images = res.data.data.images.data.map((item: any) => ({
            src: `https://www.blindwelfaresociety.in/public/storage/gallery/${item.name}`,
            description: item.title
        }));
         
        setImageData(images);
            
      });
    }, []);

    console.log(imageData);
    
    return (
        <div className="row justify-content-center">
            <div className="col-md-10 my-100">
                <div className="col-md-12 mb-40">
                    <h1 className="text-center headings-with-border">Photo Gallery</h1>
                    <p className="text-center punch-line mt-4"><strong>Welcome to our photo gallery, where we capture the essence of our mission and the vibrant community we serve. Each photo tells a story of resilience, empowerment, and the collective effort to make a difference in the lives of visually impaired individuals.</strong></p>
                </div>
                <div className="gallery-area">
                    <GalleryPhotos images={imageData} />
                </div>
            </div>
        </div>
    )
}

export default GalleryArea;