'use client';

import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

type ExperienceProps = {
  locale: string;
  experience: { title: string; items: any[] };
}

export default function Experience({ locale, experience }: ExperienceProps) {
  const entries = experience.items as Array<{
    role: string;
    company: string;
    date: string;
    description: string;
    linkText: string | null;
    link: string | null;
  }>;

  return (
    <section id="experiencia" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12">
          {experience.title}
        </h2>
        
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
                  {entry.role}
                </h3>
                
                <p className="text-white font-semibold mb-1">
                  {entry.company}
                </p>
                
                <p className="text-sm text-[#6b7280] mb-3">
                  {entry.date}
                </p>
                
                <p className="text-[#9ca3af] mb-3">
                  {entry.description}
                </p>
                
                {entry.linkText && (
                  <a
                    href={entry.link || "#"}
                    target={entry.link ? "_blank" : undefined}
                    rel={entry.link ? "noopener noreferrer" : undefined}
                    className="text-[#FF4D2E] hover:underline"
                  >
                    {entry.linkText}
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
