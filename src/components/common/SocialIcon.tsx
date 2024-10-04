import Link from "next/link"

const CommonSocialIcon = () => {
   return (
      <>
         <Link href="https://www.facebook.com/blindwelfaresociety" target="_blank" title="Facebook"><i className="fab fa-facebook-f"></i></Link>
         <Link href="https://twitter.com/bwelfaresociety?t=rBF0LR2jopVuUbgMm1ib2g&s=09" target="_blank" title="Twitter"><i className="fab fa-twitter"></i></Link>
         <Link href="https://www.linkedin.com/company/blind-welfare-society-in-india/" target="_blank" title="Linkedin"><i className="flaticon-linkedin"></i></Link>
         <Link href="https://www.instagram.com/blindwelfaresocietyindia/?hl=en" target="_blank" title="Instagram"><i className="fab fa-instagram"></i></Link>
         <Link href="https://www.youtube.com/channel/UCfHNcdJW41aPNrF9UyHUlCg" target="_blank" title="Youtube"><i className="fab fa-youtube"></i></Link>
      </>
   )
}

export default CommonSocialIcon
