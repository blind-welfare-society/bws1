import HomeOne from "@/components/homes/home-one";
import Wrapper from "@/layout/Wrapper";
import axios from "@/lib/axios";

export const metadata = async () => {
  try {
    const response = await axios.get('/meta-info/welcome-to-blind-welfare-society');
    const data = response.data;
     
    // Ensure data contains title and description
    const title = data.meta_title || 'Welcome to Blind Welfare Society | Expanding possibilities for people with vision loss.';
    const description = data.meta_desc || 'Join us to build an equitable, accessible and inclusive world for the people with visual challenges';

    return {
      title,
      description,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      title: 'Welcome to Blind Welfare Society | Expanding possibilities for people with vision loss.',
      description: 'Join us to build an equitable, accessible and inclusive world for the people with visual challenges',
    };
  }
};
const index = () => {
  return (
    <Wrapper>
      <HomeOne />
    </Wrapper>
  )
}

export default index