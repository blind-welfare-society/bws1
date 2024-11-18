'use client'
import { usePathname, useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";


const CmsPages = () => {

   const pathName = usePathname();
   const router   = useRouter();

   const [cmsContent, setCmsContent] = useState({} as any);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await axios.get(pathName);
            const data = res.data;
            // If title is blank, redirect to 404
            if (!data?.title) {
               router.push('/');
               return;
            }

            setCmsContent(data);
         } catch (error) {
            router.push('/'); // Redirect to 404 on fetch failure
         } finally {
            setIsLoading(false);
         }
      };

      fetchData();
   }, [pathName, router]);

   if (isLoading) {
      return <div>Loading...</div>; // Optional: Show a loading state while fetching data
   }


   return (
      <div className="about-us-three pt-10 pb-15">
         <div className="container">
            <div className="row gap-80 align-items-center">
               <div className="col-xl-12">
                  <div className="about-us-content-three mb-25">
                     <div className="row">
                        <div className="col-md-12 mb-40">
                           <h1 className="text-center headings-with-border">{cmsContent['title']}</h1>
                        </div>
                     </div>
                     <div dangerouslySetInnerHTML={{ __html: cmsContent['content'] }}></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default CmsPages
