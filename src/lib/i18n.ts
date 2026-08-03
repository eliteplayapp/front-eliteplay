import { InputLanguages } from "../types/strapi.home.model";

/**
 * Retorna a tradução correta com base no idioma selecionado.
 * Suporta tanto texto direto (string dos arquivos JSON locais) quanto objetos legados (InputLanguages).
 * @param input Texto direto (string) ou objeto contendo traduções (InputLanguages)
 * @param lang Código do idioma ('pt-br', 'es', 'en')
 * @returns Texto traduzido
 */
export function getTranslation(input: string | InputLanguages | any | undefined, lang: string = "es"): string {
  if (!input) return "";

  if (typeof input === "string") {
    return input;
  }

  const normalizedLang = (lang || "es").toLowerCase();

  switch (normalizedLang) {
    case "pt-br":
    case "pt":
      return input.language_pt || input.language_es || "";
    case "en":
      return input.language_en || input.language_es || input.language_pt || "";
    case "es":
    default:
      return input.language_es || input.language_pt || "";
  }
}

/**
 * Formata um link interno preservando o parâmetro de idioma (`lang`).
 * @param href URL ou caminho relativo de destino
 * @param lang Código do idioma atual
 */
export function formatLocalizedLink(href: string, lang?: string | null): string {
  if (!href || !lang) return href || "#";

  // Não altera links externos ou links apenas de âncora (#secao)
  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  // Separa o caminho/query da âncora (#hash)
  const [baseAndQuery, hash] = href.split("#");
  const hashPart = hash !== undefined ? `#${hash}` : "";

  // Se já possui o parâmetro lang, retorna como está
  if (baseAndQuery.includes("lang=")) {
    return href;
  }

  const separator = baseAndQuery.includes("?") ? "&" : "?";
  const formattedBase = `${baseAndQuery || "/"}${separator}lang=${lang}`;

  return `${formattedBase}${hashPart}`;
}

