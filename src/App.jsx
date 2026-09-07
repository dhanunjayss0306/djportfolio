import { useEffect, useState } from 'react'
import './App.css'
import { supabase } from './lib/supabase'
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

const defaultJourney = {
  intro: "Yeah, that's my schooling journey, from 2007 to the things I'm building today.",
  schoolTitle: 'DePaul School',
  schoolSubtitle: 'Ukkunagaram',
  schoolText: 'I was born in 2007 and studied from second class through tenth class at DePaul School, Sector 8, Ukkunagaram, Visakhapatnam.',
  collegeTitle: 'Sree Chaitanya',
  collegeSubtitle: 'Vijayawada',
  collegeText: 'After completing my tenth in 2022, I studied at Sree Chaitanya, Mayuri Bhavan, 100 Feet Road, Ganavaram, Vijayawada.',
  universityTitle: 'Andhra University',
  universitySubtitle: 'CSE branch',
  universityText: "I completed my B.Tech first year and now I'm studying my second year in Computer Science and Engineering at Andhra University.",
  iitTitle: 'IIT Madras',
  iitSubtitle: 'BS degree',
  iitText: "Alongside university, I'm pursuing a BS online degree at IIT Madras, which I'm about to complete.",
  schoolImage: schoolPhoto,
  collegeImage: collegePhoto,
  universityImage: andhraPhoto,
  iitImage: iitPhoto,
}

const defaultCertificateCopy = certificates.map(([title, image, alt], index) => ({ id: `certificate-${index + 1}`, title, image, alt }))

const defaultWork = [
  { id: 'portfolio', title: 'Dhanunjay Reddy Portfolio', description: 'A playful portfolio and content system for documenting AI, product, and creative technology work.', github_url: 'https://github.com/dhanunjayss0306/djportfolio', live_url: '', image_url: '', sort_order: 0 },
  { id: 'virun-yatasetu', title: 'Virun / YatraSetu', description: 'AI-powered tourism platform combining personalized itinerary generation with verified local expertise.', github_url: '', live_url: '', image_url: '', sort_order: 1 },
]

function readAdminStore(key, fallback) {
  try {
    const saved = window.localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

function AdminIcon() {
  return <a className="admin-icon" href="#admin" aria-label="Open admin portal" title="Admin portal"><span>✦</span></a>
}

function ThemeToggle({ mode, onToggle }) {
  return <button className="theme-toggle" type="button" onClick={onToggle} aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}><span className="theme-toggle__icon">{mode === 'dark' ? '☼' : '☾'}</span><span>{mode === 'dark' ? 'Light mode' : 'Dark mode'}</span></button>
}

function VisualField({ mode }) {
  return <div className={`visual-field visual-field--${mode}`} aria-hidden="true">{mode === 'dark' ? <div className="dark-field" /> : <div className="light-field__rings"><i /><i /><i /></div>}</div>
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
  return <><CursorEffect /><header className="site-header"><a className="wordmark" href="#top">DR<span>/</span>26</a><div className="header-tools"><ThemeToggle mode={mode} onToggle={onToggle} /><AdminIcon /></div></header></>
}

function Certificates({ mode, onToggle, certificateCopy }) {
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
        {certificateCopy.map(({ title, image, alt }, index) => (
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

function Journey({ mode, onToggle, journey }) {
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
          <p>{journey.intro}</p>
        </div>
      </section>

      <section className="journey-timeline">
        <article className="journey-step journey-step--school">
          <div className="journey-step__year">2007<br /><em>→</em><br />2022</div>
          <div className="journey-step__copy">
            <p className="section-label">01 / Early years</p>
            <h2>{journey.schoolTitle}<br /><em>{journey.schoolSubtitle}</em></h2>
            <p>{journey.schoolText}</p>
            <a className="journey-link" href="https://depaulsvizag.com" target="_blank" rel="noreferrer">Visit DePaul School <span>↗</span></a>
          </div>
          <img src={journey.schoolImage} alt="DePaul School campus in Visakhapatnam" />
        </article>

        <article className="journey-step journey-step--college">
          <img src={journey.collegeImage} alt="Mayuri Bhavan, Sri Chaitanya College in Vijayawada" />
          <div className="journey-step__copy">
            <p className="section-label">02 / Next chapter</p>
            <h2>{journey.collegeTitle}<br /><em>{journey.collegeSubtitle}</em></h2>
            <p>{journey.collegeText}</p>
          </div>
        </article>

        <article className="journey-step journey-step--university">
          <div className="journey-step__copy">
            <p className="section-label">03 / Right now</p>
            <h2>{journey.universityTitle}<br /><em>{journey.universitySubtitle}</em></h2>
            <p>{journey.universityText}</p>
            <a className="journey-link" href="https://www.andhrauniversity.edu.in" target="_blank" rel="noreferrer">Visit Andhra University <span>↗</span></a>
          </div>
          <div className="journey-video"><video controls preload="metadata" poster={journey.universityImage}><source src={journeyVideo} type="video/mp4" />Your browser does not support video playback.</video></div>
        </article>

        <article className="journey-step journey-step--iit">
          <div className="journey-step__year">BS<br /><em>→</em><br />Online</div>
          <div className="journey-step__copy">
            <p className="section-label">04 / Alongside</p>
            <h2>{journey.iitTitle}<br /><em>{journey.iitSubtitle}</em></h2>
            <p>{journey.iitText}</p>
            <a className="journey-link" href="https://study.iitm.ac.in/ds/" target="_blank" rel="noreferrer">Visit IIT Madras BS program <span>↗</span></a>
          </div>
          <img src={journey.iitImage} alt="Indian Institute of Technology Madras campus sign" />
        </article>
      </section>

      <footer className="certificates-footer"><span>Still learning. Still moving.</span><a href="#top">Return home <span>↗</span></a></footer>
    </main>
  )
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  const submit = async (event) => {
    event.preventDefault()
    if (!supabase) {
      setStatus('Supabase is not configured yet.')
      return
    }
    setSending(true)
    const { error } = await supabase.from('contact_submissions').insert(form)
    setSending(false)
    if (error) {
      setStatus('Could not send this yet. Please try again.')
      return
    }
    await supabase.functions.invoke('notify-contact', { body: form })
    setForm({ name: '', email: '', phone: '', service: '', message: '' })
    setStatus('Message received. I’ll get back to you soon.')
  }

  return <section className="contact-section" id="contact"><div className="contact-section__heading"><p className="section-label">Contact Dhanunjay <span>— 05</span></p><h2>Tell me what<br /><em>you&apos;re building.</em></h2></div><form className="contact-form" onSubmit={submit}><label><span>Your name</span><input required value={form.name} onChange={(event) => update('name', event.target.value)} /></label><label><span>Email address</span><input required type="email" value={form.email} onChange={(event) => update('email', event.target.value)} /></label><label><span>Phone number</span><input required type="tel" value={form.phone} onChange={(event) => update('phone', event.target.value)} /></label><label><span>What do you need?</span><select required value={form.service} onChange={(event) => update('service', event.target.value)}><option value="">Choose a service</option><option>Website</option><option>AI agent</option><option>AI-powered product</option><option>Creative technology</option><option>Something else</option></select></label><label className="contact-form__message"><span>Briefly tell me about it</span><textarea rows="4" value={form.message} onChange={(event) => update('message', event.target.value)} /></label><button className="admin-submit" type="submit" disabled={sending}>{sending ? 'Sending...' : 'Send enquiry'} <span>↗</span></button>{status && <p className="admin-notice">{status}</p>}</form></section>
}

function MyWork({ mode, onToggle, work }) {
  return <main className={`work-page page-theme--${mode}`}><PageHeader mode={mode} onToggle={onToggle} /><a className="certificates-back certificates-back--floating" href="#top"><span>←</span> Back to portfolio</a><section className="work-page__hero"><VisualField mode={mode} /><p className="section-label">Things I&apos;ve shipped <span>— 06</span></p><div className="work-page__content"><h1>My <em>work.</em></h1><p>Experiments, products, and useful things made from a mix of code and curiosity.</p></div></section><section className="work-page__list">{work.map((item, index) => <article className="work-item" key={item.id}><div className="work-item__number">{String(index + 1).padStart(2, '0')}</div><div><p className="project__type">Selected build</p><h2>{item.title}</h2><p>{item.description}</p></div><div className="work-item__links">{item.github_url && <a href={item.github_url} target="_blank" rel="noreferrer">GitHub <span>↗</span></a>}{item.live_url && <a href={item.live_url} target="_blank" rel="noreferrer">Live link <span>↗</span></a>}</div></article>)}</section><ContactForm /></main>
}

function AdminField({ label, value, onChange, multiline = false }) {
  const Input = multiline ? 'textarea' : 'input'
  return <label className="admin-field"><span>{label}</span><Input value={value} onChange={(event) => onChange(event.target.value)} rows={multiline ? 4 : undefined} /></label>
}

function AdminPortal({ mode, onToggle, journey, setJourney, certificateCopy, setCertificateCopy }) {
  const [authenticated, setAuthenticated] = useState(() => window.sessionStorage.getItem('portfolio-admin-auth') === 'true')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState('journey')
  const [notice, setNotice] = useState('')

  const login = async (event) => {
    event.preventDefault()
    if (supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email: username, password })
      if (error) {
        setNotice('Use the admin email and password created in Supabase Auth.')
        return
      }
      window.sessionStorage.setItem('portfolio-admin-auth', 'true')
      setAuthenticated(true)
      setNotice('Welcome back. Your editable content is ready.')
    } else if (username === 'dhanunjay' && password === 'admin2026') {
      window.sessionStorage.setItem('portfolio-admin-auth', 'true')
      setAuthenticated(true)
      setNotice('Welcome back. Your editable content is ready.')
    } else {
      setNotice('That username or password does not match.')
    }
  }

  const saveJourney = async () => {
    window.localStorage.setItem('portfolio-journey', JSON.stringify(journey))
    if (supabase) {
      const { error } = await supabase.from('journey_content').upsert({ id: 'main', intro: journey.intro, school_title: journey.schoolTitle, school_subtitle: journey.schoolSubtitle, school_text: journey.schoolText, school_image: journey.schoolImage, college_title: journey.collegeTitle, college_subtitle: journey.collegeSubtitle, college_text: journey.collegeText, college_image: journey.collegeImage, university_title: journey.universityTitle, university_subtitle: journey.universitySubtitle, university_text: journey.universityText, university_image: journey.universityImage, iit_title: journey.iitTitle, iit_subtitle: journey.iitSubtitle, iit_text: journey.iitText, iit_image: journey.iitImage })
      setNotice(error ? 'Saved locally. Supabase sync needs an authenticated admin.' : 'Journey changes saved to Supabase.')
      return
    }
    setNotice('Journey changes saved on this device.')
  }

  const saveCertificates = async () => {
    window.localStorage.setItem('portfolio-certificates', JSON.stringify(certificateCopy))
    if (supabase) {
      const { error } = await supabase.from('certificates').upsert(certificateCopy.map(({ id, title, image, alt }, index) => ({ id, title, image_url: image, alt_text: alt, sort_order: index, is_published: true })))
      setNotice(error ? 'Saved locally. Supabase sync needs an authenticated admin.' : 'Certificate changes saved to Supabase.')
      return
    }
    setNotice('Certificate changes saved on this device.')
  }

  const updateCertificate = (index, field, value) => {
    setCertificateCopy((current) => current.map((certificate, certificateIndex) => certificateIndex === index ? { ...certificate, [field]: value } : certificate))
  }

  const uploadCertificate = (index, file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => updateCertificate(index, 'image', reader.result)
    reader.readAsDataURL(file)
  }

  const uploadJourneyImage = (key, file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setJourney((current) => ({ ...current, [`${key}Image`]: reader.result }))
    reader.readAsDataURL(file)
  }

  if (!authenticated) {
    return <main className={`admin-page page-theme--${mode}`}><PageHeader mode={mode} onToggle={onToggle} /><section className="admin-login"><div className="admin-login__mark">DR<span>/</span>26</div><p className="section-label">Private workspace</p><h1>Admin <em>portal.</em></h1><p>Update the parts of your portfolio that people see. Changes stay in this browser until you publish them to your live data source.</p><form onSubmit={login}><AdminField label="Admin email" value={username} onChange={setUsername} /><AdminField label="Password" value={password} onChange={setPassword} /><button className="admin-submit" type="submit">Enter portal <span>↗</span></button></form>{notice && <p className="admin-notice">{notice}</p>}</section></main>
  }

  return <main className={`admin-page page-theme--${mode}`}><PageHeader mode={mode} onToggle={onToggle} /><section className="admin-shell"><div className="admin-shell__top"><div><p className="section-label">Content control room</p><h1>Admin <em>portal.</em></h1></div><button className="admin-logout" onClick={() => { window.sessionStorage.removeItem('portfolio-admin-auth'); setAuthenticated(false) }}>Log out</button></div><p className="admin-intro">Only the editable content is here. Update a field, save it, and refresh the public page to see the result.</p><div className="admin-tabs"><button className={activeTab === 'journey' ? 'is-active' : ''} onClick={() => setActiveTab('journey')}>My Journey</button><button className={activeTab === 'certificates' ? 'is-active' : ''} onClick={() => setActiveTab('certificates')}>My Certificates</button></div>{activeTab === 'journey' ? <div className="admin-panel"><div className="admin-panel__heading"><div><p className="section-label">Journey editor</p><h2>Shape the story.</h2></div><button className="admin-save" onClick={saveJourney}>Save journey</button></div><AdminField label="Intro text" value={journey.intro} onChange={(value) => setJourney({ ...journey, intro: value })} multiline /><div className="admin-editor-grid">{[['school', 'Early years'], ['college', 'Next chapter'], ['university', 'Right now'], ['iit', 'Alongside']].map(([key, label]) => <div className="admin-card" key={key}><p className="admin-card__label">{label}</p><img className="admin-journey-image" src={journey[`${key}Image`]} alt="" /><label className="admin-upload">Change photo<input type="file" accept="image/*" onChange={(event) => uploadJourneyImage(key, event.target.files[0])} /></label><AdminField label="Title" value={journey[`${key}Title`]} onChange={(value) => setJourney({ ...journey, [`${key}Title`]: value })} /><AdminField label="Subtitle" value={journey[`${key}Subtitle`]} onChange={(value) => setJourney({ ...journey, [`${key}Subtitle`]: value })} /><AdminField label="Story" value={journey[`${key}Text`]} onChange={(value) => setJourney({ ...journey, [`${key}Text`]: value })} multiline /></div>)}</div></div> : <div className="admin-panel"><div className="admin-panel__heading"><div><p className="section-label">Certificate editor</p><h2>Keep the proof.</h2></div><button className="admin-save" onClick={saveCertificates}>Save certificates</button></div><div className="admin-certificate-grid">{certificateCopy.map((certificate, index) => <div className="admin-card admin-certificate-card" key={`${certificate.title}-${index}`}><img src={certificate.image} alt="" /><label className="admin-upload">Change photo<input type="file" accept="image/*" onChange={(event) => uploadCertificate(index, event.target.files[0])} /></label><AdminField label="Certificate title" value={certificate.title} onChange={(value) => updateCertificate(index, 'title', value)} /><AdminField label="Accessible description" value={certificate.alt} onChange={(value) => updateCertificate(index, 'alt', value)} multiline /></div>)}</div></div>}{notice && <p className="admin-notice">{notice}</p>}</section></main>
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mode, setMode] = useState(() => window.localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light')
  const [showCertificates, setShowCertificates] = useState(() => window.location.hash === '#certificates')
  const [showJourney, setShowJourney] = useState(() => window.location.hash === '#journey')
  const [showWork, setShowWork] = useState(() => window.location.hash === '#my-work')
  const [showAdmin, setShowAdmin] = useState(() => window.location.hash === '#admin')
  const [journey, setJourney] = useState(() => ({ ...defaultJourney, ...readAdminStore('portfolio-journey', {}) }))
  const [certificateCopy, setCertificateCopy] = useState(() => readAdminStore('portfolio-certificates', defaultCertificateCopy))
  const [work, setWork] = useState(() => readAdminStore('portfolio-work', defaultWork))

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
      setShowWork(window.location.hash === '#my-work')
      setShowAdmin(window.location.hash === '#admin')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    if (!supabase) return
    const loadRemoteContent = async () => {
      const [{ data: remoteJourney }, { data: remoteCertificates }, { data: remoteWork }] = await Promise.all([
        supabase.from('journey_content').select('*').eq('id', 'main').maybeSingle(),
        supabase.from('certificates').select('*').eq('is_published', true).order('sort_order'),
        supabase.from('work_items').select('*').eq('is_published', true).order('sort_order'),
      ])
      if (remoteJourney) setJourney({ ...defaultJourney, intro: remoteJourney.intro, schoolTitle: remoteJourney.school_title, schoolSubtitle: remoteJourney.school_subtitle, schoolText: remoteJourney.school_text, schoolImage: remoteJourney.school_image || defaultJourney.schoolImage, collegeTitle: remoteJourney.college_title, collegeSubtitle: remoteJourney.college_subtitle, collegeText: remoteJourney.college_text, collegeImage: remoteJourney.college_image || defaultJourney.collegeImage, universityTitle: remoteJourney.university_title, universitySubtitle: remoteJourney.university_subtitle, universityText: remoteJourney.university_text, universityImage: remoteJourney.university_image || defaultJourney.universityImage, iitTitle: remoteJourney.iit_title, iitSubtitle: remoteJourney.iit_subtitle, iitText: remoteJourney.iit_text, iitImage: remoteJourney.iit_image || defaultJourney.iitImage })
      if (remoteCertificates?.length) setCertificateCopy(remoteCertificates.map(({ id, title, image_url: image, alt_text: alt }) => ({ id, title, image: image || defaultCertificateCopy.find((item) => item.id === id)?.image || '', alt })))
      if (remoteWork?.length) setWork(remoteWork)
    }
    loadRemoteContent()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const toggleTheme = () => setMode((currentMode) => currentMode === 'dark' ? 'light' : 'dark')

  if (showCertificates) return <Certificates mode={mode} onToggle={toggleTheme} certificateCopy={certificateCopy} />
  if (showJourney) return <Journey mode={mode} onToggle={toggleTheme} journey={journey} />
  if (showWork) return <MyWork mode={mode} onToggle={toggleTheme} work={work} />
  if (showAdmin) return <AdminPortal mode={mode} onToggle={toggleTheme} journey={journey} setJourney={setJourney} certificateCopy={certificateCopy} setCertificateCopy={setCertificateCopy} />

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
            <a href="#my-work" onClick={closeMenu}>My Work <span className="arrow">↗</span></a>
            <a href="#certificates" onClick={closeMenu}>Certificates <span className="arrow">↗</span></a>
            <a href="#journey" onClick={closeMenu}>My Journey <span className="arrow">↗</span></a>
            <a href="#contact" onClick={closeMenu}>Contact <span className="arrow">↗</span></a>
          </nav>
          <ThemeToggle mode={mode} onToggle={toggleTheme} />
          <AdminIcon />
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

        <ContactForm />

        <footer className="footer" id="contact"><div className="footer__top"><span>Let&apos;s build the next thing.</span><span>© 2026 Dhanunjay Reddy</span></div><h2>Have an idea?<br /><em>Let&apos;s make it <span>real.</span></em></h2><a className="footer__email" href="mailto:dhanunjay905@gmail.com">dhanunjay905@gmail.com <span>↗</span></a><div className="footer__bottom"><span>Java / Python / AI / Product</span><span>Made with curiosity + care</span></div></footer>
      </main>
    </>
  )
}

export default App
