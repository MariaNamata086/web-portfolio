import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Hiring, or have a site that needs building or rescuing? I read every message myself and reply within a day.',
  alternates: { canonical: '/contact' },
};

const faqs = [
  { q: 'Are you available right now?', a: ['Yes. I am open to remote front-end roles and to freelance projects, starting now. If your timeline is further out, say so and I will tell you honestly whether I expect to be free.'] },
  { q: 'Do you work with teams outside Uganda?', a: ['Yes, and I have worked async before. I am on UTC+3, which gives a full working day of overlap with Europe and about three hours with the east coast of North America. I am comfortable with written handovers, code review and standups that do not need me awake at three in the morning.'] },
  {
    q: 'What does a project cost?',
    a: [
      'I do not publish a price, because I have never seen one that survived contact with a real brief. A five page site for a training centre and a booking platform with payments are both "a website", and quoting either from a list would mean overcharging one of you.',
      'How it actually works: you tell me what the site has to do, we have a short conversation to fill in the gaps, and I send a fixed quote with what is included and what is not. No hourly billing, so the number does not move while I work. If the scope changes later we agree the difference before I start on it.',
      'If it helps, say what you have in mind when you write. I will tell you straight away whether it is realistic, rather than letting you find out after three emails.',
    ],
  },
  { q: 'What do you need from me to get started?', a: ['For a project: what the site has to do, roughly how many pages, and when you need it. Designs if you have them. For a role: the spec, the stack, and whether it is contract or permanent. None of it has to be polished.'] },
];

export default function ContactPage() {
  return (
    <div className='mx-auto max-w-site px-5.5 md:px-10'>
      <header className='max-w-[22ch] pt-15 pb-11'>
        <span className='mb-4.5 inline-block rounded-pill bg-clay px-3 py-1.5 font-mono text-[10.5px] tracking-[0.14em] text-on-clay uppercase'>
          Contact
        </span>
        <h1 className='font-display text-[clamp(42px,5.6vw,70px)] leading-[0.97] font-extrabold tracking-[-0.045em]'>
          Start a <span className='font-serif font-normal text-clay italic'>conversation</span>
        </h1>
        <p className='mt-5 max-w-[52ch] text-[20px] text-ink-soft'>
          Pick what fits and the form will ask for the right things. I read every message myself and reply within a day,
          usually sooner.
        </p>
      </header>

      <div className='grid items-start gap-11 pb-20 md:grid-cols-[1.25fr_0.75fr]'>
        <div className='relative rounded-card border border-line-soft bg-paper-2 p-6 md:p-8.5'>
          <ContactForm />
        </div>

        <aside>
          <div className='mb-4 rounded-[18px] border border-forest bg-forest p-6 text-on-forest'>
            <h2 className='font-display text-[20px] font-bold tracking-tight'>
              <span className='mr-2 inline-block h-2 w-2 rounded-full bg-ochre' />
              Open to work
            </h2>
            <p className='mt-2 text-[15.5px] opacity-88'>
              Available now for remote front-end roles, contract or permanent, and for freelance projects.
            </p>
          </div>

          <div className='mb-4 rounded-[18px] border border-line-soft bg-paper-2 p-6'>
            <h2 className='font-display text-[20px] font-bold tracking-tight'>Reach me directly</h2>
            <div className='mt-3 flex flex-col'>
              {[
                { small: 'Email', label: site.email, href: `mailto:${site.email}` },
                { small: 'Code', label: 'GitHub', href: site.github },
                { small: 'Professional', label: 'LinkedIn', href: site.linkedin },
              ].map((c) => (
                <a key={c.label} href={c.href} className='flex items-center justify-between border-b border-line py-3.5 text-[15.5px] transition-all duration-300 last:border-0 hover:pl-2 hover:text-clay'>
                  <span>
                    <small className='mb-0.5 block font-mono text-[9.5px] tracking-[0.08em] text-ink-faint uppercase'>{c.small}</small>
                    {c.label}
                  </span>
                  <span aria-hidden='true'>↗</span>
                </a>
              ))}
            </div>
          </div>

          <div className='rounded-[18px] border border-line-soft bg-paper-2 p-6'>
            <h2 className='font-display text-[20px] font-bold tracking-tight'>Where I am</h2>
            <p className='mt-2 text-[15.5px] text-ink-soft'>Kampala, Uganda. UTC+3.</p>
            <div className='mt-3.5 font-mono text-[11px] leading-[1.9] tracking-[0.06em] text-ink-faint'>
              Overlap with London · 6 hours
              <br />
              Overlap with Berlin · 7 hours
              <br />
              Overlap with New York · 3 hours
              <br />
              Overlap with Nairobi · full day
            </div>
          </div>
        </aside>
      </div>

      <section className='border-t border-line pt-17 pb-22'>
        <h2 className='mb-7.5 font-display text-[clamp(28px,3.4vw,40px)] font-bold tracking-[-0.04em]'>Before you write</h2>
        {faqs.map((f) => (
          <details key={f.q} className='group border-b border-line py-5.5'>
            <summary className='flex list-none cursor-pointer items-center justify-between gap-5 font-display text-[19px] font-semibold tracking-[-0.02em] [&::-webkit-details-marker]:hidden'>
              {f.q}
              <span aria-hidden='true' className='text-[22px] text-clay transition-transform group-open:rotate-45'>+</span>
            </summary>
            {f.a.map((p, i) => (
              <p key={i} className='mt-3 max-w-[66ch] text-[16.5px] text-ink-soft'>
                {p}
              </p>
            ))}
          </details>
        ))}
      </section>
    </div>
  );
}
