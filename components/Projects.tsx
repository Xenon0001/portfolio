'use client';

import { useState } from 'react';
import { useTranslations, useRawTranslations } from '@/lib/useTranslations';
import { motion } from 'framer-motion';
import Image from 'next/image';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const projectImages: Record<string, string> = {
  'GES': '/assets/ges.png',
  'Raíces': '/assets/raices.png',
  'ESO': '/assets/eso.png',
};

export default function Projects() {
  const t = useTranslations('projects');
  const [filter, setFilter] = useState(t('filters.all'));

  const projects = useRawTranslations('projects')?.items as Array<{
    name: string;
    description: string;
    type: string;
    github: string | null;
    preview: string | null;
  }>;

  const filteredProjects = filter === t('filters.all')
    ? projects
    : projects.filter(p => p.type === filter);

  return (
    <section id="proyectos" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12">
          {t('title')}
        </h2>

        <div className="flex gap-4 mb-12">
          <button
            onClick={() => setFilter(t('filters.all'))}
            className={`px-6 py-2 rounded-full transition-colors ${
              filter === t('filters.all')
                ? 'bg-[#FF4D2E] text-white'
                : 'border border-gray-600 text-gray-400 hover:text-white'
            }`}
          >
            {t('filters.all')}
          </button>
          <button
            onClick={() => setFilter(t('filters.web'))}
            className={`px-6 py-2 rounded-full transition-colors ${
              filter === t('filters.web')
                ? 'bg-[#FF4D2E] text-white'
                : 'border border-gray-600 text-gray-400 hover:text-white'
            }`}
          >
            {t('filters.web')}
          </button>
          <button
            onClick={() => setFilter(t('filters.desktop'))}
            className={`px-6 py-2 rounded-full transition-colors ${
              filter === t('filters.desktop')
                ? 'bg-[#FF4D2E] text-white'
                : 'border border-gray-600 text-gray-400 hover:text-white'
            }`}
          >
            {t('filters.desktop')}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              className="bg-[#111111] rounded-xl border border-transparent hover:border-[#FF4D2E]/30 transition-colors overflow-hidden"
            >
              <div className="relative w-full aspect-video bg-[#1a1a1a] rounded-t-xl overflow-hidden">
                {projectImages[project.name] ? (
                  <Image
                    src={projectImages[project.name]}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-600 text-sm">
                    [preview]
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {project.name}
                </h3>

                <p className="text-sm text-[#9ca3af] mb-4">
                  {project.description}
                </p>

                <div className="flex gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF4D2E] hover:underline"
                    >
                      GitHub →
                    </a>
                  )}
                  {project.preview && (
                    <a
                      href={project.preview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF4D2E] hover:underline"
                    >
                      Preview →
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
