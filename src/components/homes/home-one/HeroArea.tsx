"use client"

import { useMemo, useRef, useState } from "react"
import Link from "next/link"
import Slider from "react-slick"
import UseSticky from "@/hooks/UseSticky"

export type HomeBanner = {
   bannerImage: string
   title: string
   link: string
   btnTxt: string
}

type HeroSlide = {
   id: string
   image: string
   text: string
   link: string
   buttonText: string
   alt: string
}

type HeroAreaProps = {
   banners: HomeBanner[]
}

const HeroArea = ({ banners }: HeroAreaProps) => {
   const { sticky } = UseSticky()
   const sliderRef = useRef<Slider | null>(null)
   const [isPaused, setIsPaused] = useState(false)
   const [currentSlide, setCurrentSlide] = useState(0)
   const heroSlides = useMemo<HeroSlide[]>(() => {
      return banners
         .filter((banner) => banner.bannerImage && banner.title)
         .map((banner, index) => ({
            id: `banner-${index}`,
            image: banner.bannerImage,
            text: banner.title,
            link: banner.link || "#",
            buttonText: banner.btnTxt || "Donate Now",
            alt: banner.title,
         }))
   }, [banners])
   const hasMultipleSlides = heroSlides.length > 1

   const temporarilyPauseSlider = () => {
      sliderRef.current?.slickPause()
   }

   const resumeSlider = () => {
      if (!isPaused) {
         sliderRef.current?.slickPlay()
      }
   }

   const pauseSlider = () => {
      temporarilyPauseSlider()
      setIsPaused(true)
   }

   const playSlider = () => {
      sliderRef.current?.slickPlay()
      setIsPaused(false)
   }

   const toggleSlider = () => {
      if (isPaused) {
         playSlider()
      } else {
         pauseSlider()
      }
   }

   const settings = {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: hasMultipleSlides,
      autoplaySpeed: 6000,
      dots: false,
      fade: true,
      infinite: hasMultipleSlides,
      pauseOnHover: true,
      pauseOnFocus: true,
      speed: 800,
      beforeChange: (_: number, next: number) => setCurrentSlide(next),
   }

   if (heroSlides.length === 0) {
      return null
   }

   return (
      <section
         className="hero-area hero-slider-area"
         aria-labelledby="home-hero-title"
         onBlurCapture={resumeSlider}
         onFocusCapture={temporarilyPauseSlider}
         onMouseEnter={temporarilyPauseSlider}
         onMouseLeave={resumeSlider}
      >
         <h2 id="home-hero-title" className="screen-reader-text">Donation campaigns</h2>
         <Slider ref={sliderRef} {...settings} className="hero-campaign-slider">
            {heroSlides.map((slide, index) => (
               <div key={slide.id}>
                  <div className="hero-campaign-slide">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img className="hero-campaign-slide__image" src={slide.image} alt={slide.alt} loading={index === 0 ? "eager" : "lazy"} />
                     <div className="hero-campaign-slide__overlay" aria-hidden="true"></div>
                     <div className="container container-1370">
                        <div className="hero-campaign-slide__content text-white">
                           {index === 0 ? (
                              <h1>{slide.text}</h1>
                           ) : (
                              <p className="hero-campaign-slide__title">{slide.text}</p>
                           )}
                           <div className="hero-btns pt-30 rpt-10">
                              <Link className="cr-btn" href={slide.link}>{slide.buttonText}</Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </Slider>

         {hasMultipleSlides && <div className={`hero-slider-controls ${sticky ? "hero-slider-controls--sticky" : ""}`} aria-label="Hero slider controls">
            <button
               type="button"
               className="hero-slider-arrow hero-slider-arrow--prev"
               aria-label="Show previous donation campaign"
               onClick={() => sliderRef.current?.slickPrev()}
            >
               <i className="flaticon-left-chevron" aria-hidden="true"></i>
            </button>

            <div className="hero-slider-dots" aria-label="Choose donation campaign slide">
               {heroSlides.map((slide, index) => (
                  <button
                     key={slide.id}
                     type="button"
                     className={currentSlide === index ? "active" : ""}
                     aria-label={`Go to slide ${index + 1}: ${slide.text}`}
                     aria-current={currentSlide === index ? "true" : undefined}
                     onClick={() => sliderRef.current?.slickGoTo(index)}
                  >
                     <span className="screen-reader-text">{slide.text}</span>
                  </button>
               ))}
            </div>

            <button
               type="button"
               className="hero-slider-toggle"
               aria-label={isPaused ? "Play slider" : "Pause slider"}
               aria-pressed={isPaused}
               onClick={toggleSlider}
            >
               <i className={isPaused ? "fa fa-play" : "fa fa-pause"} aria-hidden="true"></i>
               <span>{isPaused ? "Play" : "Pause"}</span>
            </button>

            <button
               type="button"
               className="hero-slider-arrow hero-slider-arrow--next"
               aria-label="Show next donation campaign"
               onClick={() => sliderRef.current?.slickNext()}
            >
               <i className="flaticon-next" aria-hidden="true"></i>
            </button>
         </div>}
      </section>
   )
}

export default HeroArea