const NewsDetailsArea = (props: any) => {
   const single_blog = props.cmsContent;
   return (
      <div className="blog-details-area pb-20 pt-50">
         <div className="container">
            <div className="row gap-60">
               <div className="col-lg-12">
                  <div className="blog-details-content mb-55">
                     <h1 className="text-center pb-10">{single_blog.title}</h1>
                      <div dangerouslySetInnerHTML={{ __html: single_blog.content }}></div>
                     <hr />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default NewsDetailsArea
