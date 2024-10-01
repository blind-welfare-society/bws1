import Image from "next/image"
import Link from "next/link"
import counter_data from "@/data/counterData"
import Count from "@/components/common/Count"

import aboutImg_1 from "@/assets/img/about/Brail-Dist.jpg"
import aboutImg_2 from "@/assets/img/about/cane.jpg"
import aboutImg_3 from "@/assets/img/about/Laptop-Dis.jpg"

const About = () => {
   return (
      <div className="about-area pb-120 pt-50">
         <div className="container">
            <div className="row align-items-center">
               <div className="col-lg-6">
                  <div className="about-image-part">
                     <div className="row">
                        <div className="col-sm-6">
                           <div className="image">
                              <Image src={aboutImg_1} alt="About" />
                           </div>
                           <div className="project-complete mb-30">
                              <div className="project-complete__icon">
                                 <i className="flaticon-charity"></i>
                              </div>
                              <div className="project-complete__content">
                                 <h5>Educate 40 abandoned <br />blind girls</h5>
                              </div>
                           </div>
                        </div>
                        
                        <div className="col-sm-6">
                           <div className="image mt-65 rmt-15 rel">
                              <Image src={aboutImg_2} alt="About" />
                              <div className="experiences-years">
                                 <span className="experiences-years__number">25</span>
                                 <span className="experiences-years__text">Years Experiences</span>
                              </div>
                           </div>
                           <div className="image">
                              <Image src={aboutImg_3} alt="About" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               
               <div className="col-lg-6">
                  <div className="about-content-part rmt-65">
                     <div className="section-title mb-60">
                        <span className="section-title__subtitle mb-10">About us</span>
                        <h2>Welcome to <span>Blind Welfare Society</span></h2>
                        <p className="pt-10"><strong>Join us to build an equitable, accessible and inclusive world for the people with visual challenges</strong></p>
                     </div>
                     <p>While the exact number of visually impaired persons in India is not clearly available, still, we have a sizeable section of people with vision loss in the Country. And thus, it is our duty to enhance the quality of life of our blind sisters and brothers. Blind Welfare Society has been established for the welfare of the people with visual challenges. It is registered under the Societies Registration Act of 1960.</p>
                     <Link className="cr-btn ml-5 mt-25" href="/about-us">Read More</Link>
                     <Link className="cr-btn ml-5 mt-25" href="#">Donate Now</Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default About;
