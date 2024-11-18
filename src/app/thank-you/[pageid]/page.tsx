import ThankYou from "@/components/thank-you";
import Wrapper from "@/layout/Wrapper";

export const metadata = {
   title: "Thank you | Blind Welfare Society",
};
const index = (params: any) => {
  const pageID = params.params.pageid;

   return (
      <Wrapper>
         <ThankYou pageID={pageID} />
      </Wrapper>
   )
}

export default index