import axios from "@/lib/axios";

export interface Post {
  id: number;
  title: string;
  // Add other post properties as needed
}

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await axios.get<Post[]>('/stories-of-change');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};