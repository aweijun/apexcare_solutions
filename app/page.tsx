import Header from './components/Header'
import Hero from './components/Hero'
import MissionGoals from './components/MissionGoals'
import Team from './components/Team'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section id="home" className="h-screen">
        <Hero />
      </section>
      <section id="mission" className="h-screen">
        <MissionGoals />
      </section>
      <section id="team" className="h-screen">
        <Team />
      </section>
      <section id="contact" className="h-screen">
        <ContactForm />
      </section>
      <Footer />
    </main>
  )
}

