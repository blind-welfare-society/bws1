'use client';

import { useEffect, useState } from "react";
import ThankYouComponent from "./index";
import axios from "@/lib/axios";

declare global {
  interface Window {
    fbq?: (event: string, action: string, data?: any) => void;
    gtag?: (event: string, action: string, data?: any) => void;
  }
}

interface TrackEventProps {
  pageID: string | number;
}

const TrackEvent = ({ pageID }: TrackEventProps) => {
  const [donationData, setDonationData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch thank you data once
  useEffect(() => {
    const fullPathName = `get-donation-status/${pageID}`;
    axios.get(fullPathName)
      .then((res) => {
        const data = res.data.data;
        setDonationData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching thank you data:', error);
        setLoading(false);
      });
  }, [pageID]);

  // Track conversion once data is fetched
  useEffect(() => {
    if (typeof window !== "undefined" && donationData) {
      const donationAmount = donationData.amount || donationData.total || 0;

      if (donationAmount > 0) {
        const eventId = "donation_" + Date.now();

        // Facebook Pixel
        if (window.fbq) {
          window.fbq('track', 'Purchase', {
            value: donationAmount,
            currency: 'INR',
            content_ids: [pageID],
            content_type: 'product',
            eventID: eventId
          });
        }

        // Google Ads
        if (window.gtag) {
          window.gtag('event', 'conversion', {
            send_to: 'AW-527459866/kZgGCJabreQBEJrMwfsB',
            transaction_id: eventId
          });
        }
      }
    }
  }, [donationData, pageID]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThankYouComponent pageID={pageID} donationData={donationData} />
  );
};

export default TrackEvent;