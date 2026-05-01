# Especificações Técnicas (Frontend)

O projeto utiliza **Next.js 16+ (App Router)** com foco em código limpo e alto desempenho.

## Tech Stack Core
*   **Framework:** Next.js 16 (App Router)
*   **Biblioteca:** React 19
*   **Linguagem:** TypeScript (Strict Mode)
*   **Estilização:** Tailwind CSS v4
*   **CMS:** Strapi (Integração via API REST/GraphQL)
*   **Infraestrutura:** Vercel

## Arquitetura de Pastas e Convenções
*   `app/`: Definição de rotas (`page.tsx`), layouts compartilhados (`layout.tsx`) e estados (`loading.tsx`, `error.tsx`).
*   `components/`: Componentes atômicos e reutilizáveis de baixo nível.
*   `sections/`: Blocos de interface compostos que consomem dados do CMS.
*   `global/`: Estilos globais, contextos (ex: `LanguageContext`) e configurações.
*   **Internacionalização (i18n):** Suporte nativo a Português-BR, Espanhol e Inglês gerenciado via Strapi e um `LanguageProvider`.
