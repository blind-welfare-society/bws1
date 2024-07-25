'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { fetchPosts,Post } from '@/utils/apiStoriesOfChange';



const StoryOfChangeArea = () => {
    const [posts, setPosts] = useState<Post[]>([]);    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
    }, []);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="blog-page-area py-50 rel z-1">
            <div className="container"> 
                <div className="row justify-content-center">
                    {posts?.map((item: any) => (
                    <div key={item.id} className="col-xl-4 col-md-6">
                        <div className="storyBox">
                            <div className="storyBox__img">
                                <Image src={item.thumb} alt={item.name} width={100} height={100}  /> 
                            </div>
                            <div className="storyBox__content">
                            <h6><Link href={`/${item.slug}`}>{item.name}</Link></h6>
                            <p>{item.brief}</p>
                            <Link href={`/${item.name}`} className="read-more">Read More</Link>
                            </div>
                        </div>
                     </div>
                    ))};
                </div>
            </div>
        </div>
    )
}   

export default StoryOfChangeArea;

        
