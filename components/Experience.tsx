'use client';

import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

interface ExperienceEntry {
  rol: string;
  empresa: string;
  fecha: string;
  descripcion: string;
  link?: { texto: string; href: string } | null;
}

const entries: ExperienceEntry[] = [
  {
    rol: "Fundador",
    empresa: "Xenon.py",
    fecha: "Abril 2025 — Presente",
    descripcion: "Iniciativa tecnológica para reducir la brecha digital en Guinea Ecuatorial mediante soluciones digitales adaptadas a infraestructuras locales.",
    link: { texto: "Ver Xenon.py →", href: "#" }
  },
  {
    rol: "1er Puesto",
    empresa: "Hackathon Don Bosco — ESO",
    fecha: "Febrero 2026",
    descripcion: "Desarrollé ESO, una app de finanzas personales offline-first con arquitectura local (IndexedDB + Flask + SQLite). El jurado valoró el planteamiento del problema, la arquitectura y la demo funcional.",
    link: null
  },
  {
    rol: "Desarrollador Full-Stack",
    empresa: "Raíces — Plataforma cultural",
    fecha: "2025",
    descripcion: "Plataforma web de patrimonio cultural de Guinea Ecuatorial. Next.js 15, Supabase, Tailwind CSS.",
    link: null
  }
];

export default function Experience() {
  return (
    <section id="experiencia" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <div className="absolute left-0 h-full w-0.5 bg-[#FF4D2E] opacity-30"></div>
          
          <div className="space-y-12">
            {entries.map((entry, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="relative pl-8"
              >
                <div className="absolute left-0 transform -translate-x-1/2 w-4 h-4 bg-[#FF4D2E] rounded-full"></div>
                
                <h3 className="text-xl font-bold text-[#FF4D2E] mb-1">
                  {entry.rol}
                </h3>
                
                <p className="text-white font-semibold mb-1">
                  {entry.empresa}
                </p>
                
                <p className="text-sm text-[#6b7280] mb-3">
                  {entry.fecha}
                </p>
                
                <p className="text-[#9ca3af] mb-3">
                  {entry.descripcion}
                </p>
                
                {entry.link && (
                  <a
                    href={entry.link.href}
                    className="text-[#FF4D2E] hover:underline"
                  >
                    {entry.link.texto}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
