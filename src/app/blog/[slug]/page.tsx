import CategoryBlog from "@/components/blogs/blog/CategoryBlog";
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

    const response = await axios.get(`/bloginfobycategory/${slug}`);
    const meta = response.data;
    console.log(meta);

    return {
        title: meta.data.meta_title || "Blogs | Blind Welfare Society, Expanding possibilities for people with vision loss",
        description: meta.data.meta_desc || "Read our blogs to understand the major challenges face by people with blindness."
    }
}

const index = () => {
   return (
      <Wrapper>
         <CategoryBlog />
      </Wrapper>
   )
}

export default index