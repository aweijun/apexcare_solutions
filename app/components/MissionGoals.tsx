"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

const cards = [
  {
    step: "01",
    title: "Our Mission",
    description: "Delivering excellence in healthcare solutions to empower expert patient care.",
    details: [
      "Deliver premium-quality medical supplies tailored to healthcare needs",
      "Offer highly competitive pricing without compromising on quality",
      "Ensure an efficient and resilient supply chain for seamless operations",
      "Provide unparalleled customer service to foster long-term partnerships"
    ],
    backgroundImage: "/mission-background.jpg"
  },
  {
    step: "02",
    title: "Our Vision",
    description: "To be the trusted global leader in medical supplies and equipment, setting new benchmarks in healthcare solutions.",
    details: [
      "Forge transformative partnerships within the healthcare industry",
      "Lead in cutting-edge healthcare innovation",
      "Expand our footprint across key global markets",
      "Uphold uncompromising quality standards to exceed expectations"
    ],
    backgroundImage: "/vision-background.jpg"
  },
  {
    step: "03",
    title: "Strategic Foundations for Immediate Impact",
    description: "Establish a strong reputation and presence in Southeast Asia, starting with Indonesia and Thailand, while solidifying our market position.",
    details: [
      "Build robust local partnerships with key stakeholders",
      "Establish scalable and efficient distribution networks",
      "Elevate brand recognition through strategic marketing",
      "Foster customer loyalty through exceptional service and programs"
    ],
    backgroundImage: "/short-term-goals-background.jpg"
  },
  {
    step: "04",
    title: "Blueprint for Global Leadership",
    description: "Expand our presence globally while achieving vertical integration through owning manufacturing facilities.",
    details: [
      "Expand into international markets with a tailored approach",
      "Develop and operate state-of-the-art manufacturing facilities",
      "Invest in research and development for groundbreaking healthcare solutions",
      "Implement sustainable growth strategies prioritizing environmental responsibility"
    ],
    backgroundImage: "/long-term-goals-background.jpg"
  }
];

export default function MissionGoals() {
  const [isMobile, setIsMobile] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [api, setApi] = React.useState<CarouselApi>()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section
      id="mission"
      className={`bg-white overflow-hidden ${isMobile ? 'py-16' : 'h-screen'}`}
    >
      <div
        className={`${isMobile ? 'container mx-auto px-4' : ''}`}
        style={{
          height: isMobile ? 'auto' : '100vh',
          width: '100vw',
          display: isMobile ? 'block' : 'flex',
          flexDirection: isMobile ? 'unset' : 'column',
        }}
      >
        {isMobile && (
          <h2 className="text-3xl font-extrabold text-center m-8 text-[#00BCD4]">
            Our Mission and Goals
          </h2>
        )}
        <Carousel
          className="w-full h-full"
          opts={{ loop: true }}
          onSelect={(selectedIndex) => setCurrentIndex(selectedIndex)}
          setApi={setApi}
        >
          <CarouselContent className={`h-full w-full ${isMobile ? '' : 'flex-grow'}`}>
            {cards.map((card, index) => (
              <CarouselItem key={index} className="h-full w-full">
                <div
                  className={`flex items-center justify-center bg-gradient-to-r from-[#00BCD4] to-[#4DD0E1] text-white ${
                    isMobile ? 'p-6 mb-8' : 'p-0 h-full w-full'
                  }`}
                  style={{
                    minHeight: isMobile ? 'auto' : '100vh',
                  }}
                >
                  <div className={`${isMobile ? 'w-full' : 'max-w-4xl p-16'}`}>
                    <div className="inline-flex items-center bg-white/10 rounded-full px-4 py-2 mb-6">
                      <div className="w-2 h-2 rounded-full bg-[#B2EBF2] mr-2"></div>
                      <span className="text-sm">Step {card.step}</span>
                    </div>
                    <h3
                      className={`${isMobile ? 'text-2xl' : 'text-5xl'} font-bold mb-6`}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={`${isMobile ? 'text-base' : 'text-xl'} mb-8`}
                    >
                      {card.description}
                    </p>
                    <ul
                      className={`grid ${
                        isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-2 gap-4'
                      }`}
                    >
                      {card.details.map((detail, i) => (
                        <li
                          key={i}
                          className={`flex items-center ${
                            isMobile ? 'text-sm' : 'text-lg'
                          }`}
                        >
                          <div
                            className={`${
                              isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'
                            } rounded-full bg-white/50 mr-3`}
                          ></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white rounded-full p-2 opacity-50 hover:opacity-100 transition-opacity"
          />
          <CarouselNext
            className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white rounded-full p-2 opacity-50 hover:opacity-100 transition-opacity"
          />
          <CarouselDots 
            total={cards.length} 
            currentIndex={currentIndex} 
            isMobile={isMobile} 
            onDotClick={(index) => {
              api?.scrollTo(index)
            }} 
          />
        </Carousel>
      </div>
    </section>
  )
}

function CarouselDots({ total, currentIndex, isMobile, onDotClick }: { total: number; currentIndex: number; isMobile: boolean; onDotClick: (index: number) => void; }) {
  return (
    <div className={`${isMobile ? 'relative mt-4' : 'absolute bottom-4'} left-1/2 transform -translate-x-1/2 flex space-x-2`}>
      {Array.from({ length: total }).map((_, index) => (
        <Button
          key={index}
          variant="ghost"
          size="sm"
          className={`w-3 h-3 p-0 rounded-full transition-all ${
            index === currentIndex ? 'bg-white scale-125 opacity-100' : 'bg-white/50 opacity-50'
          } hover:bg-white hover:opacity-100`}
          onClick={() => onDotClick(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}

