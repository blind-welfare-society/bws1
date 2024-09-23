'use client'
import Banner from "@/components/common/Banner"
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import StoryOfChangeArea from "./StoryOfChangeArea"


const StoriesOfChange = () => {
   return (
      <>
         <HeaderOne style_1={false} style_2={false} />
         <main>
            <Banner image_url="assets/img/background/background.jpg" />
               <div className="container">
                  <div className="row">
                     <div className="col-12 mb-40 pt-20">
                           <h1 className="text-center headings-with-border">Stories of Change</h1>
                     </div>
                  </div>
               </div> 
            <StoryOfChangeArea />   
            
         </main>
         <FooterOne />
      </>
   )
}

export default StoriesOfChange;
