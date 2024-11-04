
import Wrapper from "@/layout/Wrapper";
import axios from "@/lib/axios";
import { Metadata } from "next";
import ProjectDetails from "@/components/campaign-projects/project-details";

type Props = {
  params: {
    slug :string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  try {
    const response = await axios.get(`/project-detail/${slug}`);
    const meta = response.data.data.project;

    if (!meta) {
      throw new Error('Metadata is empty or undefined.');
    }

    //console.log(meta);

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
           <ProjectDetails slug={slug} />
      </Wrapper>
   )
}

export default index