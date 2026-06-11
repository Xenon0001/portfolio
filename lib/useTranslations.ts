'use client';
import { useParams } from 'next/navigation';
import es from '../messages/es.json';
import en from '../messages/en.json';
import fr from '../messages/fr.json';

const messages = { es, en, fr } as const;
type Locale = keyof typeof messages;

export function useTranslations(namespace: string) {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'es';
  const dict = messages[locale] as Record<string, any>;
  const ns = dict[namespace] || {};
  return (key: string) => {
    const keys = key.split('.');
    let value: any = ns;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };
}

export function useLocale(): Locale {
  const params = useParams();
  return (params?.locale as Locale) || 'es';
}

export function useRawTranslations(namespace: string) {
  const params = useParams();
  const locale = (params?.locale as Locale) || 'es';
  const dict = messages[locale] as Record<string, any>;
  return dict[namespace];
}
