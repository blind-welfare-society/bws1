import InnerAbout from "@/components/inner-pages/about";
import Wrapper from "@/layout/Wrapper";
import axios from "@/lib/axios";

export const metadata = async () => {
  try {
    const response = await axios.get('/meta-info/about-us');
    const data = response.data;
    
    // Ensure data contains title and description
    const title = data.meta_title || 'About Us';
    const description = data.meta_desc || 'Lorem Ipsum';

    return {
      title,
      description,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      title: 'About Us | Blind Welfare Society, Expanding possibilities for people with vision loss',
      description: 'Lorem Ipsum',
    };
  }
};

const index = () => {
   return (
      <Wrapper>
         <InnerAbout />
      </Wrapper>
   )
}

export default index