import axios from "@/lib/axios";

export interface Post {
  id: number;
  title: string;
  blog_date: string;
  slug: string;
  brief: string;
  blog_images: string;
  cat_name: string;
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


export const fetchPostsByCategory = async (page: number, limit: number, slug: string): Promise<PaginatedResponse> => {
  try {
    const response = await axios.get<{ message: string, data: Post[], total: number }>(`/blogbycategory/${slug}`, {
      params: { page, limit, slug },
    });

    const formattedData = response.data.data.map(post => ({
      ...post,
      //blog_date: formatDate(post.blog_date),
      cat_name: post.cat_name ? JSON.parse(post.cat_name) : [], 
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
