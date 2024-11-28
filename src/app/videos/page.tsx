import Wrapper from "@/layout/Wrapper";
import Videos from "@/components/Videos";


export const metadata = {
    title: "Video Gallery | Blind Welfare Society, Expanding possibilities for people with vision loss.",
    description: "Step into a world of empowerment and inspiration with our video gallery dedicated to the visually impaired community.",
};


const Page = () => {
  return (
      <Wrapper>
        <Videos />
      </Wrapper>
   )
}

export default Page