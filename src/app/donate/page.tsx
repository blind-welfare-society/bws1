import DonateNow from "@/components/donate-now";
import Wrapper from "@/layout/Wrapper";
import axios from "@/lib/axios";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // read route params
  
  const response = await axios.get(`/meta-info/donate`);
  const meta = response.data;
 
  return {
    title: meta.meta_title || 'Blind Welfare Society | Expanding possibilities for people with vision loss.',
    description: meta.meta_desc || 'Join us to build an equitable, accessible and inclusive world for the people with visual challenges',
  }
}
const index = () => {
   return (
      <Wrapper>
         <DonateNow />
      </Wrapper>
   )
}

export default index