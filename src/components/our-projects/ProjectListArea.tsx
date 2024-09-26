'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { fetchPosts,Post } from '@/utils/apiProjectLists';



const ProjectListArea = () => {
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
        <div className="blog-page-area pb-50 pt-0 rel z-1">
            <div className="container"> 
                <div className="row justify-content-center">
                    {posts?.map((item: any) => (
                    <div key={item.id} className="col-xl-4 col-md-6">
                     <div className="blog-item">
                        <div className="blog-item__img">
                           <Link href={`/${item.slug}`}><Image src={item.thumb} width={420} height={280} alt="Blog" /></Link>
                        </div>
                        <div className="blog-item__content news-container">
                           <h4><Link href={`/${item.slug}`}>{item.name}</Link></h4>
                           <p dangerouslySetInnerHTML={{ __html: item.brief}}></p>
                           <Link href={`/${item.slug}`} className="read-more">Read More <i className="fas fa-arrow-right"></i></Link>
                        </div>
                     </div>
                    </div>
                    ))};
                </div>
            </div>
        </div>
    )
}   

export default ProjectListArea;