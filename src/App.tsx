import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUp, ArrowUpRight, Braces, Check, CheckCheck, Code2, Copy, ExternalLink, Github, Globe2, Layers, Linkedin, Mail, Menu, Terminal, X } from 'lucide-react'
import { profile, projects } from './data'
import type { Project } from './data'
import ProjectVisual from './ProjectVisual'
import ExperienceSections from './Experience'

function Brand() {
  return <a href="#home" className="brand" aria-label="Chigozirim Favour, home"><span className="brand-symbol">c<span>.</span></span><span>chigozirim<span className="brand-period">.</span></span></a>
}

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-label"><span>{number}</span><span className="label-rule"/>{children}</div>
}

function HeroArtwork() {
  return <div className="hero-art" aria-hidden="true">
    <div className="art-grid"/><div className="art-orbit"/>
    <div className="code-window"><div className="window-bar"><div className="window-dots"><i/><i/><i/></div><span>something-good.tsx</span><Code2 size={13}/></div><div className="code-body"><div className="code-line"><span>01</span><code><em>const</em> engineer = {'{'}</code></div><div className="code-line"><span>02</span><code>&nbsp; name: <b>'Chigozirim'</b>,</code></div><div className="code-line"><span>03</span><code>&nbsp; focus: <b>'Full-stack'</b>,</code></div><div className="code-line"><span>04</span><code>&nbsp; approach: [</code></div><div className="code-line"><span>05</span><code>&nbsp;&nbsp;&nbsp; <b>'Understand the problem'</b>,</code></div><div className="code-line"><span>06</span><code>&nbsp;&nbsp;&nbsp; <b>'Build with intention'</b>,</code></div><div className="code-line"><span>07</span><code>&nbsp;&nbsp;&nbsp; <b>'Make it work well'</b></code></div><div className="code-line"><span>08</span><code>&nbsp; ]</code></div><div className="code-line"><span>09</span><code>{'}'};</code></div></div><div className="window-status"><span><span/> Always learning. Always building.</span><span>TypeScript</span></div></div>
    <div className="art-sticker sticker-react"><span>✳</span> From idea</div><div className="art-sticker sticker-shipped"><span><CheckCheck size={16}/></span> To something useful.</div><div className="art-cursor"><svg width="23" height="27" viewBox="0 0 23 27"><path d="m2 2 18 12-9 2-4 8Z" fill="#355af6" stroke="#fff" strokeWidth="2"/></svg><span>let's build</span></div><span className="art-caption">A LITTLE CURIOSITY. A LOT OF CARE.</span>
  </div>
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (!project) return
    const dialog = ref.current!
    const trigger = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      trigger?.focus()
    }
  }, [project])
  return <dialog ref={ref} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={onClose} onClick={(event) => {
    if (event.target !== event.currentTarget) return
    const rect = event.currentTarget.getBoundingClientRect()
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose()
  }}>{project && <><button autoFocus className="dialog-close icon-button" onClick={onClose} aria-label="Close project details"><X size={19}/></button><ProjectVisual id={project.id}/><div className="dialog-content"><div className="dialog-eyebrow">PROJECT {project.number}<span>{project.status}</span></div><h2 id="project-dialog-title">{project.title}</h2><p className="dialog-subtitle">{project.subtitle}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><section><h3>The problem</h3><p>{project.problem}</p></section><section><h3>Inside the project</h3><ul>{project.features.map(feature => <li key={feature}><Check size={16}/><span>{feature}</span></li>)}</ul></section><section><h3>A decision that matters</h3><p>{project.decision}</p></section><div className="project-note"><span className="note-dot"/><p>{project.note}</p></div>{(project.live || project.github) && <div className="dialog-links">{project.live && <a className="button button-primary" href={project.live} target="_blank" rel="noreferrer">Visit project <ExternalLink size={15}/></a>}{project.github && <a className="button button-secondary" href={project.github} target="_blank" rel="noreferrer"><Github size={16}/> Explore the code <ArrowUpRight size={15}/></a>}</div>}</div></>}</dialog>
}

export default function App() {
  const [mobileNav, setMobileNav] = useState(false)
  const [filter, setFilter] = useState('All projects')
  const [selected, setSelected] = useState<Project | null>(null)
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(copyTimeout.current), [])
  useEffect(() => {
    if (!mobileNav) return
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setMobileNav(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileNav])
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setCopyError(false)
      clearTimeout(copyTimeout.current)
      copyTimeout.current = setTimeout(() => setCopied(false), 2500)
    } catch { setCopyError(true) }
  }
  const shownProjects = projects.filter(project => filter === 'All projects' || project.category === filter)

  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="site-header"><div className="container header-inner"><Brand/><nav className={mobileNav ? 'navigation is-open' : 'navigation'} id="main-navigation" aria-label="Main navigation"><a href="#work" onClick={() => setMobileNav(false)}>Work</a><a href="#experience" onClick={() => setMobileNav(false)}>Experience</a><a href="#about" onClick={() => setMobileNav(false)}>About</a><a href="#approach" onClick={() => setMobileNav(false)}>Approach</a><a className="nav-contact" href="#contact" onClick={() => setMobileNav(false)}>Let's talk <ArrowUpRight size={15}/></a></nav><button className="menu-toggle icon-button" aria-label={mobileNav ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileNav} aria-controls="main-navigation" onClick={() => setMobileNav(!mobileNav)}>{mobileNav ? <X size={22}/> : <Menu size={22}/>}</button></div></header>

    <main id="main">
      <section className="hero container" id="home"><div className="hero-copy"><p className="hero-intro">HI, I'M CHIGOZIRIM FAVOUR <span>↗</span></p><h1>Good ideas.<br/><span>Thoughtfully<br className="mobile-break"/> built.</span></h1><p className="hero-description">A full-stack software engineer building useful web experiences — and the systems that make them work.</p><div className="hero-actions"><a href="#work" className="button button-primary">Explore my work <ArrowDown size={16}/></a><a href={profile.github} target="_blank" rel="noreferrer" className="github-link"><Github size={18}/> GitHub <ArrowUpRight size={14}/></a></div><div className="hero-location"><Globe2 size={14}/><span>Based in Nigeria</span><i/>Open to working worldwide</div></div><HeroArtwork/></section>

      <div className="stack-strip"><div className="container stack-inner"><span className="stack-label">MY EVERYDAY TOOLKIT</span><div><Code2 size={19}/> React & Next.js</div><div><span className="ts-icon">TS</span> TypeScript</div><div><Braces size={19}/> Node.js</div><div><Terminal size={19}/> Python</div><div><Layers size={19}/> MongoDB & PostgreSQL</div></div></div>

      <section className="work-section container section-space" id="work"><SectionLabel number="01">SELECTED WORK</SectionLabel><div className="section-heading"><div><h2>Ideas into <span className="serif-word">interfaces.</span><br/>Problems into products.</h2><p>A few things I've been building, connecting, and figuring out.</p></div><a className="text-link desktop-github" href={profile.github} target="_blank" rel="noreferrer">More on GitHub <ArrowUpRight size={16}/></a></div><div className="project-filters" role="group" aria-label="Filter projects">{['All projects', ...new Set(projects.map(project => project.category))].map(value => <button key={value} className={filter === value ? 'filter active' : 'filter'} aria-pressed={filter === value} onClick={() => setFilter(value)}>{value}{value === 'All projects' && <span>{String(projects.length).padStart(2, '0')}</span>}</button>)}</div><div className="project-grid" aria-live="polite">{shownProjects.map(project => <article key={project.id} className="project-card"><button className="project-image-button" onClick={() => setSelected(project)} aria-label={`Read ${project.title} project details`}><ProjectVisual id={project.id}/><span className="project-hover-label">Explore project <ArrowUpRight size={16}/></span></button><div className="project-meta"><span>{project.category}</span><span className="project-status">{project.status}</span></div><div className="project-title-row"><h3><button onClick={() => setSelected(project)}>{project.title}</button></h3><button className="project-arrow icon-button" onClick={() => setSelected(project)} aria-label={`Read about ${project.title}`}><ArrowUpRight size={21}/></button></div><p className="project-description">{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>{project.live && <a className="project-live-link" href={project.live} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title} website`}>Visit website <ArrowUpRight size={13}/></a>}</article>)}</div></section>

      <ExperienceSections/>

      <section className="about-section" id="about"><div className="container about-grid"><div><SectionLabel number="05">A LITTLE ABOUT ME</SectionLabel><h2>Curious by nature.<br/><span className="serif-word">Engineer</span> by practice.</h2><div className="about-signature">Chigozirim Favour<span>SOFTWARE ENGINEER</span></div></div><div className="about-copy"><p className="about-lead">I like understanding how things work.<br/>Even more, I like making them work better.</p><p>My work spans storefronts, healthcare access, payment systems, and developer tools. The common thread is turning a complicated process into something people can actually use.</p><p>I'm comfortable moving between an interface and the API behind it, thinking through data models, and working through the details that make a feature dependable.</p><div className="learning-note"><span className="learning-icon"><Terminal size={16}/></span><div><strong>There's always a next thing to learn.</strong><span>Currently exploring Kubernetes and the infrastructure behind good software.</span></div></div></div></div></section>

      <section className="approach-section container section-space" id="approach"><SectionLabel number="06">HOW I APPROACH THE WORK</SectionLabel><div className="section-heading"><h2>The details make<br/><span className="serif-word">the difference.</span></h2><p className="approach-intro">A good-looking interface is a starting point.<br/>I care about what happens after the click.</p></div><div className="principles"><article><div className="principle-top"><span className="principle-icon"><Layers size={23}/></span><span>01 / UNDERSTAND</span></div><h3>Start with the real problem.</h3><p>Understand who it's for, what they need to do, and where the friction is. Let that shape the solution.</p></article><article><div className="principle-top"><span className="principle-icon"><Braces size={23}/></span><span>02 / BUILD</span></div><h3>Make the pieces work together.</h3><p>Clear interfaces, sensible APIs, and data models that support the workflow. Keep the code understandable.</p></article><article><div className="principle-top"><span className="principle-icon"><CheckCheck size={23}/></span><span>03 / REFINE</span></div><h3>Think beyond the happy path.</h3><p>Check the edge cases. Make errors useful. Test the important behavior, and keep improving what matters.</p></article></div></section>

      <section className="contact-section container" id="contact"><div className="contact-panel"><div className="contact-text"><div className="contact-eyebrow"><span/> GOOD WORK STARTS WITH A CONVERSATION</div><h2>Have something<br/>in <span>mind?</span><span className="contact-asterisk">✳</span></h2><p>A role, a project, or an interesting problem.<br/>I'd love to hear about it.</p></div><div className="contact-actions"><a className="button contact-button" href={profile.email ? `mailto:${profile.email}` : profile.linkedin || profile.github} target={profile.email ? undefined : '_blank'} rel={profile.email ? undefined : 'noreferrer'}>{profile.email ? <Mail size={18}/> : <Linkedin size={18}/>} {profile.email ? "Let's talk" : 'Connect on LinkedIn'}<ArrowUpRight size={18}/></a>{profile.email && <div className="email-row"><a href={`mailto:${profile.email}`}>{profile.email}</a><button className="copy-button" onClick={copyEmail} aria-label={copied ? 'Email copied' : 'Copy email address'}>{copied ? <Check size={15}/> : <Copy size={15}/>}</button></div>}<span role="status" className="copy-status">{copied ? 'Email copied. Talk soon!' : copyError ? 'Please select and copy the email address above.' : ''}</span><div className="contact-links"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={15}/> GitHub <ArrowUpRight size={13}/></a>{profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={15}/> LinkedIn <ArrowUpRight size={13}/></a>}</div></div></div></section>
    </main>

    <footer className="container footer"><Brand/><span>© {new Date().getFullYear()} Chigozirim Favour. Built with intention.</span><a href="#home">Back to top <ArrowUp size={15}/></a></footer>
    <ProjectDialog project={selected} onClose={() => setSelected(null)}/>
  </>
}
