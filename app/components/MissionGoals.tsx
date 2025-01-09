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

        <div className="relative max-w-5xl mx-auto h-[600px]">
          {/* Navigation Arrows */}
          <button
            onClick={prevCard}
            className="absolute left-6 bottom-6 md:top-1/2 md:-translate-y-1/2 z-50 bg-white/20 hover:bg-white/30 text-[#00BCD4] rounded-full p-3 backdrop-blur-sm transition-all"
            aria-label="Previous card"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={nextCard}
            className="absolute right-6 bottom-6 md:top-1/2 md:-translate-y-1/2 z-50 bg-white/20 hover:bg-white/30 text-[#00BCD4] rounded-full p-3 backdrop-blur-sm transition-all"
            aria-label="Next card"
          >
            <ChevronRight size={28} />
          </button>

          {/* Cards */}
          <div className="relative w-full h-full p-16">
            {cards.map((card, index) => {
              const position = (index - activeIndex + cards.length) % cards.length
              const isActive = position === 0
              const zIndex = cards.length - position

              return (
                <div
                  key={index}
                  className={`absolute w-full max-w-4xl left-1/2 rounded-lg text-white overflow-hidden transition-all duration-500 ease-in-out h-[600px]
            ${isMobile
                      ? `${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 translate-y-full'}`
                      : `opacity-${100 - position * 20} scale-${100 - position * 5}`
                    }`}
                  style={{
                    transform: isMobile
                      ? `translateX(-50%) ${isActive ? 'translateY(0)' : 'translateY(100%)'}`
                      : `translateX(calc(-50% + ${position * 50}px))`,
                    zIndex,
                    top: isMobile ? 0 : `${position * 25}px`,
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
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-6">
                    <div className="inline-flex items-center bg-white/10 rounded-full px-5 py-3 w-fit">
                      <div className="w-3 h-3 rounded-full bg-[#B2EBF2] mr-2"></div>
                      <span className="text-sm">Step {card.step}</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold">{card.title}</h3>
                    <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl">
                      {card.description}
                    </p>

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      {card.details.map((detail, i) => (
                        <li key={i} className="flex items-center text-white/90">
                          <div className="w-2 h-2 rounded-full bg-white/50 mr-3"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 w-20 h-20 flex items-center justify-center rounded-full bg-white/10">
                    <span className="font-medium text-3xl">{card.step}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Card Indicators */}
          <div className="absolute bottom-24 md:bottom-[-4rem] left-1/2 transform -translate-x-1/2 flex gap-3">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === activeIndex ? 'bg-[#00BCD4] w-5' : 'bg-[#B2EBF2]'
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

