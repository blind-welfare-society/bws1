'use client'
import "../styles/index.scss";
import { DM_Sans, Nunito_Sans, Pacifico } from 'next/font/google'
import { useEffect } from 'react';
import Script from 'next/script';
import Image from "next/image";

const body = DM_Sans({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--base-font',
});

const heading = Nunito_Sans({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--heading-font',
});

const script = Pacifico({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--script-font',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  }) {
  useEffect(() => {
    // Remove the 'theme' key from localStorage on page load
    localStorage.removeItem('idDarkMode');
    //console.log('Removed theme from localStorage');
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <Script 
        type='text/javascript' 
        src='https://platform-api.sharethis.com/js/sharethis.js#property=659d032eb492fb00132dce84&product=sop' 
        async 
        strategy="afterInteractive" 
        />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-16567220501" strategy="afterInteractive" />
        <Script
          id="gtm-inline-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              
              gtag('config', 'AW-527459866');
              gtag('config', 'G-9VZBTSV0RV');
              gtag('config', 'AW-16567220501');
            `,
          }}
        />
        <Script
          id="fb_pixel-inline-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
             !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '158494329260374');
            fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
        <Image height={1} width={1}  src="https://www.facebook.com/tr?id=158494329260374&ev=PageView &noscript=1" alt="" />
        </noscript>
        <Script
          id="gtag-inline-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
             (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K9RTDRWN');
            `,
          }}
        />

      </head>
      <body suppressHydrationWarning={true} className={` ${body.variable} ${heading.variable} ${script.variable} `}>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K9RTDRWN" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
        <div className="wrapper">
          {children}
        </div>
      </body>
    </html>
  )
}
