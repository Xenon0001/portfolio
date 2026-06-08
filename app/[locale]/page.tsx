import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('footer');

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <About />
      <Contact />
      <footer style={{ borderTop: '1px solid #1f1f1f' }} className="py-6 text-center text-sm text-gray-600">
        {t('copy')}
      </footer>
    </main>
  );
}
