import Count from "@/components/common/Count"

const impactItems = [
   {
      id: 1,
      icon: "flaticon-charity",
      number: 1000,
      title: "Girls with Blindness Provided Free Shelter",
      accent: "",
   },
   {
      id: 2,
      icon: "flaticon-donation",
      number: 150000,
      title: "Nutritious Meals Served",
      accent: "impact-counter-item--green",
   },
   {
      id: 3,
      icon: "flaticon-help",
      number: 2500,
      title: "Assistive Devices Distributed",
      accent: "impact-counter-item--yellow",
   },
   {
      id: 4,
      icon: "flaticon-heart",
      number: 10000,
      title: "Lives Impacted",
      accent: "",
   },
   {
      id: 5,
      icon: "flaticon-solidarity",
      number: 500,
      title: "Families Supported",
      accent: "impact-counter-item--green",
   },
   {
      id: 6,
      icon: "flaticon-user",
      number: 100,
      title: "Volunteers Engaged",
      accent: "impact-counter-item--yellow",
   },
]

const formatImpactNumber = (number: number) => number.toLocaleString("en-IN")

const ImpactCounter = () => {
   return (
      <section className="impact-counter-area py-70 rpy-90 rel z-1" aria-labelledby="impact-counter-title">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6 col-lg-8 col-md-10">
                  <div className="section-title text-center mb-30">
                     <h3><span>Our Impact</span></h3>
                     <p><strong>Thousands of Beneficiaries Served Through Free Shelter, Education, and Care</strong></p>
                  </div>
               </div>
            </div>
            <ul className="row justify-content-center" aria-label="Impact statistics">
               {impactItems.map((item) => (
                  <li
                     key={item.id}
                     className="col-xl-4 col-md-6"
                     aria-label={`${formatImpactNumber(item.number)} plus ${item.title}`}
                  >
                     <div className={`impact-counter-item ${item.accent}`}>
                        <div className="impact-counter-item__icon" aria-hidden="true">
                           <i className={item.icon}></i>
                        </div>
                        <div className="impact-counter-item__content">
                           <h3 aria-hidden="true"><Count number={item.number} formatStyle="indian" ariaHidden={true} /><span>+</span></h3>
                           <span className="screen-reader-text">{formatImpactNumber(item.number)} plus</span>
                           <p>{item.title}</p>
                        </div>
                     </div>
                  </li>
               ))}
            </ul>
         </div>
      </section>
   )
}

export default ImpactCounter