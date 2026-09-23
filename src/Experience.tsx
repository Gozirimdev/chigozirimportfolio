import { ArrowUpRight, Award, GitMerge, Github, ImagePlus, Trophy, Users } from 'lucide-react'
import { contributions, credentials, experiences, showcase } from './experience-data'
import type { Evidence } from './experience-data'
import { profile } from './data'
import GitHubCalendar from './GitHubCalendar'
import './experience.css'

function EvidenceCard({ evidence, kind = 'Photo' }: { evidence: Evidence; kind?: string }) {
  if (evidence.src) return <figure className="evidence-photo">
    <a href={evidence.src} target="_blank" rel="noreferrer" aria-label={`Open ${evidence.alt}`}><img src={evidence.src} alt={evidence.alt} loading="lazy" /></a>
    <figcaption>{evidence.caption}</figcaption>
  </figure>
  return <div className="evidence-placeholder" role="img" aria-label={`${evidence.caption}. ${kind} to be added.`}>
    <ImagePlus size={23} strokeWidth={1.3} aria-hidden="true" />
    <span>{evidence.caption}</span>
    <small>{kind} to be added</small>
  </div>
}

function Label({ number, text }: { number: string; text: string }) {
  return <div className="section-label"><span>{number}</span><span className="label-rule"/>{text}</div>
}

export default function ExperienceSections() {
  return <>
    <section id="experience" className="experience-section container section-space">
      <Label number="02" text="EXPERIENCE & LEADERSHIP" />
      <div className="section-heading"><div><h2>Building software.<br/><span className="serif-word">Bringing people together.</span></h2><p>Teamwork, community, and the experiences behind my work.</p></div></div>
      <article className="showcase-card">
        <div className="showcase-copy">
          <span className="achievement-label"><Trophy size={15}/> TEAM ACHIEVEMENT</span>
          <div className="showcase-place">2<span>nd</span><span className="place-caption">PLACE</span></div>
          <h3>{showcase.title}</h3>
          <p>{showcase.description}</p>
          <span className="showcase-role"><Users size={14}/> Fuuud team lead</span>
        </div>
        <EvidenceCard evidence={showcase.evidence}/>
      </article>
      <div className="experience-grid">{experiences.map(item => <article className="experience-card" key={item.organization}>
        <div className="experience-meta"><span>{item.category}</span>{item.dates && <span>{item.dates}</span>}</div>
        <h3>{item.title}</h3><p className="experience-org">{item.organization}</p>
        <p className="experience-description">{item.description}</p>
        <EvidenceCard evidence={item.evidence}/>
      </article>)}</div>
    </section>

    <section id="contributions" className="contributions-section">
      <div className="container">
        <Label number="03" text="GITHUB ACTIVITY"/>
        <div className="section-heading"><div><h2>Good software is<br/><span className="serif-word">a shared effort.</span></h2><p>My contributions over time, updated from GitHub.</p></div><a href={profile.github} className="text-link" target="_blank" rel="noreferrer"><Github size={16}/> My GitHub profile <ArrowUpRight size={15}/></a></div>
        <GitHubCalendar/>
        <details className="selected-contributions"><summary>Explore selected merged pull requests</summary>
        <div className="contribution-list">{contributions.map(item => <a className="contribution-card" href={item.url} key={item.url} target="_blank" rel="noreferrer">
          <span className="merge-icon"><GitMerge size={19}/></span>
          <div className="contribution-content"><span>{item.repository}</span><h3>{item.title}</h3><p>#{item.number}<i/>{item.category}<i/><time dateTime="2026-08-29">{item.merged}</time></p></div>
          <span className="merged-status"><GitMerge size={12}/> Merged</span><ArrowUpRight size={17} className="contribution-arrow"/>
        </a>)}</div></details>
      </div>
    </section>

    <section id="credentials" className="credentials-section container section-space">
      <Label number="04" text="CERTIFICATES & LEARNING"/>
      <div className="section-heading"><div><h2>Always a <span className="serif-word">student.</span></h2><p>Space for certificates and learning milestones.</p></div><Award size={30} className="credentials-icon" strokeWidth={1.3}/></div>
      <div className="credentials-grid">{credentials.length ? credentials.map(item => <article className="credential-card" key={`${item.issuer}-${item.title}`}><EvidenceCard evidence={item.evidence} kind="Certificate"/><h3>{item.title}</h3><p>{item.issuer}{item.date ? ` · ${item.date}` : ''}</p>{item.url && <a className="project-live-link" href={item.url} target="_blank" rel="noreferrer">Verify credential <ArrowUpRight size={13}/></a>}</article>) : [1, 2].map(number => <EvidenceCard key={number} kind="Certificate" evidence={{ alt: `Certificate space ${number}`, caption: 'Certificate image' }}/>)}</div>
    </section>
  </>
}
