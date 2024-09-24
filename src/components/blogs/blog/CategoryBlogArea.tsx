"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchPostsByCategory, Post, PaginatedResponse } from '@/utils/apiCategoryBlog';
import { usePathname } from "next/navigation";



const CategoryBlogArea = () => {

   const [posts, setPosts] = useState<Post[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<Error | null>(null);
   const [page, setPage] = useState(1);
   const [total, setTotal] = useState(0);

   const limit = 12;
   const pathName = usePathname();
   const slug = pathName?.split("/").pop() ?? '';

   useEffect(() => {
   const getPosts = async () => {
      try {
         setLoading(true);
         const { data, total } = await fetchPostsByCategory(page, limit, slug);
         setPosts(data);
         setTotal(total);
      } catch (error) {
         setError(error as Error);
      } finally {
       setLoading(false);
      }
   };

   getPosts();
   }, [page, slug]);

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
            <div className="row">
               {posts.map((item) => (
                  <div key={item.id} className="col-xl-4 col-md-6">
                     <div className="blog-item">
                        <div className="blog-item__img">
                           <Link href={`/blogs/${item.slug}`}><Image src={item.blog_images} width={420} height={280} alt="Blog" /></Link>
                        </div>
                        <div className="blog-item__content blog-container">
                           <h4><Link href={`/blogs/${item.slug}`}>{item.title}</Link></h4>
                           <p className="post-date"><i className="flaticon-calendar"></i> {item.blog_date}</p>
                           <div className="blog-categories">
                              {Array.isArray(item.cat_name) && item.cat_name.length > 0 ? (
                                 item.cat_name.map((category, index) => (
                                 <span key={`${category.slug}-${index}`}>
                                    <Link href={`/blog/${category.slug}`}>{category.name}</Link>
                                    {index < item.cat_name.length - 1 ? ', ' : ''}
                                 </span>
                                 ))
                              ) : "" }
                           </div>
                           <p dangerouslySetInnerHTML={{ __html: item.brief}}></p>
                           <Link href={`/blogs/${item.slug}`} className="read-more">Read More <i className="fas fa-arrow-right"></i></Link>
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

export default CategoryBlogArea
