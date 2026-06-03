'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">LR</div>
        
        <div className="flex gap-2">
          <button
            onClick={() => switchLocale('es')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              locale === 'es' ? 'bg-[#FF4D2E] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            ES
          </button>
          <button
            onClick={() => switchLocale('en')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              locale === 'en' ? 'bg-[#FF4D2E] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => switchLocale('fr')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              locale === 'fr' ? 'bg-[#FF4D2E] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            FR
          </button>
        </div>
      </div>
    </nav>
  );
}
