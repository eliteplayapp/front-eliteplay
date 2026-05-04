import qs from 'qs';
import { HomePageModel } from '@/src/types/strapi.home.model';
import { GlobalModel } from '@/src/types/strapi.global.model';
import { ArenasPageModel } from '@/src/types/strapi.arena.model';

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
        'redes_sociais'
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
        // Seção CTA (Cta_four)
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
                title: { populate: '*' },
                subtitle: { populate: '*' },
                itens: {
                  populate: ['item']
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

/**
 * Busca a Página de Arenas com todos os componentes e mídias populados
 */
export async function getPaginaArenas(): Promise<ArenasPageModel | null> {
  try {
    const data = await fetchAPI('/pagina-de-arena', {
      populate: {
        banner: {
          populate: {
            image: { populate: '*' },
            tooltip_one: { populate: '*' },
            title: { populate: '*' },
            subtitle: { populate: '*' },
            button_cta_banner: {
              populate: ['text_button']
            }
          }
        },
        section_installation: {
          populate: {
            tooltip: { populate: '*' },
            title: { populate: '*' },
            subtitle: { populate: '*' },
            cards: {
              populate: ['title', 'subtitle']
            },
            image: { populate: '*' }
          }
        },
        section_comparative: {
          populate: {
            tooltip: { populate: '*' },
            title: { populate: '*' },
            cards: {
              populate: {
                image: { populate: '*' },
                title: { populate: '*' },
                itens: {
                  populate: ['item']
                }
              }
            }
          }
        },
        section_differential: {
          populate: {
            tooltip: { populate: '*' },
            title: { populate: '*' },
            cards: {
              populate: ['title', 'subtitle']
            }
          }
        },
        section_impact: {
          populate: {
            image: { populate: '*' },
            tooltip: { populate: '*' },
            title: { populate: '*' },
            subtitle: { populate: '*' },
            button_section_impact: {
              populate: ['text_button']
            },
            cards: {
              populate: ['metric', 'category', 'outcome']
            }
          }
        },
        section_partners: {
          populate: {
            tooltip: { populate: '*' },
            title: { populate: '*' },
            subtitle: { populate: '*' },
            itens: {
              populate: ['item', 'subitem']
            }
          }
        },
        section_faq: {
          populate: {
            title: { populate: '*' },
            subtitle: { populate: '*' },
            itens: {
              populate: ['question', 'answer']
            }
          }
        }
      }
    }, {
      next: { revalidate: 60 }
    });
    return data?.data;
  } catch (error) {
    console.error("Erro ao carregar a página de arenas:", error);
    return null;
  }
}
