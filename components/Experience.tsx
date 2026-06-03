'use client';

import { useTranslations } from 'next-intl';

export default function Experience() {
  const t = useTranslations('experience');

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
          {t('title')}
        </h2>
        
        <div className="relative">
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-800"></div>
          
          <div className="space-y-16">
            <div className="relative pl-8 md:pl-0 md:grid md:grid-cols-2 md:gap-8">
              <div className="md:text-right md:pr-8">
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-[#FF4D2E] rounded-full"></div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t('entry1.title')}
                </h3>
                <p className="text-[#FF4D2E] mb-4">{t('entry1.date')}</p>
                <p className="text-gray-400">{t('entry1.description')}</p>
              </div>
              <div className="md:pl-8"></div>
            </div>
            
            <div className="relative pl-8 md:pl-0 md:grid md:grid-cols-2 md:gap-8">
              <div className="md:pr-8"></div>
              <div className="md:pl-8">
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-[#FF4D2E] rounded-full"></div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t('entry2.title')}
                </h3>
                <p className="text-[#FF4D2E] mb-4">{t('entry2.date')}</p>
                <p className="text-gray-400">{t('entry2.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
