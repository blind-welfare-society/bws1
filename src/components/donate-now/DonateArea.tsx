import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import DonationForm from "./DonationForm";
import PaymentMods from "@/components/common/PaymentMods";
import ProjectFaqs from "@/components/common/ProjectFaqs";
import ShareButtons from "@/components/common/ShareButtons";

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
                                <h4 style={{ textAlign: "center", fontSize: "20px",paddingTop: "20px"}}>Beneficiaries Testimonials</h4>
                                <div className="row">
                                    <div className="col-md-4">
                                        <iframe
                                        src="https://www.youtube.com/embed/4eFQckwDUyY?rel=0"
                                        style={{ width: "100%", height: "350px" }}
                                        frameBorder="0"
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                        title="Embedded YouTube Video"
                                        ></iframe>
                                    </div>
                                    <div className="col-md-4">
                                        <iframe
                                        src="https://www.youtube.com/embed/U6tzzUKbLgo?rel=0"
                                        style={{ width: "100%", height: "350px" }}
                                        frameBorder="0"
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                        title="Embedded YouTube Video"
                                        ></iframe>
                                    </div>
                                    <div className="col-md-4">
                                        <iframe
                                        src="https://www.youtube.com/embed/yPFNGTDio-U?rel=0"
                                        style={{ width: "100%", height: "350px" }}
                                        frameBorder="0"
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                        title="Embedded YouTube Video"
                                        ></iframe>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 mt-3">
                                        <ShareButtons />
                                    </div>
                                    <div className="col-md-12 donatePage">
                                        <PaymentMods />
                                        <ProjectFaqs />
                                    </div>
                                </div>
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