import axios from "@/lib/axios";

export interface Post {
  id: number;
  name: string;
  brief: string;
  thumb: string;
  // Add other post properties as needed
}

export interface PaginatedResponse {
  data: Post[];
  total: number;
  page: number;
  limit: number;
}


export const fetchPosts = async (page: number, limit: number): Promise<PaginatedResponse> => {
  try {
    const response = await axios.get<{ message: string, data: Post[], total: number }>('/stories-of-change', {
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