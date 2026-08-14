export const site = {
  name: 'Maria Namata',
  role: 'Front-end developer',
  location: 'Kampala, Uganda',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://marianamata.dev',
  email: 'namatamaria086@gmail.com',
  github: 'https://github.com/MariaNamata086',
  linkedin: 'https://www.linkedin.com/in/marianamata-front-enddeveloper/',
  cv: '/maria-namata-cv.pdf',
  description:
    'Front-end developer in Kampala. React, Next.js and TypeScript, for people who have something complicated to explain to strangers on the internet.',
} as const;

export const nav = [
  { label: 'Work', href: '/#work' },
  { label: 'Playground', href: '/#playground' },
  { label: 'About', href: '/about' },
  { label: 'Notes', href: '/notes' },
] as const;
