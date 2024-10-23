/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useState } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/style.css';

interface ImageData {
    src: string;
    description?: string;
}

const GalleryPhotos = ({ images }: { images: ImageData[] }) => {
  const [imageSizes, setImageSizes] = useState<Record<string, { width: number; height: number }>>({});

  // Fetch image size when component mounts
  useEffect(() => {
    images.forEach(image => {
      const img = new Image();
      img.src = image.src;
      img.onload = () => {
        setImageSizes(prevSizes => ({
          ...prevSizes,
          [image.src]: { width: img.naturalWidth, height: img.naturalHeight },
        }));
      };
    });
  }, [images]);

  return (
      <Gallery>
      <div className='gallery'>
      {images.map((image, index) => (
        <Item
          key={index}
          original={image.src}
          thumbnail={image.src}
          width={imageSizes[image.src]?.width || 800} // Default size if not yet loaded
          height={imageSizes[image.src]?.height || 600} // Default size if not yet loaded
        >
          {({ ref, open }) => (
            <img ref={ref} onClick={open} src={image.src} alt={image.description} />
          )}
        </Item>
      ))}
      </div>    
      </Gallery>
      
  );
};

// Example usage:
export default GalleryPhotos;