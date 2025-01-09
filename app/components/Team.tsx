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
    name: "Ms Tan",
    role: "Operations Manager",
    responsibility: "Oversees day-to-day operations and ensures smooth workflow across all departments.",
    bio: "Vast knowledge of optimal operational management. Seasoned project consultant for startups in Asia.",
    image: "/ms-tan.jpg"
  },
  {
    name: "Mr Tong",
    role: "Business Development",
    responsibility: "Leads strategic initiatives to expand our market presence and foster key partnerships.",
    bio: "Experienced entrepreneur who built a successful trading company. Veteran for spearheading developmental processes for startups in Asia.",
    image: "/mr-tong.jpg"
  },
  {
    name: "Dr Chow",
    role: "Medical Advisor",
    responsibility: "Provides expert medical insights to guide our product development and quality assurance.",
    bio: "Seasoned consultant oncologist and Head of Oncology and Palliative Care at St George's Hospital, London. Has built several successful healthcare companies.",
    image: "/dr-chow.jpg"
  }
]

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

