import Wrapper from "@/layout/Wrapper";
import TrackEvent from "@/components/thank-you/TrackEvent";

export const metadata = {
   title: "Thank you | Blind Welfare Society",
};
const index = (params: any) => {
  const pageID = params.params.pageid;

   return (
      <Wrapper>
         <TrackEvent pageID={pageID} />
      </Wrapper>
   )
}

export default index