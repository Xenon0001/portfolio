import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

export default function HomePage() {
  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
    </main>
  );
}
