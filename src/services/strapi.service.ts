import qs from 'qs';
import { HomePageModel } from '@/src/types/strapi.home.model';
import { GlobalModel } from '@/src/types/strapi.global.model';

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
export async function getInformacoesGlobais(): Promise<GlobalModel> {
  try {
    const data = await fetchAPI('/informacoes-globais', {
      populate: [
        'logo_global',
        'header.menu_header.text_button',
        'header.button_cta_header.text_button',
        'footer.description',
        'footer.links.title',
        'footer.contato',
        'footer.redes_sociais'
      ],
    }, {
      next: { revalidate: 60 }
    });
    return data?.data;
  } catch (error) {
    console.error("Erro ao carregar informações globais:", error);
    throw error;
  }
}

/**
 * Busca a Página Inicial com todos os componentes e mídias populados
 */
export async function getPaginaInicial(): Promise<HomePageModel | null> {
  try {
    const data = await fetchAPI('/pagina-inicial', {
      populate: {
        // Banner
        banner_home_page: {
          populate: ['imgs_banner', 'description_banner', 'logo_banner']
        },
        // Seção Instruções
        section_instructions: {
          populate: {
            tooltip_one: { populate: '*' },
            title: { populate: '*' },
            subtitle: { populate: '*' },
            instructions: {
              populate: ['img_instruction', 'title_card', 'subtitle_card']
            },
            tooltip_two: { populate: '*' }
          }
        },
        // Seção CTA (Cta_one)
        section_cta: {
          populate: {
            tooltip: { populate: '*' },
            title: { populate: '*' },
            subtitle: { populate: '*' },
            itens: {
              populate: ['item']
            },
            button: {
              populate: ['text_button']
            },
            video: {
              populate: ['conteudo']
            }
          }
        },
        // Seção Sports (Usa Cta_one repetível internamente)
        section_sports: {
          populate: {
            tooltip: { populate: '*' },
            title: { populate: '*' },
            sports: {
              populate: {
                tooltip: { populate: '*' },
                titulo: { populate: '*' },
                subtitle: { populate: '*' },
                itens: {
                  populate: ['item']
                },
                button_section_cta: {
                  populate: ['text_button']
                },
                video: {
                  populate: ['conteudo']
                }
              }
            }
          }
        },
        // Seção CTA Simples
        section_cta_simple: {
          populate: {
            tooltip: { populate: '*' },
            title: { populate: '*' },
            cards: {
              populate: ['text_tooltip_one', 'title_card', 'subtitle_card']
            },
            button_section_cta_simple: {
              populate: ['text_button']
            }
          }
        },
        // Seção Download App
        section_download_app: {
          populate: {
            title: { populate: '*' },
            subtitle: { populate: '*' }
          }
        }
      }
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
