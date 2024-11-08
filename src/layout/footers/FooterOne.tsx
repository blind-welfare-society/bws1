"use client"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import SocialIcon from "@/components/common/SocialIcon";
import footer_data from "@/data/footerData";

import donate from "@/assets/img/footer/donate-by.png";

import footerGallery_1 from "@/assets/img/footer/gallery-two1.jpg";
import footerGallery_2 from "@/assets/img/footer/gallery-two2.jpg";
import footerGallery_3 from "@/assets/img/footer/gallery-two3.jpg";
import footerGallery_4 from "@/assets/img/footer/gallery-two4.jpg";
import footerGallery_5 from "@/assets/img/footer/gallery-two5.jpg";
import footerGallery_6 from "@/assets/img/footer/gallery-two6.jpg";

interface ContentType {
   copyright_text: string;
}

const footer_content: ContentType = {
   copyright_text: "©2024 Copyright. Blind Welfare Society All Rights Reserved.",
}

const {copyright_text } = footer_content

const FooterTwo = () => {
   return (
      <footer className="footer-area footer-area--two text-white pt-70">
         <div className="container">
            <div className="row justify-content-between">
               <div className="col-xl-3 col-sm-6">
                  <div className="widget widget_about">
                     <div className="logo_footer mb-25">
                        <h5 className="">Blind Welfare Society</h5>
                        <p><i className="fas fa-map-marker-alt"></i> Plot No. 2/16, Block WXYZ, Near M.N. Convent Public School, Kushak Road No. 2, Swaroop Nagar, New Delhi - 110042</p>
                        <p><i className="fas fa-envelope"></i> <a href="mailto:info@blindwelfaresociety.in">info@blindwelfaresociety.in</a></p>
                        <p><i className="fas fa-phone-alt"></i> <a href="tel:+91-11-25948803">+91-11-25948803</a></p>
                        <p><i className="fas fa-mobile"></i> <a href="tel:+91-9968969932">+91-9968969932</a></p>
                     </div>
                     <div className="social-style-one pt-20">
                        <SocialIcon />
                     </div>
                  </div>
               </div>

               {footer_data.filter((item) => item.page === "home_2").map((item) => (
                  <div key={item.id} className="col-xl-2 col-sm-3 col-6">
                     <div className="widget widget_nav_menu">
                        <h5 className="widget-title">{item.widget_title}</h5>
                        <ul>{item.footer_link.map((li, i) => (<li key={i}><Link href={li.link}>{li.link_title}</Link></li>))}</ul>
                     </div>
                  </div>
               ))}

              
            </div>
         </div>
         
         <div className="footer-bottom mt-10">
            <div className="container">
               <div className="footer-bottom__inner">
                 
                  <div className="copyright">
                     <p>{copyright_text}</p>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   )
}

export default FooterTwo
