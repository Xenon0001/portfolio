import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import "../globals.css";

export const metadata: Metadata = {
  title: "Luis Rafael - Portfolio",
  description: "Portfolio personal de Luis Rafael",
};

const locales = ['es', 'en', 'fr'];

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as any)) {
    notFound();
  }
  return (
    <html lang={locale} className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}