import Script from 'next/script';
import { useEffect } from 'react';

const ShareButtons = () => {
  useEffect(() => {
    if (window && (window as any).ShareThis) {
    (window as any).ShareThis.load('inline-share-buttons', 0);
    }
  }, []); // Runs only on the initial render

  return (
    <div>
      <Script
        src="https://platform-api.sharethis.com/js/sharethis.js#property=659d032eb492fb00132dce84&product=sop"
        strategy="afterInteractive"
        type="text/javascript"
      />
      <div className="shear mt-20 mb-30">
        <h4>Spread The Word! Every Share Matters</h4>
        <div className="sharethis-inline-share-buttons"></div>
      </div>
    </div>
  );
};

export default ShareButtons;
