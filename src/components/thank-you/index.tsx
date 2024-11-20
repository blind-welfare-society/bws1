'use client'
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { usePathname } from 'next/navigation'


const ThankYou = ({ pageID }: any) => {
   const [donationData, setDonationData] = useState({} as any);

   const fullPathName = `get-donation-status/${pageID}`;
   const currentPath = usePathname();
    
   useEffect(() => {
      axios.get(fullPathName).then((res) => {
         //console.log(res.data); // Check the response structure
          setDonationData(res.data.data);
      });
   }, [fullPathName]);

   const formatDate = (dateString:any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB').replace(/\//g, '-');
   };
   const formattedDate = formatDate(donationData.created_at);
   return (
      <>
         <HeaderOne style_1={false} style_2={false} />
         <main>
           <div className="container">
                <div className="row">
                    <div className="col-12 mb-40">
                           <h1 className="text-center headings-with-border" {...currentPath.includes('bws') && {style: {fontSize: '36px',marginTop:'100px'}}}>
                               Thank you for your Support
                               {currentPath.includes('bws') && (
                                   <span>, You have just made someone Smile!</span>                                    
                                )}
                           </h1>
                    </div>
                </div>
                <div className="row">
                   {currentPath.includes('bws') ? (
                       <div className="col-md-12">
                        <div className="cms_content text-center mb-150">
                            <p style={{fontSize:'26px'}}>Please click below to download your contribution receipt.</p>
                            <a href={`https://admin.kitchenkirana.com/exportCampaignPDF/${donationData.id}`} className="donation_button" download="">Download Receipt </a>
                        </div>
                       </div>
                    ): (
                       <div className="col-12">
                        <div className="donation-sec">
                            <p><strong>Your donations details are as under:</strong></p>
                            <p><strong>Your Name:</strong> {donationData.name}</p>
                            {currentPath.includes('sponsormeal') ? (
                                <p><strong>Your Donation Description:</strong> {donationData.type_of_meal}</p>
                            ) : (
                                <p><strong>Your Donation Description:</strong> {donationData.payment_desc}</p>
                            )}
                            <p><strong>Your Donation Amount:</strong> {`₹${donationData.amount}`}</p>
                               { currentPath.includes('sponsormeal') && (
                                <>
                                    <p><strong>Your Date of Booking:</strong> {`${donationData.date_of_booking}`}</p>
                                    <p><strong>Your Occasion:</strong> {`${donationData.occasion}`}</p>
                                    <p><strong>I would Like to Book for:</strong> {`${donationData.book_for}`}</p>
                                </>   
                                )}
                            <p><strong>Your E-mail Address:</strong> {donationData.email}</p>
                            <p><strong>Your Phone:</strong> {donationData.phone}</p>
                            <p><strong>Your PAN:</strong>{donationData?.pan}</p>
                            <p><strong>Your Address:</strong> {donationData?.address}</p>
                            <p><strong>Your City:</strong> {donationData?.city}</p>
                            <p><strong>Your State:</strong> {donationData?.state}</p>
                            <p><strong>Your Zip Code:</strong> {donationData?.pincode}</p>
                            <p><strong>Your Country:</strong> {donationData?.country}</p>
                            <p><strong>Transaction ID:</strong> {donationData?.transaction_id}</p>
                            <p><strong>Payment Method:</strong> {donationData?.payment_option}</p>
                            <p><strong>Date of Donation:</strong> {formattedDate}</p>
                               
                               {currentPath.includes('sponsormeal') ? (
                                    <a href={`https://admin.kitchenkirana.com/exportDonationPDF/${donationData.id}`} className="donation_button" download="">Download your Receipt</a>
                                ) : (
                                  <a href={`https://admin.kitchenkirana.com/exportDonationPDF/${donationData.id}`} className="donation_button" download="">Download your Receipt</a>
                                )}
                        </div>
                       </div>      
                   )
                   }
                </div>   
            </div> 
         </main>
         <FooterOne />
      </>
   )
}

export default ThankYou;
