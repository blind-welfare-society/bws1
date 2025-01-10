/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import ProductList from "./ProductList";
import ProjectBrief from "./ProjectBrief";
import ProjectUpdates from "./ProjectUpdates";
import ProjectFaqs from "@/components/common/ProjectFaqs";
import ProgressInfo from "./right-bar/ProgressInfo";
import ContributeForm from "./right-bar/ContributeForm";
import PaymentMods from "@/components/common/PaymentMods";
import { usePathname } from "next/navigation";
import BeneficiariesTestimonials from "@/components/common/BeneficiariesTestimonials";


const ProjectDetailsArea = (props: any) => {
    const currentProject = usePathname();

    const productId = props.project_content.id;
    const title = props.project_content.title;
    const banner_image = props.project_content.project_image;
    
    const products      = props.product_list;
    const description   = props.project_content.description;
    const content       = props.project_content.content;
    const targetAmount  = props.project_content.target_amount;
    const goatDetail    = props.project_content.goatDetail;
    const videoContent = props.project_content.video_content;
    const minimumAmount = props.project_content.minimum_amount;
    const preferred_slot= props.project_content?.preferred_slot || [];
    
    
    const [totalPrice, setTotalPrice] = useState(0);
    const [formattedProducts, setFormattedProducts] = useState<string[]>([]);
    const [resetProductQuantities, setResetProductQuantities] = useState(false);
    const [totalDonationAmount, setTotalDonationAmount] = useState(0);

    const handlePreferredSlotClick = () => {
        setResetProductQuantities(true);
        setFormattedProducts([]); // Clear formatted products
    };

    const handleProductAdd = () => {
        setTotalDonationAmount(0); // Reset donation amount when a product is added
    };

    const [activeTab, setActiveTab] = useState('products-tab');

    const handleTabClick = (event:any, tabId:any) => {
        event.preventDefault(); // Prevent default hash behavior
        setActiveTab(tabId); // Update the active tab
        const targetElement = document.getElementById(tabId);
        
        if (targetElement) {
        // Adjust scroll position by subtracting the header height (e.g., 50px)
        window.scrollTo({
            top: targetElement.offsetTop - 200, // Adjust the 50px offset as needed
            behavior: 'smooth',
        });
        }
    };

    console.log(activeTab);

    useEffect(() => {
    // Listen to hash change events for smooth scroll
        const onHashChange = () => {
        const targetId = window.location.hash.replace('#', '');
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            // Adjust scroll position by subtracting the header height
            window.scrollTo({
            top: targetElement.offsetTop - 200, // Adjust the 50px offset as needed
            behavior: 'smooth',
            });
            setActiveTab(targetId); // Update active tab on hash change
        }
        };

        window.addEventListener('hashchange', onHashChange);

        return () => {
        window.removeEventListener('hashchange', onHashChange);
        };
    }, []);

    return (
        <div className="container project-container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center headings-with-border mb-40 fw-600">{title}</h1>
                </div>
            </div>
            <div className="row project_details_section">
                <div className="col-md-8">
                    <div className="bannerImage">
                        <div className="bgImg1">
                            <img src={banner_image} alt={title} />
                        </div>
                    </div>
                    <div className="product_project_updates">
                    <div className="sticky-top-tabs">
                        <ul className="sticky-tabs">
                            <li role="presentation" className={`sticky-tab-item ${activeTab === 'products-tab' ? 'active' : ''}`}>
                                <a href="#products-tab" id="products-tab-panel" data-toggle="tab" aria-controls="Product" aria-expanded="true" onClick={(e) => handleTabClick(e, 'products-tab')}>Products</a>
                            </li>
                            <li role="presentation" className={`sticky-tab-item ${activeTab === 'project-tab' ? 'active' : ''}`}>
                                <a href="#project-tab" id="products-tab-panel" data-toggle="tab" aria-controls="Project" aria-expanded="false" onClick={(e) => handleTabClick(e, 'project-tab')}>Project</a>
                            </li>
                            <li role="presentation" className={`sticky-tab-item ${activeTab === 'updates-tab' ? 'active' : ''}`}>
                                <a href="#updates-tab" id="updates-tab-panel" data-toggle="tab" aria-controls="Updates" aria-expanded="false" onClick={(e) => handleTabClick(e, 'updates-tab')} >Updates</a>
                            </li>
                        </ul>
                    </div>
                    <ProductList 
                        products={products}
                        setTotalPrice={setTotalPrice} 
                        onProductChange={setFormattedProducts}
                        resetQuantities={resetProductQuantities}
                        onResetComplete={() => setResetProductQuantities(false)}
                        onProductAdd={handleProductAdd} 
                         />
                    <ProjectBrief project_description={description} project_content={content} video_content={videoContent} />
                    </div>
                    <div className="mt-4">
                        {currentProject === '/projects/be-the-light-donate-groceries-to-homeless-blind-in-need' && <BeneficiariesTestimonials /> }
                        <div dangerouslySetInnerHTML={{ __html: props.project_description }}></div>
                    </div>
                </div>
                <div className="col-md-4 donationOptForm mt-md-0 mt-4">
                    <ProgressInfo targetAmount={targetAmount} goatDetail={goatDetail} />
                    <ContributeForm 
                        preferred_slot={preferred_slot} 
                        project_id={props.project_content.id} 
                        products={products} 
                        minimum_amount={minimumAmount}
                        donation_amount={totalPrice} 
                        formattedProducts={formattedProducts}
                        onProductChange={setFormattedProducts}
                        onPreferredSlotClick={handlePreferredSlotClick}
                        resetDonationAmount={setTotalDonationAmount}
                    />
                </div>
                <div className="col-md-8">
                    <div className="mt-4">
                        <PaymentMods />
                        <ProjectUpdates project_id={productId} type="project" />    
                        <ProjectFaqs /> 
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default ProjectDetailsArea