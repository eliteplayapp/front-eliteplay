# Specification - Estrutura Base e i18n

## Objetivo
Estabelecer a base técnica do projeto ElitePlay Frontend, organizando a estrutura de pastas conforme definido e implementando o sistema de internacionalização (i18n) via React Context, preparado para futura integração com Strapi.

## Escopo
- Criação das pastas globais: `components`, `sections`, `pages`, `global`.
- Implementação do `LanguageProvider` com suporte a PT-BR, ES e EN.
- Configuração do dicionário de traduções inicial (baseado no mock fornecido).
- Integração do Provider no `layout.tsx` principal.

## Requisitos Técnicos
- **Next.js App Router:** Utilizar convenções de `layout`, `page`, etc.
- **React Context:** Gerenciamento de estado global de idioma.
- **TypeScript:** Tipagem estrita para chaves de tradução.

## Suporte a Idiomas
- **Português (pt-br)**
- **Espanhol (es)**
- **Inglês (en)**
