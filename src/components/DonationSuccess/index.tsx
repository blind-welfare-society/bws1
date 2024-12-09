'use client'
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { usePathname } from 'next/navigation'
import Image from "next/image"


const DonationSuccess = ({ pageID }: any) => {
   const [donationData, setDonationData] = useState({} as any);

   const fullPathName = `donation-success/${pageID}`;
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
                           <h1 className="text-center headings-with-border">
                               Thank you for your Support
                           </h1>
                    </div>
                </div>
                <div className="row">
                  <div className="col-12">
                        <div className="donation-sec">
                            <p><strong>Your donations details are as under:</strong></p>
                            <p><strong>Your Name:</strong> {donationData.name}</p>
                            <div style={{ overflowX: "auto" }}>
                                <p><strong>Your Donation Description:</strong></p>
                                <table className="productTable">
                                    <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Name</th>
                                        <th>Quantity</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {donationData.payment_desc?.map((item:any, index:any) => (
                                        <tr key={index}>
                                        <td><Image src={item[2]} alt={item[1]} width={50} height={50} /></td>
                                        <td>{item[1]}</td>
                                        <td>{item[0]}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
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
                            <a href={`https://dheeraj84.blindwelfaresociety.in/exportPDFForDonation/${donationData.id}`} className="donation_button" download="">Download your Receipt</a>
                        </div>
                  </div>   
                </div>   
            </div> 
         </main>
         <FooterOne />
      </>
   )
}

export default DonationSuccess;
