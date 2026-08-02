import ptBrData from '@/src/data/locales/pt-br.json';
import esData from '@/src/data/locales/es.json';
import enData from '@/src/data/locales/en.json';

const dictionaries: Record<string, typeof ptBrData> = {
  'pt-br': ptBrData,
  'pt': ptBrData,
  'es': esData,
  'en': enData,
};

export function getDictionary(lang: string = 'es') {
  const normalizedLang = (lang || 'es').toLowerCase();
  return dictionaries[normalizedLang] || dictionaries['es'];
}

/**
 * Converte um valor InputLanguages (string ou objeto) para string.
 * Útil para compatibilidade de tipos ao passar para componentes que esperam string.
 */
export function toStr(value: any): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value.language_pt ?? value.language_es ?? value.language_en ?? '';
}

export async function getInformacoesGlobais(lang: string = 'es'): Promise<any> {
  const dict = getDictionary(lang);
  return dict.global;
}

export async function getPaginaInicial(lang: string = 'es'): Promise<any> {
  const dict = getDictionary(lang);
  return dict.home;
}

export async function getPaginaArenas(lang: string = 'es'): Promise<any> {
  const dict = getDictionary(lang);
  return dict.arenas;
}

/**
  * Utilitário para formatar e garantir URLs de imagem locais ou remotas
  */
export function getMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }
  return url.startsWith('/') ? url : `/${url}`;
}

/**
 * Alias mantido para retrocompatibilidade
 */
export const getStrapiMedia = getMediaUrl;
