'use client';

import { useTranslations } from 'next-intl';

export default function Contact() {
  const t = useTranslations('contact');

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
          {t('title')}
        </h2>
        
        <a
          href={`mailto:${t('email')}`}
          className="text-3xl md:text-4xl text-[#FF4D2E] hover:text-[#FF4D2E]/80 transition-colors mb-12 inline-block"
        >
          {t('email')}
        </a>
        
        <div className="flex gap-8 justify-center items-center mt-12">
          <a
            href="https://github.com/Xenon0001"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://instagram.com/xenon.py"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/luis-rafael-eyoma/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
