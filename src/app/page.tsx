import Hero from '@/components/home/Hero';
import WorkSection from '@/components/home/WorkSection';
import Playground from '@/components/home/Playground';
import AboutTeaser from '@/components/home/AboutTeaser';
import Skills from '@/components/home/Skills';
import NotesTeaser from '@/components/home/NotesTeaser';
import ContactSection from '@/components/home/ContactSection';
import { site } from '@/lib/site';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: site.email,
  address: { '@type': 'PostalAddress', addressLocality: 'Kampala', addressCountry: 'UG' },
  sameAs: [site.github, site.linkedin],
  knowsAbout: ['React', 'Next.js', 'TypeScript', 'React Native', 'Tailwind CSS', 'Web accessibility'],
};

export default function HomePage() {
  return (
    <>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <Hero />
      <WorkSection />
      <Playground />
      <AboutTeaser />
      <Skills />
      <NotesTeaser />
      <ContactSection />
    </>
  );
}
