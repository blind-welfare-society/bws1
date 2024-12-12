import Script from 'next/script';
import { useEffect } from 'react';

const ShareButtons = () => {
  useEffect(() => {
    // Check if the ShareThis library is available and initialize the buttons
    const initializeShareThis = () => {
      if (window && (window as any).ShareThis) {
        (window as any).ShareThis.load('inline-share-buttons', 0);
        }
    };

    // Delay to ensure the script has loaded and the DOM is ready
    const timer = setTimeout(() => {
      initializeShareThis();
    }, 500); // Small delay to ensure ShareThis script execution

    return () => clearTimeout(timer); // Cleanup timeout if the component unmounts
  }, []); // Runs once when the component is mounted

  return (
    <div>
      <Script
        src="https://platform-api.sharethis.com/js/sharethis.js#property=659d032eb492fb00132dce84&product=sop"
        strategy="afterInteractive"
        onLoad={() => {
          if (window && (window as any).ShareThis) {
            (window as any).ShareThis.load('inline-share-buttons', 0);
          }
        }}
      />
      <div className="shear mt-20 mb-30">
        <h4>Spread The Word! Every Share Matters</h4>
        <div className="sharethis-inline-share-buttons"></div>
      </div>
    </div>
  );
};

export default ShareButtons;
