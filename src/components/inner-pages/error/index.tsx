import Banner from "@/components/common/Banner"
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import ErrorArea from "./ErrorArea"

const NotFound = () => {
   return (
      <>
         <HeaderOne style_1={false} style_2={false} />
         <main>
            <Banner image_url="assets/img/blog/blog-banner.jpg" />
            <ErrorArea />
         </main>
         <FooterOne />
      </>
   )
}

export default NotFound;
