"use client"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import SocialIcon from "@/components/common/SocialIcon";
import footer_data from "@/data/footerData";
import Script from "next/script";


import donate from "@/assets/img/footer/donate-by.png";

interface ContentType {
   copyright_text: string;
}

const footer_content: ContentType = {
   copyright_text: `© ${new Date().getFullYear()} Copyright. Blind Welfare Society All Rights Reserved.`,
}

const { copyright_text } = footer_content

import whatAppImage from "@/assets/img/footer/whatsapp-button.png";

const FooterOne = () => {
   return (
      <>
      <footer className="footer-area footer-area--two text-white pt-70">
         <div className="container">
            <div className="row justify-content-between">
               <div className="col-xl-3 col-sm-6">
                  <div className="widget widget_about">
                     <div className="logo_footer mb-25">
                        <h5 className="">Blind Welfare Society</h5>
                        <h3 className="sp-text">Address:</h3>
                        <p><i className="fas fa-map-marker-alt"></i> Plot No. 2/16, Block WXYZ, Near M.N. Convent Public School, Kushak Road No. 2, Swaroop Nagar, New Delhi - 110042</p>
                        <h3 className="sp-text">Email:</h3>
                        <p><i className="fas fa-envelope"></i> <a href="mailto:info@blindwelfaresociety.in">info@blindwelfaresociety.in</a></p>
                        <h3 className="sp-text">Landline:</h3>
                        <p><i className="fas fa-phone-alt"></i> <a href="tel:+91-11-25948803">+91-11-25948803</a></p>
                        <h3 className="sp-text">Mobile:</h3>
                        <p><i className="fas fa-mobile"></i> <a href="tel:+91-9968969932">+91-9968969932</a></p>
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
               <div className="col-md-12 ft-social-links">
                  <h4 className="title">Social Links</h4>
                  <div className="social-style-one">
                     <SocialIcon />
                  </div>
               </div>
            </div>
         </div>
         
         <div className="footer-bottom mt-10">
            <div className="container">
               <div className="footer-bottom__inner">
                  <div className="copyright">
                     <p>{copyright_text}</p>
                  </div>
                  <Script
                     id="interakt-script"
                     strategy="afterInteractive" // loads after page is interactive
                  >
                     {`
                        (function(w,d,s,c,r,a,m){
                        w['KiwiObject']=r;
                        w[r]=w[r] || function () {
                           (w[r].q=w[r].q||[]).push(arguments)};
                        w[r].l=1*new Date();
                        a=d.createElement(s);
                        m=d.getElementsByTagName(s)[0];
                        a.async=1;
                        a.src=c;
                        m.parentNode.insertBefore(a,m)
                        })(window,document,'script',"https://app.interakt.ai/kiwi-sdk/kiwi-sdk-17-prod-min.js?v="+ new Date().getTime(),'kiwi');
                        window.addEventListener("load",function () {
                        kiwi.init('', 'BmOD4kpacgX087rDAYROH28lgQsgiMu5', {});
                        });
                     `}
                  </Script>
               </div>
            </div>
         </div>
      </footer>
      </>
   )
}

export default FooterOne
