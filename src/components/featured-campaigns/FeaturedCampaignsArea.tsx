import Image from "next/image"
import Link from "next/link"
import CircleProgress from "@/hooks/Circular"
import { useState, useEffect } from "react";
import { fetchPosts, Post, PaginatedResponse } from '@/utils/apiFeaturedCampaigns';
import DonateCane from "@/components/homes/home-one/DonateCane";
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
        <div className="blog-page-area pb-50 pt-30 rel z-1">
            <div className="container">
                <div className="row">
                {posts.map((item) => (
                    <div key={item.id} className="col-md-6 featured-campaigns">
                        <h2 className="text-center headings-with-border">{item.project_Name}</h2>
                        <div className={`cause-two-item cause-blue`}>
                            <div className="image">
                            <Image src={item.image} alt="Cause" width={386} height={184} />
                            </div>
                            <div className="content">
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
                                <Link className={`cr-btn btn--yellow`} href="{`/projects/${item.project_slug}`}">Donation now</Link>
                            </div>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
                <div className="row">
                    <DonateCane />
                    <SponsorMeal />
                </div>
            </div>
        </div>
    )
}

export default FeaturedCampaignsArea;