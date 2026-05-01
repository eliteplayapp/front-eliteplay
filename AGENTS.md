# Especificações Técnicas (Frontend)

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


# 3. Fluxo de Trabalho e Protocolos de Desenvolvimento

## Diretrizes de Interface e Conteúdo
- **Estética:** O desenvolvedor vai passar o código das sessões pronto, o seu foco será apenas na implementação de código limpo, seguindo as boas práticas de desenvolvimento e a documentação do projeto.

- Cards e elementos das sessões devem ser divididos em componentes atômicos, seguindo a filosofia de design system do projeto.
- As sessões também devem ser divididas em componentes atômicos, importando os cards necessários.
- As páginas devem importar as sessões necessárias.
- O diretorio global deve ter configurações globais do tailwind, tipografia, cores, etc, além de componentes globais como header e footer.
- Simplifique ao máximo a codificação, deixando o código limpo, legível e organizado.
- Não adicione comentários desnecessários no código.
- O código enviado pelo desenvolvedor deve servir apenas como inspiração para entender o layout e a estrutura do projeto, você deve implementar o código seguindo as diretrizes do projeto,  com o padrão tailwind.
- Evite o uso de bibliotecas, mantedo o código limpo e enxuto. O uso de bibliotecas deve haver apenas se o taiwind css não resolver o problema.
- Padronize o uso de bibliotecas. Fazendo a importação no diretorio global.