import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import Slider from "react-slick"
import Image from "next/image"

interface ProjectUpdate {
  id: number;
  title: string;
  update_date: string;
  description: string;
  project_id: number;
  updates_images: string[];
  showAnswer:boolean;
}

const DonationUpdated = (props: any) => {
    const [updates, setUpdates] = useState<ProjectUpdate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const pageId = props.page_id;

    useEffect(() => {
        const fetchUpdates = async () => {
        try {
            const response = await axios.get(`/page-update/${pageId}`);
            const updatesWithToggle = response.data.data.map((update: ProjectUpdate, index: number) => ({
                ...update,
                showAnswer: index === 0,
            }));
            setUpdates(updatesWithToggle);
        } catch (err) {
            setError('Failed to fetch project updates.');
            console.error(err);
        } finally {
            setLoading(false);
        }
        };

        fetchUpdates();
    }, [pageId]);

    console.log(updates);

    const toggleAccordion = (id: number) => {
        setUpdates((prevUpdates) =>
        prevUpdates.map((update) => ({
            ...update,
            showAnswer: update.id === id, // Open only the clicked item
        }))
        );
    };

    const CustomPrevArrow = (props: any) => {
      const { onClick } = props;
      return (
         <button onClick={onClick} type="button" className="left-arrow slick-arrow"><i className="flaticon-left-chevron"></i></button>
      );
   };

   const CustomNextArrow = (props: any) => {
      const { onClick } = props;
      return (
         <button onClick={onClick} type="button" className="right-arrow slick-arrow"><i className="flaticon-next"></i></button>
      );
   };

    
    const settings = {
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      fade: false,
      dots: true,
      prevArrow: <CustomPrevArrow />,
      nextArrow: <CustomNextArrow />,
      autoplaySpeed: 2000,
      responsive: [
         {
            breakpoint: 1200,
            settings: {
               slidesToShow: 2,
            }
         },
         {
            breakpoint: 767,
            settings: {
               slidesToShow: 1,
            }
         }
      ],
   }

    return (
        <div id="updates-tab">
            <h4 className="project-heading">Updates</h4>
            {updates.length > 0 ? (
                <div id="faqsTab" className="mt-30">
                    <div className="faq-accordion-two" id="faqAccordion">
                       {(updates.map((item, index) => (
                        <div key={item.id} className={`accordion-item ${item.showAnswer ? "active" : ""}`} >
                            <h5 className="accordion-header">
                                <button className={`accordion-button ${item.showAnswer ? "" : "collapsed"}`}  type="button" onClick={() => toggleAccordion(item.id)} aria-controls={`collapse${item.id}`} aria-expanded={item.showAnswer}>
                                    #{index + 1}&nbsp;&nbsp;{item.update_date}
                                </button>
                            </h5>
                            {item.showAnswer && (
                                <div className="accordion-collapse collapse show" id={`collapse${item.id}`}>
                                    <div className="accordion-body">
                                        <p className="mt-2">{ item.title}</p>
                                        <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
                                        {item.updates_images.length > 4 ? (
                                            <Slider {...settings}  className="update-slider row mt-4">
                                                {item.updates_images.map((image, index) => (
                                                    <div key={index} className="col-md-4">    
                                                        <Image src={image} alt="Image" width={200} height={150} />
                                                    </div>
                                                ))}
                                            </Slider>
                                        ): item.updates_images.length > 0 && (
                                            <div className="update-slider row mt-4 justify-content-center">
                                                {item.updates_images.map((image, index) => (
                                                    <div key={index} className="col-md-2">    
                                                        <Image src={image} alt="Image" width={200} height={150} />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )))}
                    </div>
                </div>
            ) : (
                <p className="no-updates">We will share the recent updates on this project here.</p>      
            )}
        </div>
    )
}

export default DonationUpdated