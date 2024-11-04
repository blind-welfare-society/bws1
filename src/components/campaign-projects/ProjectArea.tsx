"use client"
import cause_data from "@/data/causeData"
import Image from "next/image"
import Link from "next/link"
import CircleProgress from "@/hooks/Circular"
import { useState, useEffect } from "react";
import { fetchPosts, Post, PaginatedResponse } from '@/utils/apiCampaignProjects';

const ProjectArea = () => {

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
      <div className="our-cause-page pt-20 pb-50 rel z-1">
         <div className="container">
            <div className="row justify-content-center">
               {posts.map((item) => (
                  <div key={item.id} className="col-xl-4 col-md-6">
                     <div className={`cause-two-item cause-blue`}>
                        <div className="image">
                           <Image src={item.image} alt="Cause" width={386} height={184} />
                        </div>
                        <div className="content projectLists">
                           <div className={`circle-progresss two`}>
                              <div className="chart" data-percent="65">
                                 <span><CircleProgress finish={item.percent_count} /></span>
                              </div>
                           </div>
                           <h4><Link href={`/projects/${item.project_slug}`}>{item.project_title}</Link></h4>
                           <p> {item.project_brief}</p>
                           <div className="row mb-8">
                                <div className="col-md-6">
                                    <div className="cause-price cause-price--yellow">
                                        <p className="donateDetails">₹{item.totalAmount}<br /><small>raised of ₹{item.target_amount}</small></p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                 <p><strong>{item.total_donar}</strong> Supporters</p> 
                                </div>
                           </div>
                           <div className="cause-btn">
                              <Link className={`cr-btn btn--yellow`} href={`/projects/${item.project_slug}`}>Donation now</Link>
                           </div>
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

export default ProjectArea