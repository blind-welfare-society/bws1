"use client"
import Image from "next/image"
import { useState } from "react"
import VideoPopup from "@/modals/VideoPopup"

import videoBg from "@/assets/img/video/video-bg.jpg"
import leafShape from "@/assets/img/shapes/three-round-green.png"

const tab_title: string[] = ["Mission", "Vission"]

const tab_content: JSX.Element[] = [
   (<>Our Mission: To enable visually impaired individuals to overcome the barriers that impede their independence and participation in society.</>),
   (<>Our Vision: To empower individuals living with low vision or blindness to discover, develop and achieve their full potential.</>),
]

const ChooseArea = () => {

   const [isVideoOpen, setIsVideoOpen] = useState(false);

   // Define state to keep track of the active tab
   const [activeTab, setActiveTab] = useState(0);

   // Handle tab click event
   const handleTabClick = (index: any) => {
      setActiveTab(index);
   };

   return (
      <>
         <div className="why-choose-area overlay py-120">
            <div className="container">
               <div className="row gap-100 align-items-center">
                  <div className="col-lg-6">
                     <div className="why-choose-content text-white rmb-65">
                        <div className="section-title mb-60">
                           <h2>Join us to build an equitable, accessible and inclusive world for the people with <span>visual challenges</span></h2>
                        </div>

                        <div className="vission-mission-tab">
                           <ul className="nav mb-25" role="tablist">
                              {tab_title.map((tab, index) => (
                                 <li key={index} className="nav-item">
                                    <button onClick={() => handleTabClick(index)} className={activeTab === index ? 'nav-link active' : 'nav-link'}>
                                       {tab}
                                    </button>
                                 </li>
                              ))}
                           </ul>

                           <div className="tab-content">
                              {tab_content.map((content, index) => (
                                 <div key={index} className={`tab-pane fade ${activeTab === index ? 'show active' : ''}`}  >
                                    {content}
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="col-lg-6">
                     <div className="why-choose-video">
                        <iframe
                           src="https://www.youtube.com/embed/g3c2j5xoCvY?rel=0"
                           style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                           frameBorder="0"
                           allow="autoplay; encrypted-media"
                           allowFullScreen
                           title="Embedded YouTube Video"
                        ></iframe>
                        <Image className="leaf-shape top_image_bounce" src={leafShape} alt="Shape" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* video modal start */}
         <VideoPopup
            isVideoOpen={isVideoOpen}
            setIsVideoOpen={setIsVideoOpen}
            videoId={"g3c2j5xoCvY"}
         />
         {/* video modal end */}
      </>
   )
}

export default ChooseArea
