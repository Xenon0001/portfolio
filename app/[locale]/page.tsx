import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';

export default function HomePage() {
  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <About />
      <Contact />
      <footer style={{ borderTop: '1px solid #1f1f1f' }} className="py-6 text-center text-sm text-gray-600">
        © 2026 Luis Rafael Eyoma
      </footer>
    </main>
  );
}
