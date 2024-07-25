import axios from "@/lib/axios";

export interface Post {
  id: number;
  name: string;
  brief: string;
  thumb: string;
  // Add other post properties as needed
}

export interface Post {
  id: number;
  name: string;
  brief: string;
  thumb: string;
  // Add other post properties as needed
}

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await axios.get<{ message: string, data: Post[] }>('/stories-of-change');
    // Access the `data` property
    const posts = response.data.data;
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};