
import Wrapper from "@/layout/Wrapper";
import SponsorAMeal from "@/components/inner-pages/sponsor-a-meal";
import axios from "@/lib/axios";
import { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  // read route params
  const slug = "donate-a-walking-cane-lighten-the-life-of-the-blind"
 
  const response = await axios.get(`/meta-info/${slug}`);
  const meta = response.data;
 
  return {
    title: meta.meta_title || 'Blind Welfare Society | Expanding possibilities for people with vision loss.',
    description: meta.meta_desc || 'Join us to build an equitable, accessible and inclusive world for the people with visual challenges',
  }
}


const Page = () => {
  return (
      <Wrapper>
        <SponsorAMeal />
      </Wrapper>
   )
}

export default Page