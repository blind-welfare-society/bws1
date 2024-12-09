'use client'
import Banner from "@/components/common/Banner"
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import CategoryBlogArea from "./CategoryBlogArea"
import FeaturedStories from "@/components/common/FeaturedStories"
import axios from "@/lib/axios";
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation";
import OurCause from "@/components/homes/home-one/OurCause"


const CategoryBlog = () => {

    const pathName = usePathname();
    const slug = pathName?.split("/").pop() ?? '';
    const [blogHeading, setBlogHeading] = useState({} as any);

    useEffect(() => {
        axios.get(`/bloginfobycategory/${slug}`).then((res) => {
            setBlogHeading(res.data);
            console.log(res.data);
        });
    }, [slug])
    
    return (
        <>
            <HeaderOne style_1={false} style_2={false} />
            <main>
                <Banner page_title="Blogs" image_url={"../assets/img/blog/blog-banner.jpg"} style={false} />
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="text-center headings-with-border">{blogHeading.data?.cat_name}</h1>
                            <p className="text-center category-description">{blogHeading.data?.cat_desc}</p>
                        </div>
                    </div>
                </div>
                <CategoryBlogArea />
                <OurCause noOfPosts={4} style={true} />
                <FeaturedStories />
            </main>
            <FooterOne />
        </>
    )
}

export default CategoryBlog;
