'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

interface Project {
  nombre: string;
  descripcion: string;
  tipo: string;
  tags: string[];
  github: string | null;
  preview: string | null;
}

const projects: Project[] = [
  {
    nombre: "GES",
    descripcion: "Sistema de Gestión Escolar para centros educativos en Guinea Ecuatorial. Matrícula, pagos en FCFA, reportes.",
    tipo: "Escritorio",
    tags: ["Python", "Tkinter", "FastAPI", "SQLite"],
    github: "https://github.com/Xenon0001/GES",
    preview: null
  },
  {
    nombre: "Raíces",
    descripcion: "Plataforma web de patrimonio cultural de Guinea Ecuatorial dirigida a instituciones y colaboradores.",
    tipo: "Web",
    tags: ["Next.js", "Supabase", "Tailwind CSS"],
    github: null,
    preview: "https://raices-ge.vercel.app"
  },
  {
    nombre: "ESO",
    descripcion: "App de finanzas personales offline-first. Ganadora del Hackathon Don Bosco 2026.",
    tipo: "Web",
    tags: ["Vanilla JS", "IndexedDB", "Flask", "SQLite"],
    github: "https://github.com/Xenon0001/ESO",
    preview: null
  }
];

export default function Projects() {
  const [filter, setFilter] = useState('Todos');

  const filteredProjects = filter === 'Todos'
    ? projects
    : projects.filter(p => p.tipo === filter);

  return (
    <section id="proyectos" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12">
          Proyectos
        </h2>

        <div className="flex gap-4 mb-12">
          <button
            onClick={() => setFilter('Todos')}
            className={`px-6 py-2 rounded-full transition-colors ${
              filter === 'Todos'
                ? 'bg-[#FF4D2E] text-white'
                : 'border border-gray-600 text-gray-400 hover:text-white'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter('Web')}
            className={`px-6 py-2 rounded-full transition-colors ${
              filter === 'Web'
                ? 'bg-[#FF4D2E] text-white'
                : 'border border-gray-600 text-gray-400 hover:text-white'
            }`}
          >
            Web
          </button>
          <button
            onClick={() => setFilter('Escritorio')}
            className={`px-6 py-2 rounded-full transition-colors ${
              filter === 'Escritorio'
                ? 'bg-[#FF4D2E] text-white'
                : 'border border-gray-600 text-gray-400 hover:text-white'
            }`}
          >
            Escritorio
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
              <div className="aspect-video bg-[#1a1a1a] flex items-center justify-center">
                <span className="text-gray-600">[preview]</span>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {project.nombre}
                </h3>

                <p className="text-sm text-[#9ca3af] mb-4">
                  {project.descripcion}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-[#1f1f1f] text-[#FF4D2E] text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

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
