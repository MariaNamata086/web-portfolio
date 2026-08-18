import type { StaticImageData } from 'next/image';
import cinnamon from '@public/work/cinnamon.png';
import afriven from '@public/work/afriven.png';
import stjoseph from '@public/work/stjoseph.jpg';
import cashdash from '@public/work/cashdash.jpg';

export type Project = {
  slug: string;
  title: string;
  role: string;
  body: string;
  tags: string[];
  liveUrl?: string;
  shot?: { src: StaticImageData; alt: string; dark?: boolean };
  layout: 'wide' | 'plain';
};

export const projects: Project[] = [
  {
    slug: 'cinnamon-holidays-safaris',
    title: 'Cinnamon Holidays Safaris',
    role: 'Design + build, solo · 2026',
    body: 'A safari operator with a great story and no good way to tell it. I built the whole site on my own: destination and package pages, an experiences section, and inquiry forms that land in their inbox instead of a void. It is also the site that taught me to profile my own work.',
    tags: ['Next.js', 'Tailwind', 'SEO', 'Vercel'],
    liveUrl: 'https://cinnamonholidayssafaris.com',
    shot: { src: cinnamon, alt: 'Cinnamon Holidays Safaris homepage' },
    layout: 'wide',
  },
  {
    slug: 'cash-dash',
    title: 'Cash Dash',
    role: 'Front-end · OCN · not yet public',
    body: 'A school wallet system, so parents can send pocket money and school fees to a child without cash changing hands. I built the front end straight from the Figma files, wired it to the mobile money APIs, and handed it over. The part worth talking about is the failure states. Mobile money times out far more often than anyone plans for, and the screen has to be honest about that without frightening a parent halfway through paying school fees.',
    tags: ['React', 'REST APIs', 'Mobile money', 'Figma handoff'],
    shot: { src: cashdash, alt: 'Cash Dash school wallet landing page on a laptop and phone', dark: true },
    layout: 'wide',
  },
  {
    slug: 'afriven',
    title: 'Afriven',
    role: 'Web + mobile · Afriven Limited',
    body: 'An e-commerce platform and the app that goes with it. I worked across both, React Native on mobile and Next.js on the web, plugging into the backend team\'s Node and Express APIs. Push notifications went in later and moved engagement enough that everyone noticed.',
    tags: ['React Native', 'Next.js', 'Redux', 'Push'],
    liveUrl: 'https://afriven.com',
    shot: { src: afriven, alt: 'Afriven homepage' },
    layout: 'wide',
  },
  {
    slug: 'st-joseph-agricultural-farm',
    title: 'St Joseph Agricultural Farm',
    role: 'Design + build, solo',
    body: 'A model farm and training centre in Luweero, running since 1980, that needed prospective farmers to be able to find it. Built on my own, static where it could be and dynamic where it had to be, with the programme pages structured so search engines could read them properly.',
    tags: ['Next.js', 'Static + dynamic', 'SEO'],
    liveUrl: 'https://stjosephruraltrainingcenter.com',
    shot: { src: stjoseph, alt: 'St Joseph Agricultural Farm homepage' },
    layout: 'wide',
  },
];

export const skills = [
  { label: 'Build', items: ['React', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'React Native', 'Redux'] },
  { label: 'Design to code', items: ['Figma', 'Design handoff', 'Design systems', 'Tailwind CSS', 'Responsive design', 'CSS animation'] },
  { label: 'Connect', items: ['REST APIs', 'Node.js', 'Express', 'Mobile money'] },
  { label: 'Care about', items: ['Accessibility (WCAG)', 'SEO', 'Core Web Vitals', 'Cross-browser'] },
  { label: 'Ship with', items: ['Git', 'GitHub', 'GitLab', 'Vercel', 'Code review', 'Agile'] },
];
