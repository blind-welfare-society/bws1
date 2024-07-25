'use client'
import Breadcrumb from "@/components/common/Breadcrumb"
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import StoryOfChangeArea from "./StoryOfChangeArea"


const StoriesOfChange = () => {
   return (
      <>
         <HeaderOne style_1={false} style_2={false} />
         <main>
               <Breadcrumb page_title="Stories of Change" page_list="Stories of Change" style={false} />
               <StoryOfChangeArea />   
         </main>
         <FooterOne />
      </>
   )
}

export default StoriesOfChange;
