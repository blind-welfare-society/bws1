import NewsEvents from "@/components/news";
import Wrapper from "@/layout/Wrapper";

export const metadata = {
   title: "News & Events | Blind Welfare Society, Expanding possibilities for people with vision loss.",
   description: "Explore our news section to stay updated on our latest events that impact the lives of people with blindness. click hare for more information about our News & Events"
};
const index = () => {
   return (
      <Wrapper>
         <NewsEvents />
      </Wrapper>
   )
}

export default index