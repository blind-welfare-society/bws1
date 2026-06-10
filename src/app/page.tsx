import HomeOne from "@/components/homes/home-one";
import Wrapper from "@/layout/Wrapper";
import axios from "@/lib/axios";
import type { HomeBanner } from "@/components/homes/home-one/HeroArea";

export const dynamic = 'force-dynamic';

const getHomeBanners = async (): Promise<HomeBanner[]> => {
  try {
    const response = await axios.get<{ message: string; data: HomeBanner[] }>('/home-banners');
    return Array.isArray(response.data?.data) ? response.data.data : [];
  } catch (error) {
    console.error('Error fetching home banners:', error);
    return [];
  }
};

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
const index = async () => {
  const banners = await getHomeBanners();

  return (
    <Wrapper>
      <HomeOne banners={banners} />
    </Wrapper>
  )
}

export default index
