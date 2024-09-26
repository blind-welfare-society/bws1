import Wrapper from "@/layout/Wrapper";
import CampaignProjects from "@/components/campaign-projects"

export const metadata = {
   title: "Campaigns | Blind Welfare Society, Expanding possibilities for people with vision loss.",
   description: "Explore our news section to stay updated on our latest events that impact the lives of people with blindness. click hare for more information about our News & Events"
};
const index = () => {
   return (
      <Wrapper>
         <CampaignProjects />
      </Wrapper>
   )
}

export default index