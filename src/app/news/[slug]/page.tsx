import NewsDetails from "@/components/news/news-details";
import Wrapper from "@/layout/Wrapper";
import axios from "@/lib/axios";
import { Metadata } from "next";

type Props = {
  params: {
    slug :string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  try {
    const response = await axios.get(`/news-detail/${slug}`);
    const meta = response.data.data;

    if (!meta) {
      throw new Error('Metadata is empty or undefined.');
    }

    //console.log(meta);

    return {
       title: meta.meta_title || "News & Events | Blind Welfare Society, Expanding possibilities for people with vision loss.",
   description: meta.meta_description || "Explore our news section to stay updated on our latest events that impact the lives of people with blindness. click hare for more information about our News & Events"
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return {
       title: "News & Events | Blind Welfare Society, Expanding possibilities for people with vision loss.",
   description: "Explore our news section to stay updated on our latest events that impact the lives of people with blindness. click hare for more information about our News & Events"
    };
  }
}
const index = ({ params }: Props) => {
   const slug = params.slug;
   return (
      <Wrapper>
         <NewsDetails slug={slug}  />
      </Wrapper>
   )
}

export default index