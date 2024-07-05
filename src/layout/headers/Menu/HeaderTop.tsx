import Link from 'next/link'

const HeaderTop = ({ style }: any) => {
   return (
      <div className={`navbar-top ${style ? "pt-30 rpt-10 navtop--two" : "pt-15 pb-10 bgc-black navtop--one"}`}>
         <div className="container">
            <div className={`navtop-inner ${style ? "bgc-gray" : ""}`}>
               <ul className="topbar-left">
                  {style ?
                     <>
                        <li><b>Call now - <Link href="callto:333-444555">333 - 444 555</Link></b></li>
                        <li>Shiloh, Hawaii 81063</li>
                     </> :
                     <>
                        <li><i className="fas fa-envelope"></i> <Link href="mailto:info@blindwelfaresociety.in" title='Email'>info@blindwelfaresociety.in</Link></li>
                        <li><i className="fas fa-phone-alt"></i> <Link href="tel:+91-9968969932" title='Phone'>+91-9968969932</Link></li>
                     </>
                  }
               </ul>
               <ul className="topbar-right">
                  <li className="social-area">
                     <span>Follow Us - </span>
                     <Link href="https://www.facebook.com/blindwelfaresociety" title="Facebook"><i className="fab fa-facebook-f"></i></Link>
                     <Link href="https://twitter.com/bwelfaresociety?t=rBF0LR2jopVuUbgMm1ib2g&s=09" title="Twitter"><i className="fab fa-twitter"></i></Link>
                     <Link href="https://www.instagram.com/blindwelfaresocietyindia/?hl=en" title='Instagram'><i className="fab fa-instagram"></i></Link>
                     <Link href="https://www.linkedin.com/company/blind-welfare-society-in-india/" title='Linkedin'><i className="fab fa-linkedin-in"></i></Link>
                     <Link href="https://www.youtube.com/channel/UCfHNcdJW41aPNrF9UyHUlCg/" title='Youtube'><i className="fab fa-youtube"></i></Link>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default HeaderTop
