import { lazy, Suspense, useEffect, useState } from 'react'
import './App.css'
import profilePhoto from './assets/20251129_170634.jpg'
import heroPhoto from './assets/image.png'
import quizCertificate from './assets/WhatsApp Image 2026-08-06 at 19.13.23.jpeg'
import googleCertificate from './assets/Screenshot 2026-09-06 220049.png'
import hackapCertificate from './assets/WhatsApp Image 2026-09-06 at 22.15.57.jpeg'
import smartNationCertificate from './assets/WhatsApp Image 2026-09-06 at 22.28.26.jpeg'
import basicsCertificate from './assets/WhatsApp Image 2026-09-06 at 22.28.56.jpeg'
import aiExamsCertificate from './assets/WhatsApp Image 2026-09-06 at 22.29.10.jpeg'
import schoolPhoto from './assets/images.jpg'
import collegePhoto from './assets/mayuri-bhavan-sri-chaitanya-college--100-feet-road-vijayawada-colleges-11wdyb1zpq.avif'
import journeyVideo from './assets/Web_Video_new.mp4'
import andhraPhoto from './assets/main.jpg'
import iitPhoto from './assets/pressrelease01_09_2026_11_31.jpg'

const ThreeTopology = lazy(() => import('./ThreeTopology.jsx'))

const skills = [
  ['Programming', 'Java · Python'],
  ['Web & development', 'Next.js · TypeScript · JavaScript · Git & GitHub · VS Code'],
  ['AI & emerging tech', 'Generative AI · AI APIs · AI agents · RAG · AI-powered applications'],
  ['Product & design', 'UI/UX · Interactive web experiences · Product architecture · Rapid prototyping · Startup ideation'],
]

const certificates = [
  ['QuizOff 2026', quizCertificate, 'QuizOff 2026 certificate presented to Dhanunjay Reddy'],
  ['Google Student Ambassador Program', googleCertificate, 'Google Student Ambassador Program certificate presented to Dhanunjay Reddy'],
  ['HackAP Hackathon', hackapCertificate, 'HackAP Hackathon Special Mention certificate presented to Dhanunjay Reddy'],
  ['Towards Building a Smart Nation', smartNationCertificate, 'Internal Hackathon certificate for Towards Building a Smart Nation'],
  ['Back To Basics', basicsCertificate, 'IIT Madras Paradox 2026 workshop certificate for building an LLM from scratch'],
  ['Let AI Take Your Exams', aiExamsCertificate, 'IIT Madras Paradox 2026 workshop certificate for Let AI Take Your Exams'],
]

function ThemeToggle({ mode, onToggle }) {
  return <button className="theme-toggle" type="button" onClick={onToggle} aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}><span className="theme-toggle__icon">{mode === 'dark' ? '☼' : '☾'}</span><span>{mode === 'dark' ? 'Light mode' : 'Dark mode'}</span></button>
}

function VisualField({ mode }) {
  return <div className={`visual-field visual-field--${mode}`} aria-hidden="true">{mode === 'dark' ? <Suspense fallback={null}><ThreeTopology /></Suspense> : <div className="light-field__rings"><i /><i /><i /></div>}</div>
}

function CursorEffect() {
  useEffect(() => {
    const moveCursor = (event) => {
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`)
    }
    window.addEventListener('pointermove', moveCursor)
    return () => window.removeEventListener('pointermove', moveCursor)
  }, [])

  return <span className="page-cursor" aria-hidden="true" />
}

function PageHeader({ mode, onToggle }) {
  return <><CursorEffect /><header className="site-header"><a className="wordmark" href="#top">DR<span>/</span>26</a><ThemeToggle mode={mode} onToggle={onToggle} /></header></>
}

function Certificates({ mode, onToggle }) {
  return (
    <main className={`certificates-page page-theme--${mode}`}>
      <PageHeader mode={mode} onToggle={onToggle} />
      <a className="certificates-back certificates-back--floating" href="#top"><span>←</span> Back to portfolio</a>

      <section className="certificates-hero">
        <VisualField mode={mode} />
        <p className="section-label">A record of the journey <span>— 05</span></p>
        <div className="certificates-hero__content">
          <h1>My <em>certificates.</em></h1>
          <p>These are a few of my achievements, certificates, and moments worth remembering.</p>
        </div>
      </section>

      <section className="certificate-list" aria-label="Certificates and achievements">
        {certificates.map(([title, image, alt], index) => (
          <article className={`certificate-card ${index % 2 ? 'certificate-card--blue' : ''}`} key={title}>
            <div className="certificate-card__meta"><span>{String(index + 1).padStart(2, '0')}</span><span>{title}</span></div>
            <img src={image} alt={alt} />
          </article>
        ))}
      </section>

      <footer className="certificates-footer"><span>More milestones ahead.</span><a href="#top">Return home <span>↗</span></a></footer>
    </main>
  )
}

function Journey({ mode, onToggle }) {
  useEffect(() => {
    const revealItems = document.querySelectorAll('.journey-page .journey-step')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('journey-step--visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: .16 })
    revealItems.forEach((item) => observer.observe(item))

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <main className={`journey-page page-theme--${mode}`}>
      <PageHeader mode={mode} onToggle={onToggle} />
      <a className="certificates-back certificates-back--floating" href="#top"><span>←</span> Back to portfolio</a>

      <section className="journey-hero">
        <VisualField mode={mode} />
        <p className="section-label">The long way around <span>— 05</span></p>
        <div className="journey-hero__content">
          <h1>My <em>journey.</em></h1>
          <p>Yeah, that&apos;s my schooling journey, from 2007 to the things I&apos;m building today.</p>
        </div>
      </section>

      <section className="journey-timeline">
        <article className="journey-step journey-step--school">
          <div className="journey-step__year">2007<br /><em>→</em><br />2022</div>
          <div className="journey-step__copy">
            <p className="section-label">01 / Early years</p>
            <h2>DePaul School<br /><em>Ukkunagaram</em></h2>
            <p>I was born in 2007 and studied from second class through tenth class at DePaul School, Sector 8, Ukkunagaram, Visakhapatnam.</p>
            <a className="journey-link" href="https://depaulsvizag.com" target="_blank" rel="noreferrer">Visit DePaul School <span>↗</span></a>
          </div>
          <img src={schoolPhoto} alt="DePaul School campus in Visakhapatnam" />
        </article>

        <article className="journey-step journey-step--college">
          <img src={collegePhoto} alt="Mayuri Bhavan, Sri Chaitanya College in Vijayawada" />
          <div className="journey-step__copy">
            <p className="section-label">02 / Next chapter</p>
            <h2>Sree Chaitanya<br /><em>Vijayawada</em></h2>
            <p>After completing my tenth in 2022, I studied at Sree Chaitanya, Mayuri Bhavan, 100 Feet Road, Ganavaram, Vijayawada.</p>
          </div>
        </article>

        <article className="journey-step journey-step--university">
          <div className="journey-step__copy">
            <p className="section-label">03 / Right now</p>
            <h2>Andhra University<br /><em>CSE branch</em></h2>
            <p>I completed my B.Tech first year and now I&apos;m studying my second year in Computer Science and Engineering at Andhra University.</p>
            <a className="journey-link" href="https://www.andhrauniversity.edu.in" target="_blank" rel="noreferrer">Visit Andhra University <span>↗</span></a>
          </div>
          <div className="journey-video"><video controls preload="metadata" poster={andhraPhoto}><source src={journeyVideo} type="video/mp4" />Your browser does not support video playback.</video></div>
        </article>

        <article className="journey-step journey-step--iit">
          <div className="journey-step__year">BS<br /><em>→</em><br />Online</div>
          <div className="journey-step__copy">
            <p className="section-label">04 / Alongside</p>
            <h2>IIT Madras<br /><em>BS degree</em></h2>
            <p>Alongside university, I&apos;m pursuing a BS online degree at IIT Madras, which I&apos;m about to complete.</p>
          </div>
          <img src={iitPhoto} alt="Indian Institute of Technology Madras campus sign" />
        </article>
      </section>

      <footer className="certificates-footer"><span>Still learning. Still moving.</span><a href="#top">Return home <span>↗</span></a></footer>
    </main>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mode, setMode] = useState(() => window.localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light')
  const [showCertificates, setShowCertificates] = useState(() => window.location.hash === '#certificates')
  const [showJourney, setShowJourney] = useState(() => window.location.hash === '#journey')

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1500)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = mode
    window.localStorage.setItem('portfolio-theme', mode)
  }, [mode])

  useEffect(() => {
    const handleHashChange = () => {
      setShowCertificates(window.location.hash === '#certificates')
      setShowJourney(window.location.hash === '#journey')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const toggleTheme = () => setMode((currentMode) => currentMode === 'dark' ? 'light' : 'dark')

  if (showCertificates) return <Certificates mode={mode} onToggle={toggleTheme} />
  if (showJourney) return <Journey mode={mode} onToggle={toggleTheme} />

  return (
    <>
      <div className={`loader ${isLoading ? '' : 'loader--done'}`} aria-hidden="true">
        <div className="loader__mark">D<span>/</span>R</div>
        <div className="loader__line"><i /></div>
        <span className="loader__caption">building something useful</span>
      </div>

      <main className={`portfolio page-theme--${mode} ${isLoading ? 'portfolio--waiting' : ''}`}>
        <CursorEffect />
        <header className="site-header">
          <a className="wordmark" href="#top" onClick={closeMenu}>DR<span>/</span>26</a>
          <nav className={menuOpen ? 'nav nav--open' : 'nav'} aria-label="Main navigation">
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#skills" onClick={closeMenu}>Skills</a>
            <a href="#work" onClick={closeMenu}>Build</a>
            <a href="#certificates" onClick={closeMenu}>Certificates <span className="arrow">↗</span></a>
            <a href="#journey" onClick={closeMenu}>My Journey <span className="arrow">↗</span></a>
            <a href="#contact" onClick={closeMenu}>Contact <span className="arrow">↗</span></a>
          </nav>
          <ThemeToggle mode={mode} onToggle={toggleTheme} />
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
