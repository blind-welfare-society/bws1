import Wrapper from "@/layout/Wrapper";
import Gallery from "@/components/Gallery";


export const metadata = {
    title: "Photo Gallery | Blind Welfare Society, Expanding possibilities for people with vision loss.",
    description: "Welcome to our captivating photo gallery, where moments come to life in vivid imagery.",
};


const Page = () => {
  return (
      <Wrapper>
        <Gallery />
      </Wrapper>
   )
}

export default Page