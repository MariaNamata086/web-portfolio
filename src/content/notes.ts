export type Note = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: 'Performance' | 'Payments' | 'Accessibility';
  readingMinutes: number;
  published: boolean;
};

export const notes: Note[] = [
  {
    slug: 'i-measured-my-own-site',
    title: 'I finally measured my own site. It takes four minutes to settle.',
    description:
      '4.25 MB, 34 images, and fifteen of them still missing after four minutes. What I found when I profiled a site I had already shipped.',
    date: '2026-08-11',
    category: 'Performance',
    readingMinutes: 5,
    published: true,
  },
  {
    slug: 'mobile-money-failure-states',
    title: 'Mobile money fails more than you would like. Design for it.',
    description:
      'Building the Cash Dash checkout, I learned that a payment can hang for ninety seconds and then quietly succeed. These are the four states that never appear in a Figma file.',
    date: '2026-08-12',
    category: 'Payments',
    readingMinutes: 6,
    published: false,
  },
  {
    slug: 'before-i-call-a-site-accessible',
    title: 'What I check before I call a site accessible',
    description:
      'An automated audit passing means your site has no obvious errors. It does not mean anyone can use it. This is the list I work through by hand on every handover.',
    date: '2026-08-13',
    category: 'Accessibility',
    readingMinutes: 4,
    published: false,
  },
];

export const publishedNotes = notes.filter((n) => n.published);
export const getNote = (slug: string) => notes.find((n) => n.slug === slug);
