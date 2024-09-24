import Wrapper from "@/layout/Wrapper";
import ProjectsList from "@/components/our-projects";

export const metadata = {
   title: "Our Projects | Blind Welfare Society, Expanding possibilities for people with vision loss",
   description: "There are thousands of people with blindness who are impacting through our various projects and initiatives. BWS has a crucial role to play in creating a world where there are no barriers to people with sight loss."
};
const index = () => {
   return (
      <Wrapper>
         <ProjectsList />   
      </Wrapper>
   )
}

export default index