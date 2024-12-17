import BlogDetails from "@/components/blogs/blog-details";
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
    const response = await axios.get(`/blog-detail/${slug}`);
    const meta = response.data.data;

    if (!meta) {
      throw new Error('Metadata is empty or undefined.');
    }

    return {
      title: meta.meta_title || 'Blind Welfare Society | Expanding possibilities for people with vision loss.',
      description: meta.meta_description || 'Join us to build an equitable, accessible and inclusive world for the people with visual challenges',
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return {
      title: 'Blind Welfare Society | Expanding possibilities for people with vision loss.',
      description: 'Join us to build an equitable, accessible and inclusive world for the people with visual challenges',
    };
  }
}
const index = ({ params }: Props) => {
   const slug = params.slug;
   return (
      <Wrapper>
         <BlogDetails slug={slug}  />
      </Wrapper>
   )
}

export default index