import axios from "@/lib/axios";

export interface Post {
  id: number;
  project_Name: string;
  project_title: string;
  project_brief: string;
  project_slug: string;
  target_amount: string;
  image: string;
  totalAmount: string
  percent_count: number
  left_days:string
  total_donar: string
  last_date:string
  // Add other post properties as needed
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
    const response = await axios.get<{ message: string, data: Post[], total: number }>('/projects', {
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
