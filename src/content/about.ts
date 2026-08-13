export const story = [
  { tag: 'The start', title: 'Filling in the gaps', body: 'Teaching yourself leaves holes you do not know are there until something breaks in front of a client. I have spent three years finding mine and filling them in, usually in that order.' },
  { tag: '2022 to 2024', title: "Building against someone else's API", body: 'At Afriven I worked on two platforms at once, web and mobile, against endpoints another team owned. Most of what I learned that year was about the seam between us.' },
  { tag: '2024 to now', title: 'Owning the whole thing', body: 'Since then I have taken sites from the first conversation through to live on my own. It is the part I like most, and the part with nowhere to hide.' },
];

export const howIWork = [
  { title: 'Read the design properly first', body: 'Before I write anything I go through the Figma and write down what is missing. What happens when this list is empty, when this name is forty characters long, when this request fails. It is a short conversation at the start and it saves a long one later.' },
  { title: 'Build the states nobody drew', body: 'Most designs show one state: everything loaded, everything fine. Real users meet the other ones. Loading, empty, error, offline, halfway through. I build those deliberately rather than discovering them in review.' },
  { title: 'Test on a real phone, on a real connection', body: 'Not the simulator, and not office wifi. I throttle the network, disable the cache and watch the first load the way a stranger would see it. I learned to do this the hard way, and I wrote about the day I found out.' },
  { title: 'Hand over something someone else can pick up', body: 'Readable structure, comments where the reason is not obvious from the code, and a README that says how to run it. I have inherited enough undocumented projects to know what the alternative costs.' },
  { title: 'Stay reachable after launch', body: 'Sites need small changes for months after they go live. I have kept the OCN site running for two years. Being the person who still answers is most of why clients come back.' },
];

export const lessons = [
  { when: 'January 2024 to February 2026 · Freelance', org: 'Optical Communication Networks', context: 'Front-end work across the company site, Cash Dash, and a run of small business sites.', lesson: 'A design file shows you the day everything works. The real job is the other days, and nobody hands you those screens.' },
  { when: '2022 to 2024', org: 'Afriven Limited', context: 'Web and mobile, working alongside a backend team on an e-commerce platform and its companion app.', lesson: 'Most of the hard bugs live in the seam between two teams, and the cheapest time to argue about who owns validation is before either of you writes it.' },
  { when: 'Alongside, and ongoing', org: 'Building sites on my own', context: 'Cinnamon Holidays Safaris and St Joseph Agricultural Farm, designed and built solo, both live.', lesson: 'When you own the whole thing, there is nobody to catch what you missed. I shipped a site I was proud of and did not measure it for a year.' },
];

export const beliefs = [
  { title: 'A design file is a starting point, not a specification', body: 'The best work happens when the designer and I can ask each other questions. I would rather raise five awkward ones early than guess and rebuild.' },
  { title: 'It is not finished when it looks right on my machine', body: 'My laptop, my browser and my cache are the least representative test there is. The first real load, on a real phone, is the one that counts.' },
  { title: 'Accessibility work tends to improve the site for everyone', body: 'Clear labels, sensible focus order and honest error messages help the people they are aimed at, and quietly help everyone else too.' },
  { title: 'Most performance problems are decisions, not mysteries', body: 'Something was chosen, usually for a sensible reason, and never revisited. Measuring first usually tells you which decision it was.' },
  { title: 'A handover that needs a phone call is not finished', body: 'Whoever picks the project up next, including me in six months, should be able to run it from the README and read the code without a guide.' },
];
