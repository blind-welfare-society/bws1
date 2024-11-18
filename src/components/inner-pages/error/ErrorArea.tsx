import Image from "next/image"
import Link from "next/link"

const ErrorArea = () => {
   return (
      <div className="error-page-area py-120 text-center">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-8 col-lg-8 col-md-10">
                  <div className="section-title pt-35 mb-50">
                     <h2>Opps! This page not found</h2>
                     <p>Page does not found or some other error occurred. Go to our Home page</p>
                  </div>
                  <Link href="/" className="cr-btn">Go to home page</Link>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ErrorArea
