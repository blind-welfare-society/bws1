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

  const [eventFired, setEventFired] = useState(false);

  useEffect(() => {
    if (!donationData || eventFired) return;
    
    const eventId = "donation_" + pageID;
    const donationAmount = Number(donationData.amount || donationData.total || 0);

    console.log("✅ FB firing with:", {
      amount: donationAmount,
      eventId,
      hasWindow: typeof window !== 'undefined',
      hasFbq: !!window.fbq
    });

    if (window.fbq) {
      (window as any).fbq('track', 'Purchase', {
        value: donationAmount,
        currency: 'INR',
      });
      console.log("✅ Purchase event tracked");

      (window as any).fbq('trackCustom', 'Grocery New', {
        value: donationAmount,
        currency: 'INR'
      });
      console.log("✅ Grocery New custom event tracked");
    } else {
      console.warn("⚠️ fbq not available");
    }


    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-527459866/kZgGCJabreQBEJrMwfsB',
        transaction_id: eventId
      });
      console.log("✅ Conversion event tracked");
    } else {
      console.warn("⚠️ gtag not available");
    }

    setEventFired(true);

  }, [donationData, eventFired]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThankYouComponent pageID={pageID} donationData={donationData} />
  );
};

export default TrackEvent;