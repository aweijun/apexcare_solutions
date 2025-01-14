"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface TeamMember {
  name: string;
  role: string;
  responsibility: string;
  bio: string;
  image: string;
}

const team: TeamMember[] = [
  {
    name: "Nicole Tan",
    role: "Operations Director",
    responsibility: "Oversees the seamless execution of daily operations and drives operational excellence across all departments.",
    bio: "An accomplished operations strategist with extensive expertise in streamlining workflows and optimizing productivity. Previously a lead consultant for multiple successful startup projects across Asia.",
    image: "/nicole-tan.jpg"
  },
  {
    name: "Tong Ming Hao",
    role: "Business Development Director",
    responsibility: "Spearheads strategic initiatives to expand market presence, foster long-term partnerships, and drive business growth.",
    bio: "A dynamic entrepreneur with a proven track record of founding and scaling successful trading businesses. Expert in business strategy and development for emerging enterprises in Asia.",
    image: "/john-tong.jpg"
  },
  {
    name: "Dr. Jason Chow",
    role: "Medical Director",
    responsibility: "Provides expert medical leadership to shape our product development, ensure quality assurance, and uphold industry standards.",
    bio: "A distinguished consultant oncologist and Head of Oncology and Palliative Care at St. George's Hospital, London. Renowned for his expertise in healthcare innovation and for founding several thriving healthcare companies.",
    image: "/dr-jason-chow.jpg"
  },
  {
    name: "Derek Li",
    role: "Chief Financial Officer (CFO)",
    responsibility: "Leads the company's financial strategy, oversees financial planning and analysis, and ensures fiscal health and sustainability.",
    bio: "An experienced financial executive with a proven history of managing complex financial operations. Known for his expertise in driving profitability and ensuring regulatory compliance.",
    image: "/derek-li.jpg"
  }
];

export default function Team() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section id="team" className="py-16 bg-[#B2EBF2] min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-[#0097A7]">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 auto-rows-fr">
          {team.map((member, index) => (
            isMobile ? (
              <MobileTeamCard key={index} member={member} />
            ) : (
              <FlipCard key={index} member={member} />
            )
          ))}
        </div>
      </div>
    </section>
  )
}

function MobileTeamCard({ member }: { member: TeamMember }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-white rounded-lg shadow-md text-center cursor-pointer aspect-[5/6] flex flex-col">
          <div className="flex-grow flex items-center justify-center p-4" style={{ height: '62.5%' }}>
            <div className="relative w-full h-full rounded-full overflow-hidden" style={{ maxWidth: '75%', aspectRatio: '1/1' }}>
              <Image
                src={member.image}
                alt={member.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="p-4 bg-white text-[#00BCD4]">
            <h3 className="text-lg font-bold mb-1">{member.name}</h3>
            <h4 className="text-sm text-[#4DD0E1] mb-2">{member.role}</h4>
            <p className="text-xs text-gray-600 line-clamp-2">{member.responsibility}</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{member.name}</DialogTitle>
          <DialogDescription>{member.role}</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Responsibility:</h4>
          <p className="mb-4">{member.responsibility}</p>
          <h4 className="font-semibold mb-2">Bio:</h4>
          <p>{member.bio}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function FlipCard({ member }: { member: TeamMember }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className="bg-white rounded-lg shadow-md text-center aspect-[5/6] perspective-1000 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        <div className="absolute w-full h-full backface-hidden flex flex-col justify-between p-6">
          <div className="flex flex-col items-center justify-center flex-grow">
            <div className="mb-4 relative w-24 h-24 rounded-full overflow-hidden">
              <Image
                src={member.image}
                alt={member.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#00BCD4]">{member.name}</h3>
            <h4 className="text-lg text-[#4DD0E1] mb-4">{member.role}</h4>
            <p className="text-sm line-clamp-3">{member.responsibility}</p>
          </div>
        </div>
        <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-6">
          <p className="text-sm">{member.bio}</p>
        </div>
      </div>
    </div>
  )
}

