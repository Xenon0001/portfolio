'use client';

import { useTranslations } from 'next-intl';

export default function Blog() {
  const t = useTranslations('blog');

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
          {t('title')}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:border-[#FF4D2E]/50 transition-colors">
            <p className="text-[#FF4D2E] text-sm font-medium mb-3">
              {t('article1.date')}
            </p>
            <h3 className="text-2xl font-bold text-white mb-4">
              {t('article1.title')}
            </h3>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Leer más →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
