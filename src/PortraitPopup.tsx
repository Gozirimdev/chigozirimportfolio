import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { createPortal } from 'react-dom'
import './portrait-popup.css'

export default function PortraitPopup() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current!
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      triggerRef.current?.focus()
    }
  }, [open])

  return <>
    <button ref={triggerRef} type="button" className="portrait-trigger" aria-label="View my photo" aria-haspopup="dialog" onClick={() => setOpen(true)}><ArrowUpRight size={19} aria-hidden="true"/></button>
    {createPortal(<dialog ref={dialogRef} className="portrait-dialog" aria-label="Photo of Chigozirim Favour" onCancel={event => { event.preventDefault(); setOpen(false) }} onClick={event => { if (event.target === event.currentTarget) setOpen(false) }}>
      <div className="portrait-light-frame">
        <div className="portrait-inner">
          <img src="/internship/deebug.jpeg" alt="Chigozirim Favour working on a laptop at Deebug Institute"/>
          <button type="button" className="portrait-close" aria-label="Close photo" onClick={() => setOpen(false)}><X size={23} aria-hidden="true"/></button>
        </div>
      </div>
    </dialog>, document.body)}
  </>
}
