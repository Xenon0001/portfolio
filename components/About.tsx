'use client';

import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function About() {
  return (
    <section id="sobre-mi" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-white mb-2">
              Sobre mí
            </h2>
            <div className="w-12 h-1 bg-[#FF4D2E] mt-2 mb-6"></div>
            
            <div className="space-y-4 text-[#9ca3af] text-base leading-relaxed">
              <p>
                Empecé a programar a los 15 años por curiosidad, sin cursos ni tutores. Hoy estudio Ingeniería Informática en la UNED y construyo software que resuelve problemas reales.
              </p>
              <p>
                Fundé Xenon.py con una idea simple: Guinea Ecuatorial merece herramientas digitales pensadas para su contexto. No adaptaciones de otras realidades — soluciones propias.
              </p>
              <p>
                Me enfoco en desarrollo web y de escritorio. Cuando no estoy programando, estoy diseñando en 3D, dibujando o jugando al ajedrez.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white font-semibold mb-4">
              Intereses
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[#9ca3af]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                </svg>
                <span>Diseño 3D</span>
              </div>
              
              <div className="flex items-center gap-3 text-[#9ca3af]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
                <span>Dibujo</span>
              </div>
              
              <div className="flex items-center gap-3 text-[#9ca3af]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <span>Ajedrez</span>
              </div>
            </div>

            <div className="mt-8">
              <div className="text-[#FF4D2E] font-bold text-5xl">
                15
              </div>
              <div className="text-sm text-gray-500">
                años programando
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
