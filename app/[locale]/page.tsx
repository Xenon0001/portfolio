import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';
import es from '@/messages/es.json';
import en from '@/messages/en.json';
import fr from '@/messages/fr.json';

const messages = { es, en, fr } as const;
type Locale = keyof typeof messages;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = (Object.keys(messages).includes(locale) 
    ? locale : 'es') as Locale;
  const t = messages[validLocale];

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <Navbar locale={validLocale} nav={t.nav} />
      <Hero locale={validLocale} hero={t.hero} />
      <Experience locale={validLocale} experience={t.experience} />
      <Projects locale={validLocale} projects={t.projects} />
      <About locale={validLocale} about={t.about} />
      <Contact locale={validLocale} contact={t.contact} />
      <footer 
        style={{ borderTop: '1px solid #1f1f1f' }} 
        className="py-6 text-center text-sm text-gray-600"
      >
        {t.footer.copy}
      </footer>
    </main>
  );
}
