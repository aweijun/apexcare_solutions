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
      <section id="home">
        <Hero />
      </section>
      <section id="mission">
        <MissionGoals />
      </section>
      <section id="team">
        <Team />
      </section>
      <section id="contact">
        <ContactForm />
      </section>
      <Footer />
    </main>
  )
}

