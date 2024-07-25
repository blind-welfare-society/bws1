import StoriesOfChange from "@/components/StoriesOfChange";
import Wrapper from "@/layout/Wrapper";

export const metadata = {
    title: "Stories of Change | Blind Welfare Society, Expanding possibilities for people with vision loss.",
    description : "The following stories highlight the transformative journey of these remarkable individuals within our organization."
};
const index = () => {
   return (
      <Wrapper>
         <StoriesOfChange />
      </Wrapper>
   )
}

export default index