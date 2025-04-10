import Link from "next/link"
import Image from "next/image"

import youtube from '@/assets/img/social/youtube-black.png';
import facebook from '@/assets/img/social/fb-black.png';
import instagram from '@/assets/img/social/insta-black.png';
import linkedin from '@/assets/img/social/linkedin-black.png';
import twitter from '@/assets/img/social/twitter-black.png';

const CommonSocialIcon = () => {
   return (
      <>
         <Link href="https://www.facebook.com/blindwelfaresociety" target="_blank" title="Facebook">
            <Image src={facebook} alt="Facebook" width={20} height={20} />
         </Link>
         <Link href="https://twitter.com/bwelfaresociety?t=rBF0LR2jopVuUbgMm1ib2g&s=09" target="_blank" title="Twitter">
            <Image src={twitter} alt="Twitter" width={20} height={20} />
         </Link>
         <Link href="https://www.linkedin.com/company/blind-welfare-society-in-india/" target="_blank" title="Linkedin">
            <Image src={linkedin} alt="Linkedin" width={20} height={20} />
         </Link>
         <Link href="https://www.instagram.com/blindwelfaresocietyindia/?hl=en" target="_blank" title="Instagram">
            <Image src={instagram} alt="Instagram" width={20} height={20} />
         </Link>
         <Link href="https://www.youtube.com/channel/UCfHNcdJW41aPNrF9UyHUlCg" target="_blank" title="Youtube">
            <Image src={youtube} alt="Youtube" width={20} height={20} />
         </Link>
      </>
   )
}

export default CommonSocialIcon
