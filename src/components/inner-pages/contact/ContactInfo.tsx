import Link from "next/link";
import React from "react";
import Image from "next/image";

interface DataType {
   id: number;
   item_bg?: string;
   icon: string;
   title: string;
   contact_info?: {
      info_link: string;
      info_title: string;
   }[];
   contact_info_text?: JSX.Element;
}[]

const contact_data: DataType[] = [
   {
      id: 1,
      item_bg:"contact-info-item--green",
      icon: "location.png",
      title: "Project Address",
      contact_info_text: (<>Blind Welfare Society, <br />Plot No. 2/16, Block WXYZ, Near M.N. Convent Public School, Kushak Road No. 2, Swaroop Nagar, New Delhi - 110042</>),
   },
   {
      id: 2,
      item_bg:"contact-info-item--green",
      icon: "location.png",
      title: "Admin Address",
      contact_info_text: (<>Blind Welfare Society, <br />F-5, Near Police Station, Nihal Vihar, New Delhi - 110041</>),
   },
   {
      id: 3,
      item_bg:"contact-info-item--green",
      icon: "message.png",
      title: "Email",
      contact_info: [
         {
            info_link: "mailto:info@blindwelfaresociety.in",
            info_title: "info@blindwelfaresociety.in"
         }
      ]
   },
   {
      id: 4,
      item_bg: "contact-info-item--yellow",
      icon: "phone.png",
      title: "Landline",
      contact_info: [
         {
            info_link: "callto:+91-11-25948803",
            info_title: "+91-11-25948803"
         }
      ]
   },
   {
      id: 5,
      item_bg: "contact-info-item--yellow",
      icon: "mobile.png",
      title: "Mobile",
      contact_info: [
         {
            info_link: "callto:+91-9968969932",
            info_title: "+91-9968969932"
         }
      ]
   },
]

const ContactInfo = () => {
   return (
      <div className="contact-info-area pb-0 pt-40">
         <div className="container">
            <div className="row ">
               {contact_data.map((item) => (
                  <div key={item.id} className="col-md-12">
                     <div className={`contact-info-item ${item.item_bg}`}>
                        
                        <h5>{item.title}</h5>
                        <div className="contact-info__text">
                           <div className="contact-info__icon"><Image src={`/assets/img/icons/${item.icon}`} width={20} height={20} alt={item.title} title={item.title} /></div>
                           {item.contact_info ? (item.contact_info.map((info, index) => (
                              <React.Fragment key={index}>
                                 <Link href={info.info_link}>{info.info_title}</Link><br />
                              </React.Fragment>
                           ))) : (item.contact_info_text)}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default ContactInfo
