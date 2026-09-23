import { ArrowDownLeft, ArrowUpRight, Check, ChevronRight, CircleCheck, Heart, Layers, Play, Plus, Search, ShieldCheck, ShoppingBag, SlidersHorizontal, Star, Terminal, Zap } from 'lucide-react'
import { projects } from './data'

function Shirt({ dark = false }: { dark?: boolean }) {
  return <svg className="shirt" viewBox="0 0 180 190" fill="none" aria-hidden="true"><defs><linearGradient id={dark ? 'dark-shirt' : 'light-shirt'} x1="40" y1="20" x2="150" y2="180" gradientUnits="userSpaceOnUse"><stop stopColor={dark ? '#52624c' : '#eee4d6'}/><stop offset="1" stopColor={dark ? '#283a30' : '#c9b7a1'}/></linearGradient></defs><path d="M57 24 27 41 9 83 38 99 51 76 46 166Q90 180 134 166L129 76 142 99 171 83 153 41 123 24Q91 39 57 24Z" fill={`url(#${dark ? 'dark-shirt' : 'light-shirt'})`}/><path d="M57 24Q90 61 123 24M51 76 58 53M129 76 122 53M56 164Q90 173 124 164" stroke={dark ? '#203127' : '#b4a18a'} strokeWidth="2" opacity=".5"/><path d="m68 38 2 112m41-112-2 112" stroke="white" opacity=".08" strokeWidth="5"/></svg>
}

export default function ProjectVisual({ id }: { id: string }) {
  const project = projects.find(item => item.id === id)
  if (project?.screenshot) return <div className={`project-visual screenshot-visual screenshot-${id}`} aria-hidden="true">
    <div className="screenshot-browser">
      <div className="screenshot-toolbar"><span className="window-dots"><i/><i/><i/></span><span>{project.live ? new URL(project.live).hostname : project.title}</span><ArrowUpRight size={11}/></div>
      <img src={project.screenshot} alt="" loading="lazy" decoding="async" width="1440" height="900"/>
    </div>
    <span className="preview-label">ACTUAL WEBSITE</span>
  </div>
  if (id === 'mercient') return <div className="project-visual mercient-visual" aria-hidden="true">
    <div className="mini-store">
      <div className="store-nav"><strong>M<span>·</span>C</strong><span>COLLECTIONS &nbsp; ABOUT</span><ShoppingBag size={13}/></div>
      <div className="store-heading"><span>EVERYDAY. ELEVATED.</span><h4>Made for<br/><i>your own rhythm.</i></h4></div>
      <div className="store-products"><div><div className="shirt-tile"><Shirt/><span>01</span></div><b>The Everyday Tee</b><small>Sand / Essential collection</small></div><div><div className="shirt-tile dark"><Shirt dark/><span>02</span></div><b>The Everyday Tee</b><small>Forest / Essential collection</small></div></div>
      <div className="store-bottom">INTENTIONAL STYLE. EVERY DAY. <ArrowUpRight size={13}/></div>
    </div><div className="visual-float cart-float"><span className="float-icon"><Check size={16}/></span><div><b>A little more you.</b><span>Added to your collection</span></div></div>
    <span className="preview-label">INTERFACE CONCEPT</span>
  </div>
  if (id === 'fuuud') return <div className="project-visual fuuud-visual" aria-hidden="true">
    <div className="health-orbit orbit-one"/><div className="health-orbit orbit-two"/>
    <div className="health-copy"><span className="health-brand">fuuud<span>+</span></span><h4>A little closer<br/>to feeling<br/><i>better.</i></h4><span className="health-chip"><Heart size={12}/> Care that connects.</span></div>
    <div className="health-phone"><div className="phone-camera"/><div className="phone-top"><span>Good morning <span>☀</span></span><span className="avatar-letter">C</span></div><h5>Care, closer.</h5><div className="phone-search"><Search size={10}/> Find your care</div><div className="health-specialties"><span><Heart size={15}/>Wellness</span><span><Plus size={15}/>Doctors</span><span><ShieldCheck size={15}/>Health</span></div><div className="doctor-heading">Find a practitioner <ChevronRight size={11}/></div><div className="doctor-card"><div className="doctor-avatar"><Plus size={20}/></div><div><b>General care</b><span>Practitioner discovery</span><small><Star size={8} fill="currentColor"/> Your next step to care</small></div></div><div className="appointment-card"><span>YOUR CARE, YOUR TIME</span><strong>Make room<br/>for your wellbeing.</strong><div>Explore appointments <ArrowUpRight size={12}/></div></div><div className="phone-home"/></div>
    <span className="preview-label">INTERFACE CONCEPT</span>
  </div>
  if (id === 'esure') return <div className="project-visual esure-visual" aria-hidden="true"><div className="esure-window"><div className="esure-top"><span className="esure-logo"><Layers size={16}/> esure</span><span className="testnet-dot">TESTNET</span></div><div className="esure-body"><div className="esure-sidebar"><span className="selected"><Layers size={12}/> Scenarios</span><span><Terminal size={12}/> Runs</span><span><SlidersHorizontal size={12}/> Settings</span><div className="sidebar-bottom"><span/> All systems ready</div></div><div className="esure-main"><span className="mini-eyebrow">YOUR TESTING WORKSPACE</span><h4>Build. Test. Be sure.</h4><p>Payment flows, without the guesswork.</p><div className="scenario-box"><span className="scenario-icon"><ArrowUpRight size={15}/></span><div><b>XLM payment</b><small>Account → transfer → verification</small></div><span className="run-pill"><Play size={9} fill="currentColor"/> Run</span></div><div className="test-lines"><div><CircleCheck size={12}/><span>Create test accounts</span><small>Passed</small></div><div><CircleCheck size={12}/><span>Submit payment</span><small>Passed</small></div><div><CircleCheck size={12}/><span>Verify balance</span><small>Passed</small></div></div><div className="run-result"><Check size={12}/> Scenario complete <span>3 / 3 steps</span></div></div></div></div><span className="preview-label">ILLUSTRATIVE TEST RUN</span></div>
  return <div className="project-visual sendam-visual" aria-hidden="true"><div className="sendam-grid"/><div className="sendam-wordmark"><span><ArrowUpRight size={18}/></span> SendAm<span className="sendam-spark">✳</span></div><div className="chat-bubble outgoing">Send a little something.<span>11:42 <Check size={10}/><Check size={10}/></span></div><div className="payment-chat"><span className="payment-icon"><ArrowDownLeft size={20}/></span><small>SMALL MESSAGE. BIG POSSIBILITIES.</small><h4>Money moves.<br/>Life happens.</h4><div className="payment-check"><ShieldCheck size={14}/> Built around the conversation.</div></div><div className="chat-bubble incoming"><span className="chat-zap"><Zap size={14}/></span> A simpler way to send. <Heart size={12}/></div><span className="preview-label">PRODUCT CONCEPT</span></div>
}
