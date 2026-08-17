'use client';

import { useState } from 'react';
import ChatPanel from './ChatPanel';

export default function ChatLauncher() {
  const [open, setOpen] = useState(false);

  if (open) return <ChatPanel onClose={() => setOpen(false)} />;

  return (
    <button
      onClick={() => setOpen(true)}
      className='fixed right-4 bottom-4 z-80 flex items-center gap-3 rounded-pill bg-clay px-5 py-3.5 text-[15px] font-medium text-on-clay shadow-(--shadow-fab) transition duration-300 hover:-translate-y-1 md:right-6.5 md:bottom-6.5'
    >
      <span className='h-2 w-2 rounded-full bg-ochre' />
      Ask about my work
    </button>
  );
}
