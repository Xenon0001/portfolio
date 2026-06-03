'use client';

import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-[#FF4D2E]/10 text-[#FF4D2E] rounded-full text-sm font-medium">
            {t('available')}
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          {t('name')}
        </h1>
        
        <p className="text-2xl md:text-3xl text-gray-300 mb-6">
          {t('tagline')}
        </p>
        
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
          {t('description')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a
            href="#proyectos"
            className="px-8 py-4 bg-[#FF4D2E] text-white rounded-full font-medium hover:bg-[#FF4D2E]/90 transition-colors"
          >
            {t('cta')}
          </a>
        </div>
        
        <div className="flex gap-6 justify-center items-center">
          <a
            href="https://github.com/Xenon0001"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/luis-rafael-eyoma/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://instagram.com/xenon.py"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
