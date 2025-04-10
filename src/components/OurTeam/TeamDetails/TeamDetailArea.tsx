import Image from "next/image";
const TeamDetailArea = (props: any) => {
    const single_team = props.cmsContent;
    
    return (
       <div className="blog-details-area pb-20 pt-50">
          <div className="container">
             <div className="row gap-60">
                <div className="col-lg-3 text-center">
                    <div className="mt-5 singleItem_profile_img">
                    <Image src={single_team.image} width={250} height={250} alt={single_team.name} className="" />
                    </div>
                </div>
                <div className="col-lg-9">
                   <div className="blog-details-content mb-55">
                      <h1 className="pb-0 mb-2">{single_team.name}</h1>
                      <h5 className="designation  mb-2">{single_team.designation}</h5>
                       <div dangerouslySetInnerHTML={{ __html: single_team.description }}></div>
                      <hr />
                   </div>
                </div>
             </div>
          </div>
       </div>
    )
 }
 
 export default TeamDetailArea
 