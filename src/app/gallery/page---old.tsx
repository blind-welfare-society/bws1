
import Wrapper from "@/layout/Wrapper";
import GalleryArea from "@/components/Gallery";

export const metadata = {
   title: "Faq Charite - Charity & Donation React Next js Template",
};
const index = () => {
const imageData = [
  { src: 'https://www.blindwelfaresociety.in/public/storage/gallery/130120075948-gallery-img16.jpg'},
  { src: 'https://www.blindwelfaresociety.in/public/storage/gallery/130120075948-gallery-img22.jpg'},
  { src: 'https://www.blindwelfaresociety.in/public/storage/gallery/130120075948-gallery-img22.jpg'},
  // More images
]; 
   return (
      <Wrapper>
         <GalleryArea images={imageData} />
      </Wrapper>
   )
}

export default index