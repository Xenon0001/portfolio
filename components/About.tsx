'use client';

import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('about');

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
          {t('title')}
        </h2>
        
        <div className="space-y-6 text-lg text-gray-300">
          <p>{t('paragraph1')}</p>
          <p>{t('paragraph2')}</p>
          <p>{t('paragraph3')}</p>
          <p>{t('paragraph4')}</p>
        </div>
        
        <div className="mt-12">
          <p className="text-[#FF4D2E] font-medium">{t('hobbies')}</p>
        </div>
      </div>
    </section>
  );
}
