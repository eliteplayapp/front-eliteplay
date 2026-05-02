import qs from 'qs';
import { 
  StrapiHome, 
  StrapiArenas, 
  StrapiHeader, 
  StrapiFooter 
} from '../types/strapi.model';

/**
 * Retorna o token da API configurado no ambiente ou o token padrão do projeto.
 */
function getStrapiToken() {
  return process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
}

/**
 * Retorna a URL base da API do Strapi.
 */
export function getStrapiURL(path = '') {
  const url = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  return `${url}${path}`;
}

/**
 * Função utilitária central para buscar dados do Strapi API usando Next.js fetch
 */
export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options = {}
) {
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getStrapiToken()}`,
    },
    ...options,
  };

  const queryString = qs.stringify(urlParamsObject, { encodeValuesOnly: true });
  const requestUrl = getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ''}`);

  try {
    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      console.error(response.statusText);
      throw new Error(`Erro na requisição para o Strapi em ${path}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Falha ao conectar na API do Strapi:', error);
    throw error;
  }
}

/**
 * Busca as Informações Globais (Header, Footer, Contato, etc)
 */
export async function getInformacoesGlobais(): Promise<any | null> {
  try {
    const data = await fetchAPI('/informacoes-globais', {
      populate: [
        'header.menu_header.text_button',
        'header.button_cta_header.text_button',
        'footer.description',
        'footer.links.title',
        'footer.contato'
      ],
    }, {
      next: { revalidate: 60 }
    });
    return data?.data;
  } catch (error) {
    console.error("Erro ao carregar informações globais:", error);
    return null;
  }
}

/**
 * Busca a Página Inicial
 */
export async function getPaginaInicial(): Promise<any | null> {
  try {
    const data = await fetchAPI('/pagina-inicial', {
      populate: [
        'banner_home_page.imgs_banner',
        'banner_home_page.description_banner',
        'section_instructions',
        'section_sports',
        'section_cta',
        'section_cta_simple',
        'section_download_app'
      ],
    }, {
      next: { revalidate: 60 }
    });
    return data?.data;
  } catch (error) {
    console.error("Erro ao carregar a página inicial:", error);
    return null;
  }
}

/**
 * Utilitário para formatar e garantir URLs de imagem completas
 */
export function getStrapiMedia(url: string | null | undefined) {
  if (!url) {
    return null;
  }

  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }

  return getStrapiURL(url);
}
