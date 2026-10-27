import { useEffect, useRef, useState } from 'react'
import './App.css'
import { supabase } from './lib/supabase'
import profilePhoto from './assets/20251129_170634.jpg'
import heroTopPhoto from './assets/hero-top-photo.jpg'
import pushingCartoon from './assets/cartoon-pushing-transparent.png'
import skillProgramming from './assets/skill-programming.jpg'
import skillWeb from './assets/skill-web.jpg'
import skillAi from './assets/skill-ai.jpg'
import skillProduct from './assets/skill-product.jpg'
import workVirun from './assets/work-virun.jpg'
import workPersona from './assets/work-persona.jpg'
import workQuantum from './assets/work-quantum.jpg'
import workVrgym from './assets/work-vrgym.jpg'
import workSasyasakhi from './assets/work-sasyasakhi.jpg'
import workPortfolio from './assets/work-portfolio.jpg'
import workSuren from './assets/work-suren.jpg'
import workSapss from './assets/work-sapss.jpg'
import workHackerrank from './assets/work-hackerrank.jpg'
import workGlobaltap from './assets/work-globaltap.jpg'
import logoDj from './assets/logo-dj.jpg'
import { projectDetails } from './projectDetails.js'
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
  { id: 'portfolio', title: 'Dhanunjay Reddy Portfolio', description: 'A playful portfolio and content system for documenting AI, product, and creative technology work.', github_url: 'https://github.com/dhanunjayss0306/djportfolio', live_url: 'https://djportfolio1.vercel.app', image_url: workPortfolio, sort_order: 0 },
  { id: 'sasyasakhi', title: 'SasyaSakhi', description: 'AI farming assistant for Indian farmers, in Telugu and English: soil report, crop suitability for paddy, cotton and chilli, fertilizer doses, weather and crop calendar. Team Footprints, AgriTech Summit 2026.', github_url: 'https://github.com/dhanunjayss0306/SasyaSakhi', live_url: '', image_url: workSasyasakhi, sort_order: 1, status: 'Hackathon prototype' },
  { id: 'virun', title: 'Virun', description: 'AI-powered tourism marketplace combining personalized itineraries with verified local expertise.', github_url: 'https://github.com/KinGMssN/virun', live_url: 'https://kingmssn.github.io/virun/', image_url: workVirun, sort_order: 2, status: 'Hackathon build' },
  { id: 'vr-fitness-gym', title: 'VR Fitness Gym', description: 'Website for VR Fitness Gym in Visakhapatnam, with static, dynamic and dynamic-plus-AI options explained for the gym owner.', github_url: '', live_url: '', image_url: workVrgym, sort_order: 3, status: 'Client website' },
  { id: 'persona', title: 'Persona', description: 'Personal reminder and planner app: calendar, voice-to-calendar, journal, reminders, group tasks and a personal AI from your own data.', github_url: 'https://github.com/dhanunjayss0306/Persona-', live_url: 'https://dhanunjayss0306.github.io/Persona-/', image_url: workPersona, sort_order: 4, status: 'Fullstack app' },
  { id: 'global-tap', title: 'Global Tap', description: 'Fintech and travel app build, with backend and frontend work in progress.', github_url: 'https://github.com/amruthalakshmipeddireddy-max/Global-Tap', live_url: '', image_url: workGlobaltap, sort_order: 5, status: 'In progress' },
  { id: 'quantum-routing', title: 'Quantum Geometry Routing', description: 'Hackathon build for quantum geometry routing, with a live frontend and backend.', github_url: 'https://github.com/dhanunjayss0306/quantum-geometry-routing', live_url: 'https://quantum-geometry-routing.pages.dev', image_url: workQuantum, sort_order: 6, status: 'Hackathon build' },
  { id: 'sapss', title: 'SAPSS', description: 'Smart and Automated Public Sanitation System for the Vishwakarma Awards 2026-27 Stage 2, team lead. IoT event-driven auto-cleaning concept for high-traffic public toilets.', github_url: '', live_url: '', image_url: workSapss, sort_order: 7, status: 'Vishwakarma Stage 2' },
  { id: 'hackerrank-audit', title: 'HackerRank Ghost Data Audit', description: 'Deterministic deletion-audit agent for HackerRank Orchestrate, checking ghost data across cases.', github_url: 'https://github.com/dhanunjayss0306/HackerRank-Ghost-Data-Audit', live_url: '', image_url: workHackerrank, sort_order: 8, status: 'Hackathon build' },
  { id: 'suren-pastries', title: 'Suren Pastries', description: 'A completed pastry ordering website with accounts and ordering flows. Security checks, deployment, and payment integration are still being finalized while testing continues.', github_url: '', live_url: 'https://suren-pastries-754v.onrender.com/home', image_url: workSuren, sort_order: 9, status: 'Completed · testing' },
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

function VisualField({ mode }) {
  return <div className={`visual-field visual-field--${mode}`} aria-hidden="true">{mode === 'dark' ? <div className="dark-field" /> : <div className="light-field__rings"><i /><i /><i /></div>}</div>
}

function LogoCube() {
  const [flipped, setFlipped] = useState(false)
  const goHome = () => { window.location.hash = '#top'; window.scrollTo({ top: 0, behavior: 'smooth' }) }
  return <button className="logo-cube" type="button" aria-label="DJ logo, click to rotate, double-click to go home" title="DJ logo: click to rotate, double-click to go home" onClick={() => setFlipped(!flipped)} onDoubleClick={(e) => { e.preventDefault(); goHome() }}><span className={flipped ? 'logo-cube__inner logo-cube__inner--flipped' : 'logo-cube__inner'}><span className="logo-cube__face logo-cube__face--front"><img src={logoDj} alt="DJ cartoon logo" /></span><span className="logo-cube__face logo-cube__face--back">DJ</span></span></button>
}

function PageHeader() {
  return <header className="site-header"><LogoCube /><div className="header-tools"><SocialLinks /><AdminIcon /></div></header>
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

      {(journey.extraStages || []).map((stage, index) => <article className="journey-step" key={stage.title + index}><div className="journey-step__copy"><p className="section-label">{String(index + 5).padStart(2, '0')} / Added</p><h2>{stage.title}<br /><em>{stage.subtitle}</em></h2><p>{stage.text}</p></div>{stage.image && <img src={stage.image} alt={stage.alt || stage.title} />}</article>)}
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
  return <main className={`work-page page-theme--${mode}`}><PageHeader mode={mode} onToggle={onToggle} /><a className="certificates-back certificates-back--floating" href="#top"><span>←</span> Back to portfolio</a><section className="work-page__hero"><VisualField mode={mode} /><p className="section-label">Things I&apos;ve shipped <span>— 06</span></p><div className="work-page__content"><h1>My <em>work.</em></h1><p>Experiments, products, and useful things made from a mix of code and curiosity.</p></div></section><section className="work-page__list">{work.map((item, index) => <article className="work-item" key={item.id}><div className="work-item__number">{String(index + 1).padStart(2, '0')}</div><div><p className="project__type">{item.status || 'Selected build'}</p><h2>{item.title}</h2><p>{item.description}</p></div><div className="work-item__links">{item.github_url && <a href={item.github_url} target="_blank" rel="noreferrer">GitHub <span>↗</span></a>}{item.live_url && <a href={item.live_url} target="_blank" rel="noreferrer">Open project <span>↗</span></a>}</div></article>)}</section><ContactForm /></main>
}

function AdminField({ label, value, onChange, multiline = false }) {
  const Input = multiline ? 'textarea' : 'input'
  return <label className="admin-field"><span>{label}</span><Input value={value} onChange={(event) => onChange(event.target.value)} rows={multiline ? 4 : undefined} /></label>
}

function AdminPortal({ mode, onToggle, journey, setJourney, certificateCopy, setCertificateCopy, work, setWork }) {
  const [authenticated, setAuthenticated] = useState(() => window.sessionStorage.getItem('portfolio-admin-auth') === 'true')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState('journey')
  const [removedCertIds, setRemovedCertIds] = useState([])
  const [removedWorkIds, setRemovedWorkIds] = useState([])
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
    } else if (username === 'dhanunjayss1122' && password === 'ammudhanu') {
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
      if (!error && journey.extraStages?.length) { try { await supabase.from('journey_content').update({ extra_stages: JSON.stringify(journey.extraStages) }).eq('id', 'main') } catch {} }
      setNotice(error ? 'Saved locally. Supabase sync needs an authenticated admin.' : 'Journey changes saved to Supabase.')
      return
    }
    setNotice('Journey changes saved on this device.')
  }

  const saveCertificates = async () => {
    window.localStorage.setItem('portfolio-certificates', JSON.stringify(certificateCopy))
    if (supabase) {
      const { error } = await supabase.from('certificates').upsert(certificateCopy.map(({ id, title, image, alt }, index) => ({ id, title, image_url: image, alt_text: alt, sort_order: index, is_published: true })))
      if (!error && removedCertIds.length) { await supabase.from('certificates').update({ is_published: false }).in('id', removedCertIds); setRemovedCertIds([]) }
      setNotice(error ? 'Saved locally. Supabase sync needs an authenticated admin.' : 'Certificate changes saved to Supabase.')
      return
    }
    setNotice('Certificate changes saved on this device.')
  }


  const saveWork = async () => {
    window.localStorage.setItem('portfolio-work', JSON.stringify(work))
    if (supabase) {
      const rows = work.map((item, index) => ({ id: item.id, title: item.title, description: item.description || '', github_url: item.github_url || '', live_url: item.live_url || '', image_url: item.image_url || '', status: item.status || '', sort_order: item.sort_order ?? index, is_published: true }))
      let { error } = await supabase.from('work_items').upsert(rows)
      if (error) {
        const retry = await supabase.from('work_items').upsert(rows.map(({ status, ...rest }) => rest))
        error = retry.error
      }
      if (!error && removedWorkIds.length) { await supabase.from('work_items').update({ is_published: false }).in('id', removedWorkIds); setRemovedWorkIds([]) }
      setNotice(error ? 'Saved locally. Supabase sync needs an authenticated admin.' : 'Project changes saved to Supabase.')
      return
    }
    setNotice('Project changes saved on this device.')
  }

  const addCertificate = () => setCertificateCopy((current) => [...current, { id: `certificate-${Date.now()}`, title: 'New certificate', image: '', alt: '' }])
  const removeCertificate = (index) => setCertificateCopy((current) => { const removed = current[index]; if (removed?.id) setRemovedCertIds((prev) => [...prev, removed.id]); return current.filter((_, i) => i !== index) })
  const updateWork = (index, field, value) => setWork((current) => current.map((item, i) => i === index ? { ...item, [field]: value } : item))
  const addWork = () => setWork((current) => [...current, { id: `project-${Date.now()}`, title: 'New project', description: '', github_url: '', live_url: '', image_url: '', status: '', sort_order: current.length }])
  const removeWork = (index) => setWork((current) => { const removed = current[index]; if (removed?.id) setRemovedWorkIds((prev) => [...prev, removed.id]); return current.filter((_, i) => i !== index).map((item, i) => ({ ...item, sort_order: i })) })
  const uploadWorkImage = (index, file) => { if (!file) return; const reader = new FileReader(); reader.onload = () => updateWork(index, 'image_url', reader.result); reader.readAsDataURL(file) }
  const extraStages = journey.extraStages || []
  const addJourneyStage = () => setJourney((current) => ({ ...current, extraStages: [...(current.extraStages || []), { title: 'New journey entry', subtitle: '', text: '', image: '', alt: '' }] }))
  const updateJourneyStage = (index, field, value) => setJourney((current) => ({ ...current, extraStages: (current.extraStages || []).map((stage, i) => i === index ? { ...stage, [field]: value } : stage) }))
  const removeJourneyStage = (index) => setJourney((current) => ({ ...current, extraStages: (current.extraStages || []).filter((_, i) => i !== index) }))
  const uploadJourneyStageImage = (index, file) => { if (!file) return; const reader = new FileReader(); reader.onload = () => updateJourneyStage(index, 'image', reader.result); reader.readAsDataURL(file) }

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

  return <main className={`admin-page page-theme--${mode}`}><PageHeader mode={mode} onToggle={onToggle} /><section className="admin-shell"><div className="admin-shell__top"><div><p className="section-label">Content control room</p><h1>Admin <em>portal.</em></h1></div><button className="admin-logout" onClick={() => { window.sessionStorage.removeItem('portfolio-admin-auth'); setAuthenticated(false) }}>Log out</button></div><p className="admin-intro">Only the editable content is here. Update a field, save it, and refresh the public page to see the result. Add buttons create a new item, then fill it and save.</p><div className="admin-tabs"><button className={activeTab === 'journey' ? 'is-active' : ''} onClick={() => setActiveTab('journey')}>My Journey</button><button className={activeTab === 'certificates' ? 'is-active' : ''} onClick={() => setActiveTab('certificates')}>My Certificates</button><button className={activeTab === 'projects' ? 'is-active' : ''} onClick={() => setActiveTab('projects')}>Projects</button></div>
  {activeTab === 'journey' ? <div className="admin-panel"><div className="admin-panel__heading"><div><p className="section-label">Journey editor</p><h2>Shape the story.</h2></div><button className="admin-save" onClick={saveJourney}>Save journey</button></div><AdminField label="Intro text" value={journey.intro} onChange={(value) => setJourney({ ...journey, intro: value })} multiline /><div className="admin-editor-grid">{[['school', 'Early years'], ['college', 'Next chapter'], ['university', 'Right now'], ['iit', 'Alongside']].map(([key, label]) => <div className="admin-card" key={key}><p className="admin-card__label">{label}</p><img className="admin-journey-image" src={journey[`${key}Image`]} alt="" /><label className="admin-upload">Change photo<input type="file" accept="image/*" onChange={(event) => uploadJourneyImage(key, event.target.files[0])} /></label><AdminField label="Title" value={journey[`${key}Title`]} onChange={(value) => setJourney({ ...journey, [`${key}Title`]: value })} /><AdminField label="Subtitle" value={journey[`${key}Subtitle`]} onChange={(value) => setJourney({ ...journey, [`${key}Subtitle`]: value })} /><AdminField label="Story" value={journey[`${key}Text`]} onChange={(value) => setJourney({ ...journey, [`${key}Text`]: value })} multiline /></div>)}</div><div className="admin-panel__heading"><div><p className="section-label">Extra journey entries</p><h2>Add to my journey.</h2></div><button className="admin-add" type="button" onClick={addJourneyStage}>+ Add journey entry</button></div><p className="admin-intro">Extra entries appear after the 4 main chapters, on the Journey page and on home. They save on this device, and sync to Supabase if the journey table has an extra-stages field.</p><div className="admin-editor-grid">{extraStages.map((stage, index) => <div className="admin-card" key={stage.title + index}><p className="admin-card__label">Entry {index + 5}</p>{stage.image && <img className="admin-journey-image" src={stage.image} alt="" />}<label className="admin-upload">Upload photo<input type="file" accept="image/*" onChange={(event) => uploadJourneyStageImage(index, event.target.files[0])} /></label><AdminField label="Title" value={stage.title} onChange={(value) => updateJourneyStage(index, 'title', value)} /><AdminField label="Subtitle" value={stage.subtitle} onChange={(value) => updateJourneyStage(index, 'subtitle', value)} /><AdminField label="Story" value={stage.text} onChange={(value) => updateJourneyStage(index, 'text', value)} multiline /><button className="admin-remove" type="button" onClick={() => removeJourneyStage(index)}>Remove entry</button></div>)}</div></div>
  : activeTab === 'certificates' ? <div className="admin-panel"><div className="admin-panel__heading"><div><p className="section-label">Certificate editor</p><h2>Keep the proof.</h2></div><div><button className="admin-add" type="button" onClick={addCertificate}>+ Add certificate</button> <button className="admin-save" onClick={saveCertificates}>Save certificates</button></div></div><div className="admin-certificate-grid">{certificateCopy.map((certificate, index) => <div className="admin-card admin-certificate-card" key={`${certificate.title}-${index}`}><img src={certificate.image} alt="" /><label className="admin-upload">Change photo<input type="file" accept="image/*" onChange={(event) => uploadCertificate(index, event.target.files[0])} /></label><AdminField label="Certificate title" value={certificate.title} onChange={(value) => updateCertificate(index, 'title', value)} /><AdminField label="Accessible description" value={certificate.alt} onChange={(value) => updateCertificate(index, 'alt', value)} multiline /><button className="admin-remove" type="button" onClick={() => removeCertificate(index)}>Remove certificate</button></div>)}</div></div>
  : <div className="admin-panel"><div className="admin-panel__heading"><div><p className="section-label">Project editor</p><h2>What you shipped.</h2></div><div><button className="admin-add" type="button" onClick={addWork}>+ Add project</button> <button className="admin-save" onClick={saveWork}>Save projects</button></div></div><p className="admin-intro">Projects saved here appear in Work, in My Work, and in project details after refresh. If Supabase is connected, they save there too, so they show for every visitor.</p><div className="admin-certificate-grid">{work.map((item, index) => <div className="admin-card admin-certificate-card" key={item.id}><img src={item.image_url} alt="" /><label className="admin-upload">Upload photo<input type="file" accept="image/*" onChange={(event) => uploadWorkImage(index, event.target.files[0])} /></label><AdminField label="Project title" value={item.title} onChange={(value) => updateWork(index, 'title', value)} /><AdminField label="Role / Type" value={item.status || ''} onChange={(value) => updateWork(index, 'status', value)} /><AdminField label="Description" value={item.description} onChange={(value) => updateWork(index, 'description', value)} multiline /><AdminField label="GitHub URL" value={item.github_url || ''} onChange={(value) => updateWork(index, 'github_url', value)} /><AdminField label="Live URL" value={item.live_url || ''} onChange={(value) => updateWork(index, 'live_url', value)} /><button className="admin-remove" type="button" onClick={() => removeWork(index)}>Remove project</button></div>)}</div></div>}
  {notice && <p className="admin-notice">{notice}</p>}</section></main>
}

const SOCIAL_LINKS = [
  ['LinkedIn', 'https://www.linkedin.com/in/p-v-n-dhanunjay-reddy-198162365'],
  ['GitHub', 'https://github.com/dhanunjayss0306'],
  ['Instagram', 'https://www.instagram.com/dhanunjayss1122'],
]

function SocialLinks() {
  return <div className="social-links">{SOCIAL_LINKS.map(([label, url]) => <a key={label} href={url} target="_blank" rel="noreferrer">{label} <span>↗</span></a>)}</div>
}

function AboutModal({ onClose }) {
  return <div className="modal" onClick={onClose}><div className="modal__panel" onClick={(event) => event.stopPropagation()}><button className="modal__close" type="button" onClick={onClose} aria-label="Close">×</button><h2>About<em>.</em></h2><img className="modal__photo" src={profilePhoto} alt="Dhanunjay in Visakhapatnam" /><p><strong>Hello, I am Dhanunjay, 18. I turn ambitious ideas into polished, real-world experiences.</strong></p><p>I&apos;m a 2nd-year Computer Science student at Andhra University College of Engineering, exploring the space where AI, product thinking, and expressive interfaces meet.</p><p>I like shipping things that feel as good to use as they are clever under the hood.</p><p><strong>B.Tech CSE · Andhra University · CGPA 8.44 · 2nd year</strong></p></div></div>
}

function ContactModal({ onClose }) {
  return <div className="modal" onClick={onClose}><div className="modal__panel" onClick={(event) => event.stopPropagation()}><button className="modal__close" type="button" onClick={onClose} aria-label="Close">×</button><h2>Contact<em>.</em></h2><p>Tell me what you&apos;re building.</p><a className="modal__email" href="mailto:dhanunjay905@gmail.com">dhanunjay905@gmail.com <span>↗</span></a><SocialLinks /><p className="modal__note"><a href="#contact" onClick={onClose}>Or use the form below ↓</a></p></div></div>
}

function ISTClock() {
  const [now, setNow] = useState('')
  useEffect(() => {
    const tick = () => setNow(new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date()))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])
  return <span className="ist-clock">Visakhapatnam, IST {now}</span>
}

function WorkCarousel({ work, onFocus, onOpen }) {
  const sectionRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const count = work.length
  const focused = count ? Math.min(count - 1, Math.max(0, Math.round(progress * (count - 1)))) : 0
  useEffect(() => { onFocus(focused) }, [focused, onFocus])
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  useEffect(() => {
    if (reduced || !sectionRef.current) return
    let raf = 0
    const update = () => {
      const section = sectionRef.current
      if (!section) return
      const total = section.offsetHeight - window.innerHeight
      const p = total > 0 ? Math.min(1, Math.max(0, -section.getBoundingClientRect().top / total)) : 0
      setProgress((current) => Math.abs(current - p) < 0.001 ? current : p)
    }
    const onScroll = () => { if (!raf) raf = window.requestAnimationFrame(() => { raf = 0; update() }) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [reduced])
  const scrollToProject = (index) => {
    const section = sectionRef.current
    if (!section || count < 2) return
    const target = section.offsetTop + (index / (count - 1)) * (section.offsetHeight - window.innerHeight)
    window.scrollTo({ top: target, behavior: reduced ? 'auto' : 'smooth' })
  }
  if (reduced) {
    return <section className="work-stacked" id="work" aria-label="My work"><p className="section-label">Selected work <span>— {String(count).padStart(2, '0')}</span></p><h2>My work.</h2>{work.map((item, index) => <article className="work-stacked__card" key={item.id}><span className="work-stacked__number">{String(index + 1).padStart(2, '0')}</span><p className="project__type">{item.status || 'Selected build'}</p><h3>{item.title}</h3><p>{item.description}</p><button type="button" onClick={() => onOpen(item)}>Open project <span>↗</span></button></article>)}</section>
  }
  const span = progress * (count - 1)
  return (
    <section className="work-carousel" id="work" ref={sectionRef} style={{ height: `${count * 120}vh` }} aria-label="My work">
      <div className="work-carousel__sticky">
        <p className="section-label">Selected work <span>— {String(count).padStart(2, '0')}</span></p>
        <div className="work-carousel__stage">
          {work.map((item, index) => {
            const offset = index - span
            const style = { transform: `translate(-50%, -50%) translateY(${offset * 52}vh) rotate(${offset * 9}deg) scale(${1 - Math.min(Math.abs(offset) * 0.07, 0.18)})`, opacity: Math.max(0, 1 - Math.abs(offset) * 0.55), zIndex: 10 - Math.round(Math.abs(offset)), pointerEvents: Math.abs(offset) < 1.5 ? 'auto' : 'none' }
            return <article className={`work-card ${index === focused ? 'work-card--focused' : ''}`} key={item.id} style={style} onClick={() => { if (index === focused) onOpen(item); else scrollToProject(index) }} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') { if (index === focused) onOpen(item); else scrollToProject(index) } }} aria-label={`${item.title}, project ${index + 1} of ${count}`}>
              {item.image_url ? <img src={item.image_url} alt={item.title} /> : <div className="work-card__placeholder" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>}
              <h3>{item.title}</h3>
              <p className="project__type">{item.status || 'Selected build'}</p>
            </article>
          })}
        </div>
        <div className="work-carousel__list" aria-label="Project list">{work.map((item, index) => Math.abs(index - focused) > 2 ? null : <button key={item.id} type="button" className={index === focused ? 'is-focused' : ''} onClick={() => scrollToProject(index)}><span className="work-list__type">{item.status || 'Selected build'}</span><span className="work-list__title">{String(index + 1).padStart(2, '0')} {item.title}</span><span className="work-list__desc">{item.description}</span><span className="work-list__sep">—</span></button>)}</div>
      </div>
    </section>
  )
}

function WorkDetail({ item, onBack }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onBack() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onBack])
  const detail = projectDetails[item.id]
  return <div className="work-detail" role="dialog" aria-label={`${item.title} details`}><button className="work-detail__back" type="button" onClick={onBack}>← Back to work</button><h2 className="work-detail__title">{item.title}</h2><div className="work-detail__grid"><aside className="work-detail__meta"><p><span>About</span>{item.description}</p><p><span>Role / Type</span>{item.status || 'Selected build'}</p><p><span>Links</span>{item.github_url ? <a href={item.github_url} target="_blank" rel="noreferrer">GitHub ↗</a> : '—'}{item.live_url ? <a href={item.live_url} target="_blank" rel="noreferrer">Visit site ↗</a> : ''}</p></aside><div className="work-detail__main">{item.image_url ? <img src={item.image_url} alt={item.title} /> : <div className="work-card__placeholder work-card__placeholder--large" aria-hidden="true">{item.title}</div>}<p>{item.description}</p><div className="work-card__links">{item.github_url && <a href={item.github_url} target="_blank" rel="noreferrer">GitHub <span>↗</span></a>}{item.live_url && <a href={item.live_url} target="_blank" rel="noreferrer">Visit site <span>↗</span></a>}</div>
  {detail && <div className="work-detail__sections">
    <section><h3>What is it?</h3><p>{detail.what}</p></section>
    <section><h3>Why did I do it?</h3><p>{detail.why}</p></section>
    <section><h3>What is the innovation in it?</h3><p>{detail.innovation}</p></section>
    <section><h3>Important things in it</h3><ul>{detail.important.map((line) => <li key={line}>{line}</li>)}</ul></section>
    <section><h3>Other things I learned</h3><ul>{detail.learned.map((line) => <li key={line}>{line}</li>)}</ul></section>
    <section><h3>How did I build it?</h3><p>{detail.howBuilt}</p></section>
    <section><h3>Tech stack</h3><p>{detail.stack}</p></section>
    <section><h3>Where did I do it?</h3><p>{detail.where}</p></section>
    <section><h3>Reason</h3><p>{detail.reason}</p></section>
  </div>}
  </div></div></div>
}

function HomeCertificates({ certificateCopy }) {
  const [selected, setSelected] = useState(null)
  const [opening, setOpening] = useState(false)
  const openCert = (index) => { if (opening) return; setOpening(true); window.setTimeout(() => { setSelected(index); setOpening(false) }, 650) }
  useEffect(() => {
    if (selected === null) return
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])
  return <section className="home-certificates" id="home-certificates"><p className="section-label">Selected certificates <span>— {String(certificateCopy.length).padStart(2, '0')}</span></p><h2>Certificates.</h2><div className="home-certificates__grid">{certificateCopy.map((cert, index) => <article key={cert.id || cert.title} className="home-certificate" onClick={() => openCert(index)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') openCert(index) }}><img src={cert.image} alt={cert.alt || cert.title} /><p>{cert.title}</p></article>)}</div>{opening && <div className="detail-transition" aria-hidden="true"><span>OPENING CERTIFICATE</span></div>}{selected !== null && <div className="modal" onClick={() => setSelected(null)}><div className="modal__panel modal__panel--certificate" onClick={(e) => e.stopPropagation()}><button className="modal__close" type="button" onClick={() => setSelected(null)} aria-label="Close">×</button><h2>{certificateCopy[selected].title}</h2><img src={certificateCopy[selected].image} alt={certificateCopy[selected].alt || certificateCopy[selected].title} /></div></div>}</section>
}

function HomeJourney({ journey }) {
  const stages = [
    { title: journey.schoolTitle, subtitle: journey.schoolSubtitle, text: journey.schoolText, image: journey.schoolImage, alt: 'DePaul School campus in Visakhapatnam', link: ['Visit DePaul School', 'https://depaulsvizag.com'] },
    { title: journey.collegeTitle, subtitle: journey.collegeSubtitle, text: journey.collegeText, image: journey.collegeImage, alt: 'Mayuri Bhavan, Sri Chaitanya College in Vijayawada', link: null },
    { title: journey.universityTitle, subtitle: journey.universitySubtitle, text: journey.universityText, image: journey.universityImage, alt: 'Andhra University', link: ['Visit Andhra University', 'https://www.andhrauniversity.edu.in'] },
    { title: journey.iitTitle, subtitle: journey.iitSubtitle, text: journey.iitText, image: journey.iitImage, alt: 'Indian Institute of Technology Madras campus sign', link: ['Visit IIT Madras BS program', 'https://study.iitm.ac.in/ds/'] },
  , ...(journey.extraStages || []).map((stage) => ({ title: stage.title, subtitle: stage.subtitle, text: stage.text, image: stage.image, alt: stage.alt || stage.title, link: null }))
  ]
  return <section className="home-journey" id="home-journey"><p className="section-label">Where I studied <span>— 04</span></p><h2>My journey.</h2><p className="home-journey__intro">{journey.intro}</p><div className="home-journey__timeline">{stages.map((stage, index) => <article key={stage.title} className="home-journey__step"><span className="home-journey__number">{String(index + 1).padStart(2, '0')}</span><div><h3>{stage.title} <em>{stage.subtitle}</em></h3><p>{stage.text}</p>{stage.link && <a href={stage.link[1]} target="_blank" rel="noreferrer">{stage.link[0]} <span>↗</span></a>}</div>{stage.image && <img src={stage.image} alt={stage.alt} />}</article>)}</div></section>
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => { const timer = window.setTimeout(() => setIsLoading(false), 2000); return () => window.clearTimeout(timer) }, [])
  const [menuOpen, setMenuOpen] = useState(false)
  const [mode, setMode] = useState(() => window.localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light')
  const [showCertificates, setShowCertificates] = useState(() => window.location.hash === '#certificates')
  const [showJourney, setShowJourney] = useState(() => window.location.hash === '#journey')
  const [showWork, setShowWork] = useState(() => window.location.hash === '#my-work')
  const [showAdmin, setShowAdmin] = useState(() => window.location.hash === '#admin')
  const [showAbout, setShowAbout] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [showContactPage, setShowContactPage] = useState(false)
  const [transitionText, setTransitionText] = useState('LOADING PROJECT')
  const [focusedWork, setFocusedWork] = useState(0)
  const [selectedWork, setSelectedWork] = useState(null)
  const [detailTransition, setDetailTransition] = useState(false)
  const [showMeta, setShowMeta] = useState(false)
  const [logoSpinning, setLogoSpinning] = useState(false)
  const [scrambled, setScrambled] = useState(false)
  const [showScrambleConfirm, setShowScrambleConfirm] = useState(false)
  const [journey, setJourney] = useState(() => ({ ...defaultJourney, ...readAdminStore('portfolio-journey', {}) }))
  const [certificateCopy, setCertificateCopy] = useState(() => readAdminStore('portfolio-certificates', defaultCertificateCopy))
  const [work, setWork] = useState(() => readAdminStore('portfolio-work', defaultWork))

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById('work')
      if (!el) { setShowMeta(false); return }
      const rect = el.getBoundingClientRect()
      setShowMeta(rect.top <= 0 && rect.bottom >= window.innerHeight)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openPageOrScroll = (page) => {
    const isMobile = window.innerWidth <= 900
    if (!isMobile) {
      if (page === 'certificates') scrollToId('home-certificates')
      else if (page === 'journey') scrollToId('home-journey')
      else if (page === 'contact') { closeMenu(); setShowContact(true) }
      return
    }
    setMenuOpen(false)
    setTransitionText('')
    setDetailTransition(true)
    window.setTimeout(() => {
      setDetailTransition(false)
      setTransitionText('LOADING PROJECT')
      if (page === 'certificates') setShowCertificates(true)
      else if (page === 'journey') setShowJourney(true)
      else if (page === 'contact') setShowContactPage(true)
      window.scrollTo({ top: 0, behavior: 'auto' })
    }, 650)
  }
  const scrollToId = (id) => { closeMenu(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
  const openWork = (item) => { setSelectedWork(item); setTransitionText('LOADING PROJECT'); setDetailTransition(true); window.setTimeout(() => { setDetailTransition(false) }, 650) }
  const closeWork = () => { setSelectedWork(null); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) }

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
      if (window.location.hash === '#top' || window.location.hash === '') { setShowContactPage(false); setShowAbout(false); setShowContact(false); setSelectedWork(null) }
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
      if (remoteJourney) setJourney({ ...defaultJourney, intro: remoteJourney.intro, schoolTitle: remoteJourney.school_title, schoolSubtitle: remoteJourney.school_subtitle, schoolText: remoteJourney.school_text, schoolImage: remoteJourney.school_image || defaultJourney.schoolImage, collegeTitle: remoteJourney.college_title, collegeSubtitle: remoteJourney.college_subtitle, collegeText: remoteJourney.college_text, collegeImage: remoteJourney.college_image || defaultJourney.collegeImage, universityTitle: remoteJourney.university_title, universitySubtitle: remoteJourney.university_subtitle, universityText: remoteJourney.university_text, universityImage: remoteJourney.university_image || defaultJourney.universityImage, iitTitle: remoteJourney.iit_title, iitSubtitle: remoteJourney.iit_subtitle, iitText: remoteJourney.iit_text, iitImage: remoteJourney.iit_image || defaultJourney.iitImage, extraStages: (() => { try { return remoteJourney.extra_stages ? JSON.parse(remoteJourney.extra_stages) : (readAdminStore('portfolio-journey', {}).extraStages || []) } catch { return readAdminStore('portfolio-journey', {}).extraStages || [] } })() })
      if (remoteCertificates?.length) setCertificateCopy(remoteCertificates.map(({ id, title, image_url: image, alt_text: alt }) => ({ id, title, image: image || defaultCertificateCopy.find((item) => item.id === id)?.image || '', alt })))
      if (remoteWork?.length) setWork((current) => { const byId = new Map(current.map((item) => [item.id, item])); const merged = current.map((item) => { const r = remoteWork.find((x) => x.id === item.id); return r ? { ...item, title: r.title || item.title, description: r.description || item.description, github_url: r.github_url ?? item.github_url, live_url: r.live_url ?? item.live_url, status: r.status || item.status, image_url: r.image_url || item.image_url, sort_order: r.sort_order ?? item.sort_order } : item }); remoteWork.forEach((r) => { if (!byId.has(r.id)) merged.push({ id: r.id, title: r.title, description: r.description || '', github_url: r.github_url || '', live_url: r.live_url || '', image_url: r.image_url || '', status: r.status || '', sort_order: r.sort_order ?? merged.length }) }); return merged.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)) })
    }
    loadRemoteContent()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const toggleTheme = () => setMode((currentMode) => currentMode === 'dark' ? 'light' : 'dark')

  if (showCertificates) return <Certificates mode={mode} onToggle={toggleTheme} certificateCopy={certificateCopy} />
  if (showJourney) return <Journey mode={mode} onToggle={toggleTheme} journey={journey} />
  if (showWork) return <MyWork mode={mode} onToggle={toggleTheme} work={work} />
  if (showAdmin) return <AdminPortal mode={mode} onToggle={toggleTheme} journey={journey} setJourney={setJourney} certificateCopy={certificateCopy} setCertificateCopy={setCertificateCopy} work={work} setWork={setWork} />
  if (showContactPage) return <main className={`contact-page page-theme--${mode}`}><PageHeader mode={mode} onToggle={onToggle} /><a className="certificates-back certificates-back--floating" href="#top" onClick={(e) => { e.preventDefault(); setShowContactPage(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}><span>←</span> Back to portfolio</a><ContactForm /></main>

  return (
    <>
      {isLoading && <div className="start-loader" aria-hidden="true"><img className="start-loader__person" src={pushingCartoon} alt="" /><div className="start-loader__panel" /></div>}
      {detailTransition && <div className="detail-transition" aria-hidden="true"><span>{transitionText}</span></div>}
      {selectedWork && <WorkDetail item={selectedWork} onBack={closeWork} />}

      <button className={logoSpinning ? 'huyml-rail huyml-rail--spinning' : 'huyml-rail'} type="button" aria-label="Go to home" onClick={() => { setLogoSpinning(true); window.setTimeout(() => { setLogoSpinning(false); closeMenu(); setShowCertificates(false); setShowJourney(false); setShowWork(false); setShowAdmin(false); setShowAbout(false); setShowContact(false); setShowContactPage(false); setSelectedWork(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }, 600) }}><span className="huyml-rail__logo">D<br />H<br />A<br />N<br />U<br />N<br />J<br />A<br />Y</span><span>Visakhapatnam, India</span></button>
      {showMeta && <div className="huyml-bottombar" aria-hidden="true"><span>Scroll</span><span>Selected work {String(focusedWork + 1).padStart(2, '0')} / {String(work.length).padStart(2, '0')}</span><span className="huyml-bottombar__numeral">{String(focusedWork + 1).padStart(2, '0')}</span></div>}
      {showMeta && work[focusedWork] && <div className="huyml-meta" aria-hidden="true"><p><span>Role / Type</span>{work[focusedWork].status || 'Selected build'}</p><p><span>Project</span>{work[focusedWork].title}</p><p>{work[focusedWork].github_url && <a href={work[focusedWork].github_url} target="_blank" rel="noreferrer">GitHub ↗</a>} {work[focusedWork].live_url && <a href={work[focusedWork].live_url} target="_blank" rel="noreferrer">Open project ↗</a>}</p></div>}

      <main className={`portfolio huyml-home page-theme--${mode} ${isLoading ? 'portfolio--waiting' : ''} ${scrambled ? 'portfolio--scrambled' : ''}`}>
        <header className="site-header">
                    <LogoCube />
          <nav className={menuOpen ? 'nav nav--open' : 'nav'} aria-label="Main navigation">
            <button className="nav__link-button" type="button" onClick={() => { closeMenu(); setShowAbout(true) }}>About</button>
            <button className="nav__link-button nav__link-button--scramble" type="button" onClick={() => { closeMenu(); if (scrambled) { setScrambled(false); window.scrollTo({ top: 0, behavior: "smooth" }) } else { setShowScrambleConfirm(true) } }}>{scrambled ? "Non-scramble" : "Scramble"}</button>
            <button className="nav__link-button" type="button" onClick={() => scrollToId('work')}>Work</button>
            <button className="nav__link-button" type="button" onClick={() => openPageOrScroll('certificates')}>Certificates</button>
            <button className="nav__link-button" type="button" onClick={() => openPageOrScroll('journey')}>Journey</button>
            <button className="nav__link-button" type="button" onClick={() => openPageOrScroll('contact')}>Contact</button>
          </nav>
          <div className="header-tools"><ISTClock /><SocialLinks /><AdminIcon /></div>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation"><span /><span /><span /></button>
        </header>

        {showScrambleConfirm && <div className="modal" onClick={() => setShowScrambleConfirm(false)}><div className="modal__panel" onClick={(e) => e.stopPropagation()}><button className="modal__close" type="button" onClick={() => setShowScrambleConfirm(false)} aria-label="Close">×</button><h2>Are you ready to break this website?</h2><p>Everything will scramble, fall down, and turn white. You can bring it back any time with Non-scramble or Refresh.</p><div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}><button className="admin-save" type="button" onClick={() => { setScrambled(true); setShowScrambleConfirm(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Yes, break it</button><button className="admin-add" type="button" onClick={() => setShowScrambleConfirm(false)}>Cancel</button></div></div></div>}
        {scrambled && <button className="scramble-refresh" type="button" onClick={() => { setScrambled(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Refresh</button>}
        <section className="hero hero--huyml" id="top">
          <figure className="hero__top-photo"><img src={heroTopPhoto} alt="Dhanunjay Reddy in a group photo" /><figcaption>A memorable photo with Sid Ahmed and my best friend — had a good time</figcaption></figure>
          <div className="hero__heading"><p className="eyebrow">Hello, I&apos;m</p><h1>DHANUNJAY<br />REDDY</h1><p className="hero__role">AI &amp; product builder · 2nd-year B.Tech CSE, Andhra University · IIT Madras BS</p><p className="hero__intro">Hello, I am Dhanunjay, 18. I turn ambitious ideas into polished, real-world experiences. I&apos;m exploring the space where AI, product thinking, and expressive interfaces meet, and I like shipping things that feel as good to use as they are clever under the hood.</p><div className="hero__actions"><button type="button" onClick={() => scrollToId('work')}>View My Work ↓</button><button type="button" onClick={() => { setShowContact(true) }}>Contact ↗</button></div></div>
          <figure className="hero__portrait"><img src={profilePhoto} alt="Dhanunjay in Visakhapatnam" /><figcaption>creative technologist · visakhapatnam, india</figcaption></figure>
          <div className="hero__aside">B.Tech CSE (Core)<br />Andhra University / 2029<br /><span>CGPA 8.44 · 2nd year</span></div>
          <section className="skills-strip skills-strip--hero" aria-label="Skills"><p className="section-label">What I work with</p><div className="skills-strip__list">{skills.map(([category, items], skillIndex) => <div className="glass-card" key={category}><span className="glass-card__number">{String(skillIndex + 1).padStart(2, '0')}</span><img className="glass-card__photo" src={[skillProgramming, skillWeb, skillAi, skillProduct][skillIndex]} alt={category} loading="lazy" /><div><h3>{category}</h3><p>{items}</p></div></div>)}</div></section>
          <a className="scroll-cue" href="#work" onClick={(e) => { e.preventDefault(); scrollToId('work') }}><span>Scroll to explore</span><b>↓</b></a>
        </section>

        <WorkCarousel work={work} onFocus={setFocusedWork} onOpen={openWork} />

        <HomeCertificates certificateCopy={certificateCopy} />

        <HomeJourney journey={journey} />

        <ContactForm />

        <footer className="footer" id="contact"><div className="footer__top"><span>Let&apos;s build the next thing.</span><span>© 2026 Dhanunjay Reddy</span></div><h2>Have an idea?<br /><em>Let&apos;s make it <span>real.</span></em></h2><a className="footer__email" href="mailto:dhanunjay905@gmail.com">dhanunjay905@gmail.com <span>↗</span></a><div className="footer__socials"><SocialLinks /></div><div className="footer__bottom"><span>Java / Python / AI / Product</span><span>Made with curiosity + care</span></div></footer>
        {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
        {showContact && <ContactModal onClose={() => setShowContact(false)} />}
      </main>
    </>
  )
}

export default App
