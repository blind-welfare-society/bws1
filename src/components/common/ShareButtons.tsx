declare global {
  interface Window {
    ShareThis?: any;
  }
}
'use client';

import { useEffect } from 'react';

const ShareButtons = () => {
  useEffect(() => {
    const loadShareThisScript = () => {
      if (window?.ShareThis) {
        window.ShareThis.reload();
      } else {
        const script = document.createElement('script');
        script.src = 'https://platform-api.sharethis.com/js/sharethis.js#property=659d032eb492fb00132dce84&product=sop';
        script.async = true;
        script.onload = () => {
          window.ShareThis?.reload();
        };
        document.body.appendChild(script);
      }
    };

    loadShareThisScript();
  }, []);

  return (
    <div className="share-buttons-container">
      <h4>Spread The Word! Every Share Matters</h4>
      <div className="sharethis-inline-share-buttons"></div>
    </div>
  );
};

export default ShareButtons;
