import React from 'react';
import { MapPin, ChevronRight } from 'lucide-react';
import type { HeroSlide } from '../../../types/homepage.types';

interface HeroSliderProps {
  slides: HeroSlide[];
  activeSlide: number;
  onSlideChange: (index: number) => void;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides, activeSlide, onSlideChange }) => {
  return (
    <section className="relative h-[500px] overflow-hidden md:h-[600px]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === activeSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.image})`,
            }}
          >
            <div className="mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
              <div className="animate-fade-in max-w-2xl text-white">
                <div className="mb-4 flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm md:text-base">{slide.location}</span>
                </div>
                <h1 className="mb-4 text-4xl font-bold md:text-6xl">{slide.title}</h1>
                <p className="mb-8 text-lg text-gray-200 md:text-xl">{slide.subtitle}</p>
                <button className="bg-primary-600 hover:bg-primary-700 flex items-center space-x-2 rounded-full px-8 py-3 font-medium text-white transition">
                  <span>자세히 보기</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 transform space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => onSlideChange(index)}
            className={`h-2 w-2 rounded-full transition-all ${index === activeSlide ? 'w-8 bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
