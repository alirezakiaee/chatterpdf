import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface SlideContent {
  title: string;
  description: string;
  imageSrc: string;
}

interface HeroSliderProps {
  slides: SlideContent[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides }) => {
  return (
    <div className="w-full" style={{ height: "calc(100dvh / 3)" }}>
      <Carousel className="w-full h-full">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="flex h-full">
                <div className="w-1/2 p-8 flex flex-col justify-center">
                  <h1 className="text-3xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-lg">{slide.description}</p>
                </div>
                <div className="w-1/2 h-full relative">
                  <div className="absolute inset-0">
                    <Image
                      src={slide.imageSrc}
                      alt={slide.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-r-md"
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2" />
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2" />
      </Carousel>
    </div>
  );
};

export default HeroSlider;
