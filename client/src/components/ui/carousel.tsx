import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import React from "react";

interface CarouselProps {
  children: React.ReactNode;
  autoSlide?: boolean;
  slidesPerView?: number;
  spacing?: number;
  className?: string;
  showArrows?: boolean;
  showDots?: boolean;
}

export default function Carousel({
  children,
  autoSlide = true,
  slidesPerView = 3,
  spacing = 15,
  className = "",
  showArrows = true,
  showDots = true,
}: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slides: {
      perView: slidesPerView,
      spacing,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 1, spacing: 10 },
      },
      "(max-width: 1024px)": {
        slides: { perView: Math.min(2, slidesPerView), spacing: 12 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  // Normalize children
  const childrenArray = React.Children.toArray(children);
  const totalSlides = childrenArray.length;

  // Autoplay functionality
  useEffect(() => {
    if (!autoSlide || !instanceRef.current || !loaded) return;

    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 4000);

    return () => clearInterval(interval);
  }, [autoSlide, loaded]); // Removed instanceRef from deps

  return (
    <div className={`relative ${className}`}>
      <div ref={sliderRef} className="keen-slider">
        {childrenArray.map((child, index) => (
          <div key={(child as any)?.key ?? index} className="keen-slider__slide">
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {loaded && instanceRef.current && showArrows && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
            onClick={() => instanceRef.current?.prev()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
            onClick={() => instanceRef.current?.next()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {loaded && instanceRef.current && showDots && totalSlides > slidesPerView && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: Math.ceil(totalSlides / slidesPerView) }).map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full transition-all ${
                Math.floor(currentSlide / slidesPerView) === idx
                  ? "bg-primary"
                  : "bg-neutral-300 hover:bg-neutral-400"
              }`}
              onClick={() => instanceRef.current?.moveToIdx(idx * slidesPerView)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
