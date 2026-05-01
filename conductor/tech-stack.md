# Tech Stack - ElitePlay Frontend

## Core
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## CMS & Backend Integration
- **CMS:** [Strapi](https://strapi.io/)
- **Integração:** Consumo de APIs REST/GraphQL do Strapi seguindo a [documentação oficial](https://strapi.io/integrations/nextjs-cms).
- **Estratégia de Transição:** Início com Mock Data/Context para simular o Strapi, evoluindo para chamadas de API reais.

## Internacionalização (i18n)
- **Escopo:** Suporte a 3 idiomas (Português-BR, Espanhol e Inglês), configurados no Strapi.
- **Implementação:** `LanguageProvider` via React Context para gerenciamento de estado de idioma e traduções.
- **Dicionário:** Mapeamento de chaves para todos os componentes e seções da plataforma.

## Styling & UI
- **CSS Framework:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Estrutura Organizacional:**
    - `components/`: Componentes atômicos.
    - `sections/`: Seções complexas que consomem dados do CMS/Context.
    - `pages/`: Camada de visão.
    - `global/`: Estilos, tipos e contextos (como o `LanguageContext`).

## Ferramentas de Qualidade
- **Linting:** [ESLint](https://eslint.org/)
- **Type Checking:** TypeScript Strict Mode.

## Deploy & Infra
- **Ambiente:** Vercel.
