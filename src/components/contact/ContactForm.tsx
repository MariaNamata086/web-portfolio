'use client';

import { useEffect, useRef, useState } from 'react';
import { site } from '@/lib/site';

type Intent = 'role' | 'project' | 'other';

const shapes: Record<Intent, { hint: string; org: string; a?: string; aph?: string; b?: string; bph?: string; msg: string; mph: string; btn: string }> = {
  role: {
    hint: 'Contract or permanent, remote. Tell me about the team and I will tell you honestly whether I am a fit.',
    org: 'Company', a: 'Role', aph: 'Front-end developer', b: 'Link to the job spec', bph: 'https://',
    msg: 'Anything else worth knowing', mph: 'The stack, the team size, whether it is contract or permanent.', btn: 'Send message',
  },
  project: {
    hint: 'A new site, or an existing one that needs fixing. Rough answers are fine, I am not going to hold you to them.',
    org: 'Company or organisation', a: 'Roughly how many pages', aph: 'About 10', b: 'When do you need it', bph: 'October, ideally',
    msg: 'What are you building, and what does it need to do', mph: 'What the site is for, who it is for, and anything going wrong with the current one.', btn: 'Send project brief',
  },
  other: {
    hint: 'Questions, corrections, or something I have not thought of. All welcome.',
    org: 'Company or organisation', msg: 'What is on your mind', mph: 'However much or little you like.', btn: 'Send message',
  },
};

export default function ContactForm() {
  const [intent, setIntent] = useState<Intent>('role');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const loadedAt = useRef<number | null>(null);
  useEffect(() => {
    loadedAt.current = Date.now();
  }, []);
  const shape = shapes[intent];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const next: Record<string, boolean> = {
      name: !data.name?.trim(),
      email: !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(data.email ?? ''),
      message: (data.message ?? '').trim().length < 10,
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) {
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    // Show success either way. An error just teaches the bot to retry.
    if (data.website || Date.now() - (loadedAt.current ?? 0) < 3000) {
      setState('done');
      return;
    }

    setState('sending');
    try {
      const payload: Record<string, string> = {
        Name: data.name!,
        Email: data.email!,
        'What this is about': intent === 'role' ? 'A role' : intent === 'project' ? 'A project' : 'Something else',
      };
      if (data.org) payload[shape.org] = data.org;
      if (intent === 'project' && data.budget) payload.Budget = data.budget;
      if (shape.a && data.a) payload[shape.a] = data.a;
      if (shape.b && data.b) payload[shape.b] = data.b;
      payload[shape.msg] = data.message!;
      payload._subject = `Portfolio: ${intent} from ${data.name}`;
      payload._template = 'table';

      const res = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || json.success !== 'true') throw new Error('failed');
      setState('done');
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div>
        <div className='mb-5 grid h-14.5 w-14.5 place-items-center rounded-full bg-forest text-[26px] text-on-forest'>✓</div>
        <h2 className='font-display text-[30px] font-bold tracking-[-0.03em]'>Got it, thank you!</h2>
        <p className='mt-3 max-w-[46ch] text-ink-soft'>
          Your message is in my inbox. I have sent a copy to the address you gave, so you have a record of what you wrote.
        </p>
        <ol className='mt-5.5 ml-5 list-decimal text-ink-soft'>
          <li className='mb-2.5'>I read it, usually the same day</li>
          <li className='mb-2.5'>You get a real reply from me within a day, not an autoresponder</li>
          <li>If it looks like a fit, I will suggest a call and send some times</li>
        </ol>
        <button onClick={() => setState('idle')} className='mt-6.5 cursor-pointer border-b-2 border-clay pb-0.5 font-medium text-clay'>
          Send another message
        </button>
      </div>
    );
  }

  const field = 'w-full rounded-xl border border-line bg-paper px-4 py-3.5 text-[16px] text-ink outline-none transition focus:border-clay';
  const bad = 'border-danger bg-danger-soft';
  const label = 'mb-2 block font-mono text-[10px] tracking-[0.1em] text-ink-faint uppercase';

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby='form-status'>
      <p id='form-status' role='status' aria-live='polite' className='sr-only'>
        {state === 'sending' ? 'Sending your message' : Object.values(errors).some(Boolean) ? 'The form has errors that need fixing' : ''}
      </p>

      {state === 'error' && (
        <div className='mb-5.5 rounded-2xl border border-danger bg-danger-soft px-4.5 py-4 text-[15.5px] text-danger'>
          <b className='mb-1 block font-display text-[16px] font-semibold'>That did not send</b>
          Something went wrong on my end, and your message is still in the form. Try again in a moment, or email me directly
          at <a href={`mailto:${site.email}`} className='font-medium underline'>{site.email}</a>.
        </div>
      )}

      <div className='mb-4.5'>
        <span className={label}>What is this about?</span>
        <div className='flex flex-wrap gap-2'>
          {(['role', 'project', 'other'] as Intent[]).map((k) => (
            <button
              key={k}
              type='button'
              onClick={() => setIntent(k)}
              aria-pressed={intent === k}
              className={`cursor-pointer rounded-pill border px-4.5 py-2.5 text-[14.5px] transition ${
                intent === k ? 'border-ink bg-ink text-paper' : 'border-line bg-paper text-ink-soft hover:border-ink'
              }`}
            >
              {k === 'role' ? 'A role' : k === 'project' ? 'A project' : 'Something else'}
            </button>
          ))}
        </div>
        <p className='mt-3.5 mb-6 text-[15px] text-ink-faint'>{shape.hint}</p>
      </div>

      <div className='absolute left-[-9999px] h-px w-px overflow-hidden' aria-hidden='true'>
        <label htmlFor='website'>Website</label>
        <input type='text' id='website' name='website' tabIndex={-1} autoComplete='off' />
      </div>

      <div className='grid gap-3.5 sm:grid-cols-2'>
        <div className='mb-4.5'>
          <label className={label} htmlFor='name'>Your name</label>
          <input id='name' name='name' className={`${field} ${errors.name ? bad : ''}`} aria-invalid={errors.name} placeholder='Jane Doe' />
          {errors.name && <p role='alert' className='mt-2 text-[14px] text-danger'>Please add your name so I know who I am replying to.</p>}
        </div>
        <div className='mb-4.5'>
          <label className={label} htmlFor='email'>Email</label>
          <input id='email' name='email' type='email' className={`${field} ${errors.email ? bad : ''}`} aria-invalid={errors.email} placeholder='janedoe@example.com' />
          {errors.email && <p role='alert' className='mt-2 text-[14px] text-danger'>That does not look like an email address.</p>}
        </div>
      </div>

      <div className='mb-4.5'>
        <label className={label} htmlFor='org'>{shape.org}</label>
        <input id='org' name='org' className={field} placeholder='Where you work' />
      </div>

      {intent === 'project' && (
        <div className='mb-4.5'>
          <label className={label} htmlFor='budget'>
            Budget you have in mind <span className='font-body text-[12px] tracking-normal normal-case'>optional</span>
          </label>
          <input id='budget' name='budget' className={field} placeholder='A range is fine, or leave it blank' />
          <p className='mt-2 text-[13.5px] text-ink-faint'>Only if you have one. It is not a filter, it just saves us both a few emails.</p>
        </div>
      )}

      {shape.a && (
        <div className='grid gap-3.5 sm:grid-cols-2'>
          <div className='mb-4.5'>
            <label className={label} htmlFor='a'>{shape.a} <span className='font-body text-[12px] tracking-normal normal-case'>optional</span></label>
            <input id='a' name='a' className={field} placeholder={shape.aph} />
          </div>
          <div className='mb-4.5'>
            <label className={label} htmlFor='b'>{shape.b} <span className='font-body text-[12px] tracking-normal normal-case'>optional</span></label>
            <input id='b' name='b' className={field} placeholder={shape.bph} />
          </div>
        </div>
      )}

      <div className='mb-4.5'>
        <label className={label} htmlFor='message'>{shape.msg}</label>
        <textarea id='message' name='message' rows={5} className={`${field} ${errors.message ? bad : ''}`} aria-invalid={errors.message} placeholder={shape.mph} />
        {errors.message && <p role='alert' className='mt-2 text-[14px] text-danger'>A sentence or two would help me reply properly.</p>}
      </div>

      <button
        type='submit'
        disabled={state === 'sending'}
        className='w-full cursor-pointer rounded-pill bg-clay px-7.5 py-4 text-[16px] font-semibold text-on-clay transition duration-300 hover:bg-ink hover:text-paper disabled:cursor-wait disabled:opacity-65'
      >
        {state === 'sending' ? 'Sending…' : shape.btn}
      </button>
      <p className='mt-4 text-[13.5px] leading-normal text-ink-faint'>
        Your message goes straight to my inbox. Nothing is stored anywhere else, and I will not add you to anything.
      </p>
    </form>
  );
}
