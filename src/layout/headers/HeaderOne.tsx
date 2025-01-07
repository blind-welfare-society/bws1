"use client"
import NavMenu from "./Menu/NavMenu"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import UseSticky from "@/hooks/UseSticky"
import HeaderTop from "./Menu/HeaderTop"

import HeaderLogo_1 from "@/assets/img/logos/logo.png";
import HeaderLogo_2 from "@/assets/img/logos/logo-white.png";

const HeaderOne = ({ style_1, style_2 }: any) => {
   const { sticky } = UseSticky();
   const [isActive, setIsActive] = useState<boolean>(false);
   const [isSearch, setIsSearch] = useState<boolean>(false);

   const toggleMobileMenu = () => {
      setIsActive(!isActive); // Toggle the isActive state
   };


   return (
      <>
         {style_1 ? <HeaderTop style={true} /> : <HeaderTop style={false} />}
         <nav className={`navbar navbar-area navbar-expand-lg ${style_1 ? "navbar--two" : "py-30 navbar--one"} ${style_2 ? "navbar--three" : ""} ${sticky ? "sticky-active" : ""}`}>
            <div className="container nav-container navbar-bg">
               <div className="logo">
                  <Link href="/"><Image src={style_2 ? HeaderLogo_2 : HeaderLogo_1} alt="BWS Logo" /></Link>
               </div>
               <div className="footerMobileInfo d-lg-none">
                  <ul className="contact-details-top clearfix">
                     <li><a title="Email" aria-label="Email" href="mailto:info@blindwelfaresociety.in"><i className="fas fa-envelope" role="img" aria-hidden="true"></i> <span>info@blindwelfaresociety.in</span></a></li>
                     <li><a href="tel:+91-9968969932" title="Phone" aria-label="Phone"><i className="fas fa-phone-alt" role="img" aria-hidden="true"></i> <span>+91-9968969932</span></a></li>
                  </ul>
               </div>
               <div className="responsive-mobile-menu">
                  <button
                     onClick={toggleMobileMenu}
                     className={`menu toggle-btn d-block d-lg-none ${isActive ? "open" : ""}`}
                     data-target="#Iitechie_main_menu"
                     aria-label={`${isActive ? "Menu Expanded" : "Menu Collapsed"}`}
                  >
                     <span className="icon-left"></span>
                     <span className="icon-right"></span>
                  </button>
               </div>
               <div className={`collapse navbar-collapse ${isActive ? "sopen" : ""}`} id="Iitechie_main_menu">
                  <NavMenu />
               </div>
            </div>
         </nav>
      </>
   )
}

export default HeaderOne
