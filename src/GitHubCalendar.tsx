import { useEffect, useState } from 'react'
import { profile } from './data'
import './github-calendar.css'

type Day = { date: string; count: number; level: number }
type Activity = { total: Record<string, number>; contributions: Day[] }
const endpoint = 'https://github-contributions-api.jogruber.de/v4/Gozirimdev'
const colors = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']
const dateOf = (value: string) => new Date(`${value}T00:00:00Z`)
const describe = (day: Day) => `${day.count.toLocaleString()} contribution${day.count === 1 ? '' : 's'} on ${dateOf(day.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}`

export default function GitHubCalendar() {
  const [data, setData] = useState<{ last: Activity; all: Activity }>()
  const [range, setRange] = useState('last')
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [active, setActive] = useState(0)
  const [detail, setDetail] = useState('Select a day to see its contributions.')

  useEffect(() => {
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 20000)
    let mounted = true
    setError(false)
    async function get(period: string): Promise<Activity> {
      const response = await fetch(`${endpoint}?y=${period}`, { signal: controller.signal })
      if (!response.ok) throw new Error('Activity unavailable')
      const result = await response.json() as Activity
      if (!result.total || !Array.isArray(result.contributions) || !result.contributions.length || result.contributions.some(day => !/^\d{4}-\d{2}-\d{2}$/.test(day.date) || !Number.isInteger(day.count) || day.count < 0 || !Number.isInteger(day.level) || day.level < 0 || day.level > 4)) throw new Error('Invalid activity')
      return result
    }
    Promise.all([get('last'), get('all')]).then(([last, all]) => {
      if (mounted) setData({ last, all })
    }).catch(() => { if (mounted) setError(true) }).finally(() => window.clearTimeout(timeout))
    return () => { mounted = false; controller.abort(); window.clearTimeout(timeout) }
  }, [attempt])

  const days = data ? (range === 'last' ? data.last.contributions : data.all.contributions.filter(day => day.date.startsWith(`${range}-`))).slice().sort((a, b) => a.date.localeCompare(b.date)) : []
  const offset = days.length ? dateOf(days[0].date).getUTCDay() : 0
  const weeks = Math.ceil((days.length + offset) / 7)
  const total = data ? (range === 'last' ? data.last.total.lastYear : data.all.total[range]) : 0
  const months = days.flatMap((day, index) => {
    const date = dateOf(day.date)
    return (date.getUTCDate() === 1 || index === 0) ? [{ label: date.toLocaleDateString('en', { month: 'short', timeZone: 'UTC' }), column: Math.floor((index + offset) / 7) + 1 }] : []
  }).filter((month, index, all) => index === all.length - 1 || all[index + 1].column - month.column > 1)

  return <div className="github-calendar">
    <div className="calendar-header">
      <h3 aria-live="polite">{data ? <><strong>{total.toLocaleString()}</strong> contributions {range === 'last' ? 'in the last year' : `in ${range}`}</> : 'GitHub contribution activity'}</h3>
      {data && <label className="calendar-range">Period<select value={range} onChange={event => { setRange(event.target.value); setActive(0); setDetail('Select a day to see its contributions.') }}><option value="last">Last year</option>{Object.keys(data.all.total).filter(year => /^\d{4}$/.test(year)).sort().reverse().map(year => <option key={year}>{year}</option>)}</select></label>}
    </div>
    {!data && !error && <p className="calendar-message" role="status">Loading GitHub activity…</p>}
    {error && <div className="calendar-message" role="status"><p>GitHub activity is temporarily unavailable.</p><button onClick={() => setAttempt(value => value + 1)}>Try again</button><a href={profile.github} target="_blank" rel="noreferrer">View activity on GitHub ↗</a></div>}
    {data && <>
      <div className="calendar-scroll" role="region" aria-label="Daily GitHub contributions. Use arrow keys to explore days, or scroll horizontally." tabIndex={0}>
        <div className="calendar-chart" style={{ minWidth: weeks * 16 + 38 }}>
          <div className="calendar-months" style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}>{months.map((month, index) => <span key={index} style={{ gridColumn: month.column }}>{month.label}</span>)}</div>
          <div className="calendar-body"><div className="calendar-weekdays" aria-hidden="true"><span>Mon</span><span>Wed</span><span>Fri</span></div><div className="calendar-days" style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}>{days.map((day, index) => <button key={day.date} className="calendar-day" style={{ background: colors[day.level], gridColumn: Math.floor((index + offset) / 7) + 1, gridRow: (index + offset) % 7 + 1 }} title={describe(day)} aria-label={describe(day)} tabIndex={index === active ? 0 : -1} onMouseEnter={() => setDetail(describe(day))} onFocus={() => { setActive(index); setDetail(describe(day)) }} onClick={() => { setActive(index); setDetail(describe(day)) }} onKeyDown={event => {
            const step = ({ ArrowRight: 7, ArrowLeft: -7, ArrowDown: 1, ArrowUp: -1 } as Record<string, number>)[event.key]
            if (step !== undefined) { event.preventDefault(); const next = Math.max(0, Math.min(days.length - 1, index + step)); (event.currentTarget.parentElement?.children[next] as HTMLButtonElement)?.focus() }
          }}/>)}</div></div>
        </div>
      </div>
      <div className="calendar-caption"><p aria-live="polite">{detail}</p><div className="calendar-legend" aria-label="Color intensity: fewer to more contributions">Less{colors.map(color => <span key={color} style={{ background: color }}/>)}More</div></div>
      <p className="calendar-source">Activity from GitHub · Updates hourly · <a href="https://github.com/grubersjoe/github-contributions-api" target="_blank" rel="noreferrer">Data source ↗</a></p>
    </>}
  </div>
}
