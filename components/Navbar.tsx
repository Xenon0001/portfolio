'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navLinks = [
    { label: t('experience'), href: '#experiencia' },
    { label: t('projects'), href: '#proyectos' },
    { label: t('about'), href: '#sobre-mi' },
    { label: t('contact'), href: '#contacto' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-[#FF4D2E]">LR</div>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex gap-2">
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

        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md px-6 py-4">
          <div className="flex flex-col gap-4 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
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
      )}
    </nav>
  );
}
