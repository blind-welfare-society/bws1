"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import TeamModal from "./TeamModal";
import { fetchPosts, Post, PaginatedResponse } from '@/utils/apiTeams';

const TeamArea = () => {

   const [posts, setPosts] = useState<Post[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<Error | null>(null);
   const [page, setPage] = useState(1);
   const [total, setTotal] = useState(0);
    
   const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

    // Function to open modal
    const openModal = (item:any) => {
        setSelectedPost(item);
        setIsOpen(true);
    };

    // Function to close modal
    const closeModal = () => {
        setIsOpen(false);
        setSelectedPost(null);
    };

   
    

   const limit = 12;

   useEffect(() => {
   const getPosts = async () => {
      try {
         setLoading(true);
         const { data, total } = await fetchPosts(page, limit);
         setPosts(data);
         setTotal(total);
         window.scrollTo(0, 0);
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
      <div className="blog-page-area pb-50 pt-30 rel z-1">
         <div className="container">
            <div className="row justify-content-center">
               {posts.map((item) => (
                  <div key={item.id} className="col-xl-4 col-md-6 mb-2">
                     <div className="team-item d-flex justify-content-center align-items-center text-center flex-column">
                        <div className="team-item__img">
                           <Image src={item.image} width={200} height={200} alt={item.name} className="circle" />
                        </div>
                        <div className="team-item__content">
                           <h4>{item.name}</h4>
                           <h5 className="designation">{item.designation}</h5>
                           <p dangerouslySetInnerHTML={{ __html: item.brief}}></p>
                           <button onClick={() => openModal(item)} className="read-more">Read More</button>
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
            <TeamModal isOpen={isOpen} closeModal={closeModal} post={selectedPost} />
         </div>
      </div>
   )
}

export default TeamArea
