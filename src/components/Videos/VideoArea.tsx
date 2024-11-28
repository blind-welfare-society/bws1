
'use client'
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { fetchPosts, Post, PaginatedResponse } from '@/utils/apiVideos';

const VideoArea = () => {
   
   const [posts, setPosts] = useState<Post[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<Error | null>(null);
   const [page, setPage] = useState(1);
   const [total, setTotal] = useState(0);

   const limit = 20;

   useEffect(() => {
   const getPosts = async () => {
      try {
         setLoading(true);
         const { data, total } = await fetchPosts(page, limit);
         setPosts(data);
         setTotal(total);
         console.log(data);
      } catch (error) {
         setError(error as Error);
      } finally {
       setLoading(false);
      }
   };

   getPosts();
   }, [page]);
    
    const totalPages = Math.ceil(total / limit);
    const maxPagesToShow = 5;
    const startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

    const handlePageClick = (pageNumber: number) => {
        setPage(pageNumber);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <div className="row justify-content-center">
            <div className="col-md-10 my-100">
                <div className="col-md-12 mb-40">
                    <h1 className="text-center headings-with-border">Video Gallery</h1>
                    <p className="text-center punch-line mt-4"><strong>Welcome to our video gallery, where we share inspiring stories, impactful projects, and community initiatives that are transforming lives. Our videos showcase the resilience, talent, and potential of visually impaired individuals, as well as the support they receive from the Blind Welfare Society.</strong></p>
                </div>
                <div className="row">
                    {posts.map((item) => (
                    <div className="col-md-4" key={item.id}>
                         <div dangerouslySetInnerHTML={{ __html: item.link}}></div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default VideoArea;