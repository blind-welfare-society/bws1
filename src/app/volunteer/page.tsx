import Wrapper from "@/layout/Wrapper";
import axios from "@/lib/axios";
import { Metadata } from "next";
import Volunteers from "@/components/inner-pages/volunteers"

export async function generateMetadata(): Promise<Metadata> {
  
  const response = await axios.get(`/meta-info/volunteer`);
  const meta = response.data;
 
  return {
    title: meta.meta_title || 'Volunteer with Us | Blind Welfare Society, Expanding possibilities for people with vision loss',
    description: meta.meta_desc || 'We are in constant need of your support. You will find ample opportunities with us to make a meaningful contribution to the society.',
  }
}


const Page = () => {
  return (
      <Wrapper>
        <Volunteers />
      </Wrapper>
   )
}

export default Page