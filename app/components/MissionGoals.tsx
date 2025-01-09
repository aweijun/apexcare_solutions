"use client"

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

export default function MissionGoals() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const cards = [
    {
      step: "01",
      title: "Our Mission",
      description: "Delivering quality healthcare solutions, allowing you to offer expert patient-care.",
      details: [
        "Provide high-quality medical supplies",
        "Ensure competitive pricing",
        "Maintain reliable supply chain",
        "Offer excellent customer service"
      ],
      backgroundImage: "/mission-background.jpg"
    },
    {
      step: "02",
      title: "Our Vision",
      description: "To become the leading & go-to company for all things related to medical supplies and equipment.",
      details: [
        "Build strong industry partnerships",
        "Innovate in healthcare solutions",
        "Expand market presence",
        "Maintain highest quality standards"
      ],
      backgroundImage: "/vision-background.jpg"
    },
    {
      step: "03",
      title: "Short Term Goals",
      description: "Establish our company's name, reputation & credibility, starting with Indonesia & Thailand. Expand across Southeast Asia & solidify our ties and position in the market.",
      details: [
        "Build local partnerships",
        "Establish distribution networks",
        "Develop brand recognition",
        "Create customer loyalty programs"
      ],
      backgroundImage: "/short-term-goals-background.jpg"
    },
    {
      step: "04",
      title: "Long Term Goals",
      description: "Look at possible expenditures beyond Southeast Asia. Strive towards owning our own manufacturing plant.",
      details: [
        "International market expansion",
        "Manufacturing facility development",
        "Research and development initiatives",
        "Sustainable growth strategies"
      ],
      backgroundImage: "/long-term-goals-background.jpg"
    }
  ]

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length)
  }

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)
  }

  return (
    // mission
    <section id="mission" className="py-16 bg-white overflow-hidden mb-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-[#00BCD4]">Our Mission and Goals</h2>
        
        <div className="relative max-w-4xl mx-auto h-[500px]">
          {/* Navigation Arrows */}
          <button
            onClick={prevCard}
            className="absolute left-4 bottom-4 md:top-1/2 md:-translate-y-1/2 z-50 bg-white/20 hover:bg-white/30 text-[#00BCD4] rounded-full p-2 backdrop-blur-sm transition-all"
            aria-label="Previous card"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextCard}
            className="absolute right-4 bottom-4 md:top-1/2 md:-translate-y-1/2 z-50 bg-white/20 hover:bg-white/30 text-[#00BCD4] rounded-full p-2 backdrop-blur-sm transition-all"
            aria-label="Next card"
          >
            <ChevronRight size={24} />
          </button>

          {/* Cards */}
          <div className="relative w-full h-full">
            {cards.map((card, index) => {
              const position = (index - activeIndex + cards.length) % cards.length
              const isActive = position === 0
              const zIndex = cards.length - position
              
              return (
                <div
                  key={index}
                  className={`
                    absolute w-full max-w-3xl left-1/2 
                    rounded-lg text-white overflow-hidden
                    transition-all duration-500 ease-in-out h-[500px]
                    ${isMobile 
                      ? `${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 translate-y-full'}`
                      : `opacity-${100 - position * 20} scale-${100 - position * 5}`
                    }
                  `}
                  style={{
                    transform: isMobile
                      ? `translateX(-50%) ${isActive ? 'translateY(0)' : 'translateY(100%)'}`
                      : `translateX(calc(-50% + ${position * 40}px))`,
                    zIndex,
                    top: isMobile ? 0 : `${position * 20}px`,
                  }}
                >
                  <Image
                    src={card.backgroundImage}
                    alt={`${card.title} background`}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00BCD4] to-transparent opacity-100"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-6">
                    <div className="inline-flex items-center bg-white/10 rounded-full px-4 py-2 w-fit">
                      <div className="w-2 h-2 rounded-full bg-[#B2EBF2] mr-2"></div>
                      <span className="text-sm">Step {card.step}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">{card.title}</h3>
                    <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-2xl">
                      {card.description}
                    </p>

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {card.details.map((detail, i) => (
                        <li key={i} className="flex items-center text-white/90">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/50 mr-2"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-16 h-16 flex items-center justify-center rounded-full bg-white/10">
                    <span className="font-medium text-2xl">{card.step}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Card Indicators */}
          <div className="absolute bottom-20 md:bottom-[-3rem] left-1/2 transform -translate-x-1/2 flex gap-2">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex ? 'bg-[#00BCD4] w-4' : 'bg-[#B2EBF2]'
                }`}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

