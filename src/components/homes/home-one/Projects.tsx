'use client'
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from 'react';
import { fetchPosts,Post } from '@/utils/apiProjectLists';

import ourCauseShapes from "@/assets/img/shapes/three-round-green.png"



const Projects = () => {
   
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const limit = 6;

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
   
    
    
   return (
      <div className="our-cause-area rpt-50 pt-120 pb-0 rel z-1">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6 col-lg-8 col-md-10">
                  <div className="section-title text-center mb-50">
                     <h3>Our <span>Projects</span></h3>
                     <p>This section tells about the various initiatives of our organization which are impacting lives of thousands of people with vision loss.</p>
                  </div>
               </div>
            </div>
            
            <div className="row">
                {posts?.map((item: any) => (
                <div key={item.id} className="col-xl-4 col-md-6">
                    <div className="blog-item">
                    <div className="blog-item__img">
                        <Link href={`/${item.slug}`}><Image src={item.thumb} width={416} height={292} alt="Blog" /></Link>
                    </div>
                    <div className="blog-item__content news-container">
                        <h4><Link href={`/${item.slug}`}>{item.name}</Link></h4>
                        <p dangerouslySetInnerHTML={{ __html: item.brief}}></p>
                        <Link href={`/${item.slug}`} className="read-more">Read More</Link>
                    </div>
                    </div>
                </div>
                ))};
            </div>
         </div>
      </div>
   )
}

export default Projects