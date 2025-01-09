import Image from 'next/image'

export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      <Image
        src="/medical-background.jpg"
        alt="Medical background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-[#0097A7] dark:bg-[#006064] opacity-70"></div>
      <div className="relative z-10 text-center px-4 animate-fade-in">
        <h1 className="text-scale-5 font-extrabold mb-4">ApexCare Medical Solutions</h1>
        <p className="text-scale-2 mb-8 max-w-2xl mx-auto">Premium quality medical supplies & equipment at competitive prices</p>
        <a href="#contact" className="bg-white text-[#00BCD4] dark:bg-[#B2EBF2] dark:text-[#006064] px-8 py-3 rounded-full font-bold text-scale-1 hover:bg-[#B2EBF2] dark:hover:bg-white transition duration-300">Get in Touch</a>
      </div>
    </section>
  )
}

