"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchTestimonialsPosts, Post, PaginatedResponse } from '@/utils/apiTestimonials';


const TestimonialsArea = () => { 

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
            const { data, total } = await fetchTestimonialsPosts(page, limit);
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
        <div className="blog-page-area pb-50 pt-0 rel z-1">
            <div className="container"> 
                <div className="row justify-content-center">
                    {posts?.map((item: any) => (
                    <div key={item.id} className="col-md-6">
                        <div className="storyBox1">
                            <div className="storyBox__img">
                                <Image src={item.image} alt={item.name} width={100} height={100}  /> 
                            </div>
                            <div className="storyBox__content">
                            <p>{item.description}</p>
                            <h5>{item.name}</h5>
                            <h6>{item.location}</h6>        
                            </div>
                        </div>
                     </div>
                    ))};
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

export default TestimonialsArea;