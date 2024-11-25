import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import DonationForm from "./DonationForm";

const DonateArea = () => { 
    const pathName = "/donate";

    const [cmsContent, setCmsContent] = useState({} as any);

    useEffect(() => {
        axios.get(pathName).then((res) => {
            setCmsContent(res.data);
        });
    }, [pathName]);
    return (
       <div className="about-us-three pt-10 pb-15">
         <div className="container">
            <div className="row gap-80 align-items-center">
               <div className="col-xl-12">
                  <div className="about-us-content-three mb-25">
                        <div className="row">
                            <div className="col-md-12 mb-40">
                                <h1 className="text-center headings-with-border">{cmsContent['title']}</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <iframe
                                src="https://www.youtube.com/embed/8-SqMi81Qjo?rel=0"
                                style={{ width: "100%", height: "450px" }}
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                title="Embedded YouTube Video"
                                ></iframe>
                                <div dangerouslySetInnerHTML={{ __html: cmsContent['content'] }}></div>
                                <DonationForm />
                            </div>
                        </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    )
}

export default DonateArea;