import { useState } from "react";
import Image from "next/image";

const AccessibleTabs = (props: any) => {
  const initialDisplayCount = 6;
  const [visibleCount, setVisibleCount] = useState(initialDisplayCount);
  const [activeTab, setActiveTab] = useState(0);

  const mostGenerousDonarList = Array.isArray(props.mostGenerousDonar) ? props.mostGenerousDonar : Object.values(props.mostGenerousDonar);
  const recentDonarList = Array.isArray(props.recentDonarList) ? props.recentDonarList : Object.values(props.recentDonarList);

  const tabs = [
    { id: "tab-1", label: "Most Generous", aria_label: "Most-Generous", content: mostGenerousDonarList, },
    { id: "tab-2", label: "Recent Supporters", aria_label: "Recent-Supporters", content: recentDonarList },
  ];

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 4); // Show 4 more items
  };
  const handleShowLess = () => {
    setVisibleCount(initialDisplayCount);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === "ArrowRight") {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    } else if (e.key === "ArrowLeft") {
      setActiveTab((prev) => (prev - 1 + tabs.length) % tabs.length);
    }
  };
  
  return (
    <div className="container">
    <div className="row">
        <div className="col-md-8">
          <div className="tabs backersTab mt-20 mb-40">
            <div role="tablist" aria-label="Supporters Tabs" className="nav nav-tabs">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  id={tab.id}
                  role="tab"
                  aria-selected={activeTab === index}
                  aria-controls={`donorTabs-pane-${tab.aria_label}`}
                  tabIndex={activeTab === index ? 0 : -1}
                  onClick={() => setActiveTab(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`tab ${activeTab === index ? "active" : ""}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {tabs.map((tab, index) => (
              <div
                key={`donorTabs-pane-${tab.aria_label}`}
                id={`donorTabs-pane-${tab.aria_label}`}
                role="tabpanel"
                aria-labelledby={tab.id}
                tabIndex={activeTab === index ? 0 : -1}
                hidden={activeTab !== index}
                >
                <div id="top-donor" className="donor-tab-content">
                {tab.content.slice(0, visibleCount).map((donor: any, index: number) => (
                  <div className="donor-info show" key={`${donor.id}`}>
                    <div className="donorContent">
                      <Image src="/assets/img/icons/donar.png" width={60} height={60} className="donor-avatar" alt={donor.full_name} />
                      <div className="donationInfo">
                        <h4>{donor.full_name}</h4>
                        <p style={{color:"#6f6666"}}><strong>Donated - </strong>₹{donor.donation_amount}</p>
                      </div>
                    </div>
                  </div>
                 ))}
                </div>
                <div className="text-center mt-20">
                  {visibleCount < tab.content.length && (
                    <button onClick={handleShowMore} className="btn btn-lg btn-primary" style={{background:"#337ab7",borderColor:"#2e6da4"}} aria-label="Show More">Show More</button>
                  )}
                  {visibleCount > initialDisplayCount && (
                    <button onClick={handleShowLess} className="btn btn-lg btn-primary" style={{background:"#337ab7",borderColor:"#2e6da4"}} aria-label="Show Less">Show Less</button>
                  )}
               </div>
              </div>
            ))}
          </div>
        </div>
    </div>
    </div>
  );
};

export default AccessibleTabs;