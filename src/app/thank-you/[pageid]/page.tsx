import ThankYou from "@/components/thank-you";
import Wrapper from "@/layout/Wrapper";
import Script from "next/script";

export const metadata = {
   title: "Thank you | Blind Welfare Society",
};
const index = (params: any) => {
  const pageID = params.params.pageid;

   return (
      <Wrapper>
         <Script
          id="google-conversion-inline-script"
            dangerouslySetInnerHTML={{
               __html: `
                  gtag('event', 'conversion', {
                        'send_to': 'AW-527459866/kZgGCJabreQBEJrMwfsB',
                        'transaction_id': ''
                    });
               `,
            }}
            />
            <Script
            id="fb-conversion-inline-script"
            dangerouslySetInnerHTML={{
               __html: `
               fbq('track', 'Donate');
               `,
            }}
         />
         <ThankYou pageID={pageID} />
      </Wrapper>
   )
}

export default index