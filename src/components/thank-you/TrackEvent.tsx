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
    const eventId = "donation_" + Date.now();
    const donationAmount = donationData?.amount || donationData?.total || 0;

    // Facebook Pixel
    (window as any).fbq('track', 'Purchase', {
      value: donationAmount,
      currency: 'INR'
    }, {
      eventID: eventId
    });

    (window as any).fbq('track', 'Donate');

    // Google Ads
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-527459866/kZgGCJabreQBEJrMwfsB',
        transaction_id: eventId
      });
    }

  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThankYouComponent pageID={pageID} donationData={donationData} />
  );
};

export default TrackEvent;