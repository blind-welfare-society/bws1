import FeaturedCampaigns from "@/components/featured-campaigns";
import Wrapper from "@/layout/Wrapper";

export const metadata = {
    title: "Featured Campaigns | Blind Welfare Society, Expanding possibilities for people with vision loss.",
    description: "You are not just supporting us, you are fostering independence, education and accessibility for the blind."
};
const index = () => {
   return (
      <Wrapper>
         <FeaturedCampaigns />
      </Wrapper>
   )
}

export default index