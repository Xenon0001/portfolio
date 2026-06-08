'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = 'xenonpy465@gmail.com';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contacto" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-white mb-2">
            ¿Hablamos?
          </h2>
          <div className="mx-auto w-12 h-1 bg-[#FF4D2E] mt-2 mb-6"></div>
          
          <p className="text-[#9ca3af] mb-8 max-w-2xl mx-auto">
            Estoy disponible para proyectos freelance, colaboraciones o simplemente para conversar sobre tecnología.
          </p>
          
          <button
            onClick={copyToClipboard}
            className="text-[#FF4D2E] font-mono text-lg hover:underline mb-12 block mx-auto"
          >
            {copied ? '¡Copiado!' : email}
          </button>
          
          <div className="flex gap-4 justify-center items-center flex-wrap">
            <a
              href="https://github.com/Xenon0001"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#333] text-white px-6 py-2 rounded-full hover:border-[#FF4D2E] transition"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/luis-rafael-eyoma/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#333] text-white px-6 py-2 rounded-full hover:border-[#FF4D2E] transition"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com/xenon.py"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#333] text-white px-6 py-2 rounded-full hover:border-[#FF4D2E] transition"
            >
              Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
