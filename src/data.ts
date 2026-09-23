export const profile = {
  name: 'Chigozirim Favour',
  github: 'https://github.com/Gozirimdev',
  email: 'chigozirimfavour001@gmail.com',
  linkedin: 'https://www.linkedin.com/in/favour-chigozirim-3aa345370',
}

export type Project = {
  id: string
  number: string
  category: 'Product engineering' | 'Developer tools' | 'Frontend development'
  title: string
  subtitle: string
  description: string
  tags: string[]
  status: string
  problem: string
  features: string[]
  decision: string
  note: string
  github?: string
  live?: string
  screenshot?: string
}

export const projects: Project[] = [
  {
    id: 'mercient', number: '01', category: 'Product engineering',
    title: 'Mercient Collection', subtitle: 'A considered shopping experience.',
    description: 'Fashion e-commerce, from first discovery to a country-aware checkout.',
    tags: ['React', 'TypeScript', 'Express', 'MongoDB'], status: 'Live website',
    problem: 'A clothing brand needs more than a product gallery. Shoppers need to keep their cart, choose product options, and understand pricing as they move toward checkout.',
    features: ['Product, cart, and order data models connected to an Express API.', 'Guest and signed-in cart handling, with product options such as size and colour.', 'Country-aware pricing with cached exchange rates and expiring, signed checkout quotes.'],
    decision: 'Checkout pricing lives on the server. Signed quotes can be checked against a changed cart or delivery country, while decimal rounding helps keep monetary calculations consistent.',
    note: 'Explore the live storefront at mercientcollection.com. The source repository is private.',
    live: 'https://mercientcollection.com',
    screenshot: '/projects/mercient-live.jpg',
  },
  {
    id: 'fuuud', number: '02', category: 'Product engineering',
    title: 'Fuuud Health', subtitle: 'Care, closer.',
    description: 'Connecting practitioner discovery with a more thoughtful booking experience.',
    tags: ['Next.js', 'TypeScript', 'Python', 'MongoDB'], status: 'Prototype',
    problem: 'Finding a practitioner and securing an appointment should feel like one clear journey. Behind that journey, appointment availability and account access need careful handling.',
    features: ['A Next.js interface with a Python/FastAPI backend.', 'Account registration, verification, recovery, and practitioner discovery endpoints.', 'Transactional appointment booking and cancellation, with ownership checks.'],
    decision: 'Booking conditionally claims an available slot within a database transaction. Conflicts return an explicit error, so competing requests cannot simply assume the same slot is still available.',
    note: 'A healthcare access prototype using fictional practitioner records. Some wider product experiences remain simulated; this is not presented as a clinical service.',
    live: 'https://fuuud-health.vercel.app/',
    screenshot: '/projects/fuuud-live.jpg',
  },
  {
    id: 'esure', number: '03', category: 'Developer tools',
    title: 'Esure', subtitle: 'Test with confidence.',
    description: 'Repeatable Stellar payment scenarios. Clear results. Understandable failures.',
    tags: ['Next.js', 'TypeScript', 'Fastify', 'Stellar'], status: 'Testnet MVP',
    problem: 'Testing a payment integration involves account setup, funding, transactions, and balance checks. Esure brings those steps into repeatable scenarios with a single report.',
    features: ['A dashboard for scenario execution, progress, and structured reports.', 'A backend runner with concurrency limits, timeouts, and per-step assertions.', 'Scenario validation and sanitized failure details, supported by automated tests.'],
    decision: 'Each run records its steps and assertions separately. That makes a failed expectation distinguishable from an execution problem and gives developers a clearer place to start debugging.',
    note: 'Built for Stellar Testnet. The repository includes contributor work. Selected validation, storage, error, and rate-limiter tests passed during the portfolio review.',
    github: 'https://github.com/Esureorg/Esure', live: 'https://esure-testnet.vercel.app',
    screenshot: '/projects/esure-live.jpg',
  },
  {
    id: 'sendam', number: '04', category: 'Product engineering',
    title: 'SendAm', subtitle: 'Payments, in the conversation.',
    description: 'A WhatsApp-first payment application with asynchronous processing behind the scenes.',
    tags: ['Node.js', 'PostgreSQL', 'Redis', 'React'], status: 'In development',
    problem: 'Chat-based payment requests can arrive more than once, fail midway, or take time to settle. A simple conversation needs a backend that can account for those cases.',
    features: ['Separate API, admin dashboard, landing page, and development chat simulator.', 'Payment request fingerprinting and idempotency records to handle repeat requests.', 'Background job infrastructure and decimal-aware money utilities.'],
    decision: 'A repeated request can reuse a recorded result. A transfer already processing is treated differently from an operation that never started, to avoid blindly submitting the payment again.',
    note: 'An actively developing project with contributors. The local Stellar version differs from older public documentation; this case study does not claim live-money production readiness.',
    github: 'https://github.com/Gozirimdev/SendAm',
    live: 'https://send-am-web.vercel.app/',
    screenshot: '/projects/sendam-live.jpg',
  },
  {
    id: 'ije', number: '05', category: 'Frontend development',
    title: 'Ije Portfolio', subtitle: 'A stage for stories and movement.',
    description: 'A personal website for Chijioke Izunegbu, a researcher in African dance performance and aesthetics.',
    tags: ['React', 'JavaScript', 'Vite', 'CSS'], status: 'Live website',
    problem: 'A creative professional needs a digital space that brings together their practice, experience, and selected work, while making it straightforward for collaborators to get in touch.',
    features: ['A visual introduction to research, choreography, and cultural storytelling.', 'A project carousel with detail dialogs, QR links, and focus restoration.', 'Responsive layouts, reduced-motion styles, and a contact enquiry form.'],
    decision: 'Project details open in native dialogs, keeping visitors in the same browsing context. Focus returns to the original trigger after dismissal, helping keyboard users continue exploring.',
    note: 'A frontend project built with React and Vite. Contact enquiries use a third-party form service.',
    live: 'https://philip-chijioke.vercel.app/',
    screenshot: '/projects/ije-live.jpg',
  },
]
