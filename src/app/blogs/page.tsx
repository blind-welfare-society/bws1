import Blog from "@/components/blogs/blog";
import Wrapper from "@/layout/Wrapper";

export const metadata = {
   title: "Blogs | Blind Welfare Society, Expanding possibilities for people with vision loss",
   description: "Read our blogs to understand the major challenges face by people with blindness."
};
const index = () => {
   return (
      <Wrapper>
         <Blog />
      </Wrapper>
   )
}

export default index