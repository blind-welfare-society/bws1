import InnerCmsPage from "@/components/inner-pages/allpages";
import Wrapper from "@/layout/Wrapper";
import axios from "@/lib/axios";
import { Metadata } from "next";

type Props = {
  params: {
    slug :string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = params.slug
 
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
         <InnerCmsPage />
      </Wrapper>
   )
}

export default Page