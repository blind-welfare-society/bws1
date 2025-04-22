import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react";
import { fetchPosts, Post, PaginatedResponse } from '@/utils/apiFeaturedCampaigns';
import SponsorMeal from "@/components/homes/home-one/SponsorMeal";

const FeaturedCampaignsArea = () => { 
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
    return (
        <>
        <div className="blog-page-area pb-50 pt-30 rel z-1">
            <div className="container">
                <div className="row">
                {posts.map((item) => (
                    <div key={item.id} className="col-md-6 featured-campaigns">
                        <h2 className="text-center headings-with-border">
                            <Link href={`/projects/${item.project_slug}`}>{item.project_Name}</Link>
                        </h2>
                        <div className={`cause-two-item cause-blue`}>
                            <div className="image">
                                <Link href={`/projects/${item.project_slug}`}><Image src={item.image} alt="Cause" width={386} height={184} /></Link>
                            </div>
                            <div className="content">
                                <div className="project-box-wrapper pt-4">
                                <h4 className="title"><Link href={`/projects/${item.project_slug}`}>{item.project_title}</Link></h4>
                                {item.project_brief && <p>{item.project_brief}</p>}
                                <div className="row">
                                    <div className="col-md-6">
                                        <p className="donateDetails">₹{item.totalAmount.toLocaleString()}<br /><small>raised of ₹{item.target_amount.toLocaleString()}</small></p>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="counterBox">
                                        <div className="box">
                                            {item.percent_count && <p>{`${item.percent_count}%`}</p>}
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row donarDetails mb-4">
                                    <div className="col-md-6">
                                        <p><strong>{item.left_days}</strong> Days left</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><strong>{item.total_donar}</strong> Supporters</p>
                                    </div>
                                </div>
                                <div className="cause-btn">
                                    <Link className={`cr-btn btn--lightblue`} href={`/projects/${item.project_slug}`}>Donate Now</Link>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
        <SponsorMeal />
        </>
    )
}

export default FeaturedCampaignsArea;