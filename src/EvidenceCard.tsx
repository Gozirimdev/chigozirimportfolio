import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight, ImagePlus, Pause, Play } from 'lucide-react'
import type { Evidence, EvidenceImage } from './experience-data'

export default function EvidenceCard({ evidence, kind = 'Photo' }: { evidence: Evidence; kind?: string }) {
  const images: EvidenceImage[] = evidence.images?.length ? evidence.images : evidence.src ? [{ src: evidence.src, alt: evidence.alt, caption: evidence.caption }] : []
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [visible, setVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const frame = useRef<HTMLElement>(null)
  const touchStart = useRef<number | null>(null)
  const current = index % Math.max(1, images.length)
  const playing = images.length > 1 && !paused && !hovered && !focused && visible && !reducedMotion
  const move = (step: number) => { setPaused(true); setIndex((current + step + images.length) % images.length) }

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const change = () => setReducedMotion(media.matches)
    media.addEventListener('change', change)
    return () => media.removeEventListener('change', change)
  }, [])
  useEffect(() => {
    if (!frame.current) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    observer.observe(frame.current)
    return () => observer.disconnect()
  }, [images.length])
  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => { if (!document.hidden) setIndex(value => (value + 1) % images.length) }, 5000)
    return () => window.clearInterval(timer)
  }, [playing, images.length])

  if (!images.length) return <div className="evidence-placeholder" role="img" aria-label={`${evidence.caption}. ${kind} to be added.`}>
    <ImagePlus size={23} strokeWidth={1.3} aria-hidden="true"/><span>{evidence.caption}</span><small>{kind} to be added</small>
  </div>

  return <figure ref={frame} className="evidence-photo evidence-carousel" aria-label={evidence.caption} aria-roledescription={images.length > 1 ? 'carousel' : undefined}
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}
    onKeyDown={event => { if (images.length > 1 && ['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1) } }}>
    <div className="evidence-window" onTouchStart={event => { touchStart.current = event.touches[0].clientX }} onTouchEnd={event => {
      if (touchStart.current !== null && images.length > 1) { const distance = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1) }
      touchStart.current = null
    }}>
      <div className="evidence-track" style={{ transform: `translateX(-${current * 100}%)` }}>{images.map((image, number) => <a key={`${image.src}-${number}`} className="evidence-slide" href={image.src} target="_blank" rel="noreferrer" tabIndex={number === current ? 0 : -1} aria-hidden={number !== current} aria-label={`Open ${image.alt}`}><img src={image.src} alt={image.alt} loading="lazy"/></a>)}</div>
      {images.length > 1 && <>
        <button type="button" className="evidence-prev" aria-label="Previous image" onClick={() => move(-1)}><ChevronLeft size={19}/></button>
        <button type="button" className="evidence-next" aria-label="Next image" onClick={() => move(1)}><ChevronRight size={19}/></button>
        <div className="evidence-controls"><div className="evidence-dots">{images.map((image, number) => <button type="button" key={number} aria-label={`Show image ${number + 1}: ${image.alt}`} aria-pressed={number === current} onClick={() => { setIndex(number); setPaused(true) }}/>)}</div>
          {!reducedMotion && <button type="button" className="evidence-play" aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} onClick={() => setPaused(value => !value)}>{paused ? <Play size={14}/> : <Pause size={14}/>}</button>}
        </div>
      </>}
    </div>
    <figcaption aria-live={playing ? 'off' : 'polite'}>{images[current].caption || evidence.caption}{images.length > 1 && <span> {current + 1} / {images.length}</span>}</figcaption>
    {images[current].transcriptUrl && <a className="project-live-link certificate-transcript" href={images[current].transcriptUrl} target="_blank" rel="noreferrer">View transcript <ArrowUpRight size={16} aria-hidden="true"/><span className="certificate-file-type">PDF</span></a>}
  </figure>
}

