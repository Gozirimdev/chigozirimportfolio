// Roles and award supplied by Chigozirim. Add dates and exact chapter names when available.
export type EvidenceImage = { src: string; alt: string; caption?: string }
export type Evidence = { src?: string; images?: EvidenceImage[]; alt: string; caption: string }
export type Experience = {
  title: string
  organization: string
  category: string
  description: string
  dates?: string
  evidence: Evidence
}

export const showcase = {
  title: 'UNIZIK Tech Talent Showcase 1.0',
  result: '2nd place',
  description: 'Led the Fuuud team to a second-place finish at UNIZIK Tech Talent Showcase 1.0.',
  evidence: {
    alt: 'Fuuud team at UNIZIK Tech Talent Showcase 1.0',
    caption: 'Fuuud showcase highlights',
    images: [
      { src: '/fuuudpics/fuuudpics2.jpeg', alt: 'Fuuud team posing in front of the UNIZIK Tech Talent Showcase banner', caption: 'Fuuud team at the showcase' },
      { src: '/fuuudpics/fuuudpics1.jpeg', alt: 'A speaker addressing the panel during the showcase presentation', caption: 'Showcase presentation' },
      { src: '/fuuudpics/fuuudpics3.jpeg', alt: 'Official UNIZIK Tech Talent Showcase 1.0 winners poster listing Fuuud in second place', caption: 'Official results: Fuuud, second place' },
    ],
  } satisfies Evidence,
}

export const experiences: Experience[] = [
  {
    title: 'Director of Software', organization: 'NACOS', category: 'Student leadership',
    description: 'Organised a bootcamp on cloud computing and data science in partnership with the leader of the AWS Student Builders Group and DSN Anambra.',
    evidence: {
      alt: 'NACOS experience as Director of Software',
      caption: 'NACOS bootcamp highlights',
      images: [
        { src: '/nacosExperience/nacoswork.jpeg', alt: 'Bootcamp participants seated in a classroom', caption: 'NACOS bootcamp participants' },
        { src: '/nacosExperience/nacoswork2.jpeg', alt: 'A speaker addressing participants during the classroom session', caption: 'A session at the NACOS bootcamp' },
        { src: '/nacosExperience/dnspics.jpeg', alt: 'Two attendees standing in front of a DSN Anambra banner', caption: 'With the DSN Anambra community' },
      ],
    },
  },
  {
    title: 'Program Lead', organization: 'AWS student builder group', category: 'Community leadership',
    description: 'Program leadership within an AWS student builder community.',
    evidence: { alt: 'AWS student builder community activity', caption: 'Programme or community event' },
  },
  {
    title: 'Community involvement', organization: 'Women Techmakers', category: 'Tech community',
    description: 'Involvement in the Women Techmakers community.',
    evidence: { alt: 'Women Techmakers community activity', caption: 'Community event or participation' },
  },
  {
    title: 'Internship', organization: 'Deebug Institute', category: 'Practical experience',
    description: 'Internship experience at Deebug Institute.',
    evidence: { alt: 'Internship at Deebug Institute', caption: 'Internship photo or completion letter' },
  },
]

// Author Gozirimdev and merged status checked through GitHub on 23 September 2026.
export const contributions = [
  { repository: 'Navin-xmr / navin-contracts', title: 'Fix cancel_shipment escrow refund flow', category: 'Bug fix', number: 798, url: 'https://github.com/Navin-xmr/navin-contracts/pull/798', merged: '29 Aug 2026' },
  { repository: 'Web3Novalabs / predifi', title: 'Add regression tests for CORS, DB health, and OpenAPI', category: 'Testing', number: 1694, url: 'https://github.com/Web3Novalabs/predifi/pull/1694', merged: '29 Aug 2026' },
  { repository: 'MetroLogic / fluxapay_contract', title: 'Add merchant and stream integration guides', category: 'Documentation', number: 721, url: 'https://github.com/MetroLogic/fluxapay_contract/pull/721', merged: '29 Aug 2026' },
]

export type Credential = {
  title: string
  issuer: string
  date?: string
  url?: string
  evidence: Evidence
}

// No credential is claimed until its details are supplied.
export const credentials: Credential[] = []
