'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function Projects() {
  const t = useTranslations('projects');
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 'ges',
      type: 'desktop',
      title: t('ges.title'),
      description: t('ges.description'),
      tech: t('ges.tech'),
      github: 'https://github.com/Xenon0001',
      preview: '#'
    },
    {
      id: 'raices',
      type: 'web',
      title: t('raices.title'),
      description: t('raices.description'),
      tech: t('raices.tech'),
      github: '#',
      preview: '#'
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.type === filter);

  return (
    <section id="proyectos" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
          {t('title')}
        </h2>
        
        <div className="flex gap-4 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full transition-colors ${
              filter === 'all' 
                ? 'bg-[#FF4D2E] text-white' 
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {t('filters.all')}
          </button>
          <button
            onClick={() => setFilter('web')}
            className={`px-6 py-2 rounded-full transition-colors ${
              filter === 'web' 
                ? 'bg-[#FF4D2E] text-white' 
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {t('filters.web')}
          </button>
          <button
            onClick={() => setFilter('desktop')}
            className={`px-6 py-2 rounded-full transition-colors ${
              filter === 'desktop' 
                ? 'bg-[#FF4D2E] text-white' 
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {t('filters.desktop')}
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:border-[#FF4D2E]/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[#FF4D2E] text-sm font-medium">
                  {project.type === 'web' ? t('filters.web') : t('filters.desktop')}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">
                {project.title}
              </h3>
              
              <p className="text-gray-400 mb-4">
                {project.description}
              </p>
              
              <p className="text-sm text-gray-500 mb-6">
                {project.tech}
              </p>
              
              <div className="flex gap-4">
                {project.github !== '#' && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                )}
                {project.preview !== '#' && (
                  <a
                    href={project.preview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Preview
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
