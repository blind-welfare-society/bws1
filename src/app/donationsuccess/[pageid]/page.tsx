import DonationSuccess from "@/components/DonationSuccess";
import Wrapper from "@/layout/Wrapper";

export const metadata = {
   title: "Donation Success | Blind Welfare Society",
};
const index = (params: any) => {
   const pageID = params.params.pageid;
   return (
      <Wrapper>
         <DonationSuccess pageID={pageID} />
      </Wrapper>
   )
}

export default index