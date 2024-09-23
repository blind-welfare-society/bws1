import Banner from "@/components/common/Banner"
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import BlogArea from "./BlogArea"
import Image from "next/image"

const News = () => {
   return (
      <>
         <HeaderOne style_1={false} style_2={false} />
         <main>
            <Banner image_url="assets/img/blog/blog-banner.jpg" />
            <div className="container">
               <div className="row">
                  <div className="col-12">
                        <h1 className="text-center headings-with-border">Blogs</h1>
                  </div>
               </div>
            </div>
            <BlogArea/>
         </main>
         <FooterOne />
      </>
   )
}

export default News;
