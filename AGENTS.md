# ElitePlay: Especificações Técnicas e Protocolos de Desenvolvimento

Este documento serve como a única fonte de verdade para o desenvolvimento do frontend da plataforma ElitePlay. Todos os agentes e desenvolvedores devem seguir estas diretrizes rigorosamente.

## 1. Stack Tecnológica Core

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)

---

## 2. Arquitetura de Diretórios

A estrutura deve ser mantida de forma organizada e modular:

- `app/`: Rotas, layouts e páginas da aplicação.
- `elements/`: Componentes atômicos e reutilizáveis (Botões, Inputs, Avatares, Badges).
- `components/`: Componentes atômicos e reutilizáveis (Cards).
- `sections/`: Componentes complexos (organismos) que compõem as páginas (Hero, Carrosséis, Grid de Conteúdo, Footer).
- `global/`:
    - `global/styles/`: Configurações de CSS, temas e fontes.
    - `global/components/`: Componentes globais (Header, Footer).
    - `global/types/`: Definições de tipos TypeScript globais e interfaces do Strapi.
    - `global/lib/`: Configurações de bibliotecas externas e utilitários.

---

## 3. Protocolos de Desenvolvimento Next.js 16

### 3.1. Otimização de Imagem (`next/image`)
Sempre utilize o componente `<Image />` do Next.js para garantir performance e SEO.

- **Imagens Locais:** Importe estaticamente para obter `width` e `height` automáticos.
- **Imagens Remotas (Strapi):** 
    - Deve-se fornecer `width` e `height` manualmente ou usar a propriedade `fill`.
    - Configure obrigatoriamente o `remotePatterns` no `next.config.ts`.
- **Placeholder:** Utilize `placeholder="blur"` para melhorar a percepção de carregamento.

```tsx
import Image from 'next/image'

// Exemplo de Imagem Remota
<Image 
  src={strapiUrl} 
  alt="Descrição da imagem" 
  width={1920} 
  height={1080} 
  className="object-cover"
/>
```

### 3.2. Formulários e Navegação (`next/form`)
Para buscas e filtros que atualizam parâmetros de URL, utilize o componente `<Form />`.

- Benefícios: Pré-busca da interface de carregamento e navegação otimizada no lado do cliente.

```tsx
import Form from 'next/form'

export default function SearchSection() {
  return (
    <Form action="/search">
      <input name="query" placeholder="Buscar filmes..." />
      <button type="submit">Buscar</button>
    </Form>
  )
}
```

### 3.3. SEO e Sitemaps Dinâmicos
Utilize a função `generateSitemaps` para gerenciar grandes volumes de páginas (Filmes, Séries) de forma otimizada para o Google.

---

## 4. CMS & Integração Strapi

- **Integração:** Consumo via REST ou GraphQL.
- **Estratégia:** Iniciar com Mock Data dentro de contextos para simular o Strapi, facilitando o desenvolvimento paralelo.
- **Internacionalização (i18n):**
    - 3 Idiomas: Português-BR (padrão), Espanhol, Inglês.
    - **Estratégia Simplificada:** Cada seção/componente gerencia suas próprias traduções (mockadas localmente).
    ```tsx
    const translations: any = {
      "pt-br": { forArenas: "Para Arenas", howItWorks: "Como Funciona", app: "O App", becomePartner: "Seja um Parceiro" },
      "es": { forArenas: "Para Arenas", howItWorks: "Cómo Funciona", app: "La App", becomePartner: "Hazte Socio" },
      "en": { forArenas: "For Arenas", howItWorks: "How It Works", app: "The App", becomePartner: "Become a Partner" },
    };
    ```
    - **Navegação:** O idioma é controlado via parâmetro de URL `?lang=...`. A troca de idioma deve forçar o recarregamento da página para atualização de dados.

---

## 5. Diretrizes de UI e Styling (Tailwind CSS v4)

- **Prioridade:** Tailwind CSS v4 deve resolver 100% das necessidades de layout e estilo.
- **Bibliotecas Externas:** O uso deve ser evitado ao máximo. Se for estritamente necessário (ex: Framer Motion para animações complexas), a importação deve ser padronizada no diretório `global/`.
- **Clean Code:**
    - Proibido comentários óbvios.
    - Componentes devem ser divididos em arquivos menores se crescerem demais.
    - Estrutura de componente:
        - `ComponentName/index.tsx`
        - `ComponentName/types.ts` (se houver props complexas)

---

## 6. Protocolo para Agentes (Instruções Específicas)

1. **Código de Inspiração:** O desenvolvedor fornecerá códigos de "inspiração". O agente deve:
    - Entender a estrutura e o layout.
    - **Refatorar** completamente para o padrão Tailwind CSS v4.
    - **Modularizar** o código em componentes atômicos (`components/`) e seções (`sections/`).
2. **Simplicidade:** Mantenha o código limpo, legível e organizado. Evite "over-engineering".
3. **Padrão de Resposta:** Responda sempre em Português-BR (pt-br) quando solicitado pelo usuário.
4. **Uso de Imagens:** O agente **não deve gerar novas imagens** utilizando ferramentas externas. Utilize exclusivamente os recursos visuais já disponíveis na pasta `public/img`.

---

## 7. Qualidade de Código

- **ESLint:** Siga rigorosamente as regras definidas.
- **TypeScript:** Strict mode ativado. Tipagem explícita para todas as props de componentes.
- **Acessibilidade:** Garanta que todos os elementos interativos tenham `aria-labels` e suporte a navegação por teclado.