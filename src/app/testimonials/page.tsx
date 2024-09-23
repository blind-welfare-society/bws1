import Wrapper from "@/layout/Wrapper";
import Testimonials from "@/components/Testimonials";

export const metadata = {
    title: "Testimonials | Blind Welfare Society, Expanding possibilities for people with vision loss.",
    description : "Here are few words of appreciation from our donors, supporters and volunteers."
};
const index = () => {
   return (
      <Wrapper>
        <Testimonials />
      </Wrapper>
   )
}

export default index