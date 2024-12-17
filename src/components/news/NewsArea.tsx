"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchPosts, Post, PaginatedResponse } from '@/utils/apiNews';

const NewsArea = () => {

   const [posts, setPosts] = useState<Post[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<Error | null>(null);
   const [page, setPage] = useState(1);
   const [total, setTotal] = useState(0);

   const limit = 12;

   useEffect(() => {
   const getPosts = async () => {
      try {
         setLoading(true);
         const { data, total } = await fetchPosts(page, limit);
         setPosts(data);
         setTotal(total);
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
      <div className="blog-page-area pb-100 pt-30 rel z-1">
         <div className="container">
            <div className="row justify-content-center">
               {posts.map((item) => (
                  <div key={item.id} className="col-xl-4 col-md-6">
                     <div className="blog-item ">
                        <div className="blog-item__img">
                           <Link href={`/news/${item.slug}`}><Image src={item.news_image} width={168} height={191} alt={item.title} /></Link>
                        </div>
                        <div className="blog-item__content news-container">
                           <h4><Link href={`/news/${item.slug}`}>{item.title}</Link></h4>
                           <p dangerouslySetInnerHTML={{ __html: item.brief}}></p>
                           <Link href={`/news/${item.slug}`} className="read-more">Read More <i className="fas fa-arrow-right"></i></Link>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            <div className="pagination pt-20">
            <button onClick={() => handlePageClick(1)} disabled={page === 1}>
               First
            </button>
            <button onClick={() => handlePageClick(page - 1)} disabled={page === 1}>
               Previous
            </button>
            {pages.map((pageNumber) => (
               <button
                  key={pageNumber}
                  onClick={() => handlePageClick(pageNumber)}
                  disabled={page === pageNumber}
               >
                  {pageNumber}
               </button>
            ))}
            <button onClick={() => handlePageClick(page + 1)} disabled={page === totalPages}>
               Next
            </button>
            <button onClick={() => handlePageClick(totalPages)} disabled={page === totalPages}>
               Last
            </button>
            </div>
            
         </div>
      </div>
   )
}

export default NewsArea
