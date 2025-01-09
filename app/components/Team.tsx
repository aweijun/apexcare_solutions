"use client"

import { useState } from 'react'
import Image from 'next/image'

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
  return (
    <section id="team" className="py-16 bg-[#B2EBF2]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-[#0097A7]">Meet the Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <FlipCard key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FlipCard({ member }: { member: TeamMember }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-md text-center h-[400px] perspective-1000 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        <div className="absolute w-full h-full backface-hidden">
          <div className="mb-4 relative w-32 h-32 mx-auto rounded-full overflow-hidden">
            <Image
              src={member.image}
              alt={member.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h3 className="text-xl font-bold mb-2 text-[#00BCD4]">{member.name}</h3>
          <h4 className="text-lg text-[#4DD0E1] mb-4">{member.role}</h4>
          <p className="text-base">{member.responsibility}</p>
        </div>
        <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-6">
          <p className="text-sm">{member.bio}</p>
        </div>
      </div>
    </div>
  )
}

