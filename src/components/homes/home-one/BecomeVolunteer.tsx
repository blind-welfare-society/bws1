import Image from "next/image"
import ContactForm from "@/components/forms/ContactForm"

import volunteerImg_1 from "@/assets/img/valunteer/bws-image.png"
import volunteerImg_2 from "@/assets/img/valunteer/valunteer-bg1.png"

const BecomeVolunteer = () => {
  return (
   <div className="become-volunteer-area py-50  py-lg-120 overflow-hidden rel z-1">
       <div className="container">
           <div className="row align-items-center">
               <div className="col-lg-6">
                   <div className="volunteer-image rmb-65">
                       <Image src={volunteerImg_1} alt="valunteer"/>
                   </div>
               </div>
               <div className="col-lg-6">
                   <div className="volunteer-content form-style-one text-white">
                       <div className="section-title mb-45">
                           <h3>Get In  <span>Touch</span></h3>
                       </div>
                       <ContactForm />
                   </div>
               </div>
           </div>
       </div>
       <div className="become-volunteer-shapes">
           <Image className="one" src={volunteerImg_2} alt="Shape"/>
           <Image className="two" src={volunteerImg_2} alt="Shape"/>
       </div>
   </div>
  )
}

export default BecomeVolunteer
