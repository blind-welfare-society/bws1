'use client'
import FooterOne from "@/layout/footers/FooterOne"
import HeaderOne from "@/layout/headers/HeaderOne"
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { usePathname } from 'next/navigation'
import Image from "next/image"


const ContactThankYou = () => {
   return (
      <>
         <HeaderOne style_1={false} style_2={false} />
         <main>
           <div className="container">
                <div className="row">
                    <div className="col-12 mb-40">
                           <h1 className="text-center headings-with-border">Thank you</h1>
                    </div>
                </div>
                <div className="row">
                   <div className="col-md-12">
                        <div className="cms_content text-center mb-150 text-center">
                            <p style={{fontSize:'20px', fontWeight:'bold',marginBottom:'10px'}}>Your request has been submitted successfully.</p>
                            <p style={{fontSize:'20px', fontWeight:'bold', marginBottom:'5px'}}>We will contact you shortly.</p>
                        </div>
                    </div>
                </div>   
            </div> 
         </main>
         <FooterOne />
      </>
   )
}

export default ContactThankYou;