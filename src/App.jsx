import { useEffect, useState } from 'react'
import './App.css'
import profilePhoto from './assets/20251129_170634.jpg'
import heroPhoto from './assets/image.png'
import quizCertificate from './assets/WhatsApp Image 2026-08-06 at 19.13.23.jpeg'
import googleCertificate from './assets/Screenshot 2026-09-06 220049.png'

const skills = [
  ['Programming', 'Java · Python'],
  ['Web & development', 'Next.js · TypeScript · JavaScript · Git & GitHub · VS Code'],
  ['AI & emerging tech', 'Generative AI · AI APIs · AI agents · RAG · AI-powered applications'],
  ['Product & design', 'UI/UX · Interactive web experiences · Product architecture · Rapid prototyping · Startup ideation'],
]

function Certificates() {
  return (
    <main className="certificates-page">
      <header className="site-header">
        <a className="wordmark" href="#top">DR<span>/</span>26</a>
        <a className="certificates-back" href="#top"><span>←</span> Back to portfolio</a>
      </header>

      <section className="certificates-hero">
        <p className="section-label">A record of the journey <span>— 05</span></p>
        <div className="certificates-hero__content">
          <h1>My <em>certificates.</em></h1>
          <p>These are a few of my achievements, certificates, and moments worth remembering.</p>
        </div>
      </section>

      <section className="certificate-list" aria-label="Certificates and achievements">
        <article className="certificate-card">
          <div className="certificate-card__meta"><span>01</span><span>QuizOff 2026</span></div>
          <img src={quizCertificate} alt="QuizOff 2026 certificate presented to Dhanunjay Reddy" />
        </article>
        <article className="certificate-card certificate-card--blue">
          <div className="certificate-card__meta"><span>02</span><span>Google Student Ambassador Program</span></div>
          <img src={googleCertificate} alt="Google Student Ambassador Program certificate presented to Dhanunjay Reddy" />
        </article>
      </section>

      <footer className="certificates-footer"><span>More milestones ahead.</span><a href="#top">Return home <span>↗</span></a></footer>
    </main>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showCertificates, setShowCertificates] = useState(() => window.location.hash === '#certificates')

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1500)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleHashChange = () => setShowCertificates(window.location.hash === '#certificates')
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  if (showCertificates) return <Certificates />

  return (
    <>
      <div className={`loader ${isLoading ? '' : 'loader--done'}`} aria-hidden="true">
        <div className="loader__mark">D<span>/</span>R</div>
        <div className="loader__line"><i /></div>
        <span className="loader__caption">building something useful</span>
      </div>

      <main className={`portfolio ${isLoading ? 'portfolio--waiting' : ''}`}>
        <header className="site-header">
          <a className="wordmark" href="#top" onClick={closeMenu}>DR<span>/</span>26</a>
          <nav className={menuOpen ? 'nav nav--open' : 'nav'} aria-label="Main navigation">
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#skills" onClick={closeMenu}>Skills</a>
            <a href="#work" onClick={closeMenu}>Featured build</a>
            <a href="#certificates" onClick={closeMenu}>Certificates <span className="arrow">↗</span></a>
            <a href="#contact" onClick={closeMenu}>Contact <span className="arrow">↗</span></a>
          </nav>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation"><span /><span /></button>
        </header>

        <section className="hero" id="top">
          <div className="hero__aside">B.Tech CSE (Core)<br />Software developer<br /><span>Andhra University / 2029</span></div>
          <div className="hero__heading"><p className="eyebrow">Hello, I&apos;m Dhanunjay.</p><h1>I build <em>bright</em><br />ideas into <span>products.</span></h1><p className="hero__role">AI & product builder · creative technologist</p></div>
          <figure className="hero__portrait"><img src={heroPhoto} alt="Dhanunjay at a university event" /><figcaption>the person behind the build</figcaption></figure>
          <div className="hero__stamp">✳<br /><small>curious mind<br />serious maker</small></div>
          <a className="scroll-cue" href="#about"><span>Scroll to explore</span><b>↓</b></a>
        </section>

        <section className="intro" id="about">
          <p className="section-label">A little context <span>— 01</span></p>
          <div className="intro__copy">
            <div className="intro__lead-wrap"><p className="intro__lead">I turn ambitious ideas into polished, real-world experiences.</p><figure className="portrait-card"><img src={profilePhoto} alt="Dhanunjay at a university event in Visakhapatnam" /><figcaption>creative technologist<br />visakhapatnam, india</figcaption></figure></div>
            <div className="intro__details"><p>I&apos;m a 2nd-year Computer Science student at Andhra University College of Engineering, exploring the space where AI, product thinking, and expressive interfaces meet.</p><p>I like shipping things that feel as good to use as they are clever under the hood.</p></div>
          </div>
        </section>

        <section className="skills" id="skills">
          <div className="work__header"><p className="section-label">What I work with <span>— 02</span></p><p className="work__note">Tools for turning<br />ideas into momentum.</p></div>
          <div className="skills__list">{skills.map(([category, items], index) => <div className="skill-row" key={category}><span className="skill-row__number">0{index + 1}</span><h2>{category}</h2><p>{items}</p></div>)}</div>
        </section>

        <section className="work" id="work">
          <div className="work__header"><p className="section-label">Featured build <span>— 03</span></p><p className="work__note">Smart India Hackathon<br />2026 / in progress</p></div>
          <article className="project project--coral"><div className="project__visual"><div className="project__orb" /><div className="project__label">plan the<br />journey</div><span className="project__number">01</span></div><div className="project__info"><p className="project__type">Virun / YatraSetu</p><h2>AI plans the journey. Locals make it authentic.</h2><p>An AI-powered tourism platform combining personalized itinerary generation with verified local expertise.</p><div className="project__tags"><span>AI product</span><span>Tourism</span><span>Hackathon 2026</span></div></div></article>
        </section>

        <section className="education"><p className="section-label">Currently learning <span>— 04</span></p><div className="education__grid"><div className="education__year">2025<br /><em>→</em><br />2029</div><div><p className="education__degree">Bachelor of Technology<br />Computer Science & Engineering (Core)</p><p className="education__school">Andhra University College of Engineering<br />Visakhapatnam</p></div><div className="education__score"><strong>8.44</strong><span>current CGPA / 10</span><small>2nd year</small></div></div></section>

        <footer className="footer" id="contact"><div className="footer__top"><span>Let&apos;s build the next thing.</span><span>© 2026 Dhanunjay Reddy</span></div><h2>Have an idea?<br /><em>Let&apos;s make it <span>real.</span></em></h2><a className="footer__email" href="mailto:dhanunjay905@gmail.com">dhanunjay905@gmail.com <span>↗</span></a><div className="footer__bottom"><span>Java / Python / AI / Product</span><span>Made with curiosity + care</span></div></footer>
      </main>
    </>
  )
}

export default App
