import axios from "@/lib/axios";

export interface Post {
  id: number;
  name: string;
  description: string;
  location: string;
  image: string;
  date_on: string;
  // Add other post properties as needed
}

export interface PaginatedResponse {
  data: Post[];
  total: number;
  page: number;
  limit: number;
}


export const fetchTestimonialsPosts = async (page: number, limit: number): Promise<PaginatedResponse> => {
  try {
    const response = await axios.get<{ message: string, data: Post[], total: number }>('/testimonials', {
      params: { page, limit },
    });

    const formattedData = response.data.data.map(post => ({
      ...post,
    }));

    return {
      data: formattedData,
      total: response.data.total,
      page,
      limit,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};
