"use client"
import faq_data from "@/data/projectFaq";
import { useEffect, useState } from "react";

interface DataType {
   id: number;
   page: string
   question: string;
   answer: string;
   showAnswer: boolean;
}


const ProjectFaqs = () => {
    const [faqData, setFaqData] = useState<DataType[]>([]);

    useEffect(() => {
      const initialFaqData: DataType[] = faq_data.filter((item) => item.page === "project_faqs").map((faq, index) => ({
         ...faq,
         showAnswer: index === 0,
      }));
      setFaqData(initialFaqData);
    }, []);

    const toggleAnswer = (id: number) => {
      setFaqData((prevFaqData) => {
         const updatedFaqData = prevFaqData.map((faq) => ({
            ...faq,
            showAnswer: faq.id === id ? !faq.showAnswer : false,
         }));
         return updatedFaqData;
      });
   };


    return (
        <div id="faqsTab" className="mt-30">
            <h4 className="project-heading">FAQs</h4>
            <div className="faq-accordion-two" id="faqAccordion">
            {(faqData.map((item) => (
                <div key={item.id} className={`accordion-item ${item.showAnswer ? "active" : ""}`}>
                <h5 className="accordion-header">
                    <button className={`accordion-button ${item.showAnswer ? "" : "collapsed"}`} onClick={() => toggleAnswer(item.id)} type="button">
                        {item.question}
                    </button>
                </h5>
                {item.showAnswer && (
                    <div className="accordion-collapse collapse show" id={`collapse${item.id}`}>
                        <div className="accordion-body"><div dangerouslySetInnerHTML={{ __html: item.answer }}></div></div>
                    </div>
                )}
                </div>
            )))}
            </div>
        </div>
    )
}

export default ProjectFaqs;