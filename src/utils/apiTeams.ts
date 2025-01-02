import axios from "@/lib/axios";

export interface Post {
  id: number;
  name: string;
  slug: string;
  brief: string;
  designation: string;
  image: string;
  description: string;
}

export interface PaginatedResponse {
  data: Post[];
  total: number;
  page: number;
  limit: number;
}

/*const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
};*/


export const fetchPosts = async (page: number, limit: number): Promise<PaginatedResponse> => {
  try {
    const response = await axios.get<{ message: string, data: Post[], total: number }>('/our-team-mate', {
      params: { page, limit },
    });

    const formattedData = response.data.data.map(post => ({
      ...post
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
