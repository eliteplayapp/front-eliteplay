# Product Definition - ElitePlay

## Visão Geral
A ElitePlay é uma plataforma que transforma lances esportivos em ativos digitais de alto valor. Através de hardware (botão físico) e software (para recorte instantâneo), permitimos que atletas eternizem seus momentos de glória e que arenas esportivas potencializem sua marca através do marketing orgânico.

## Público-Alvo

### 1. Atletas Amadores (B2C)
- **Objetivo:** Registrar lances épicos sem interrupções, compartilhar em redes sociais e analisar desempenho.
- **Dor:** A dificuldade de gravar a si mesmo jogando sem depender de terceiros ou perder o foco na partida.

### 2. Gestores de Arenas (B2B)
- **Objetivo:** Oferecer um diferencial tecnológico premium, atrair mais jogadores e gerar publicidade gratuita.
- **Dor:** Necessidade de se destacar em um mercado competitivo e criar novas fontes de receita (patrocínios in-video).

## Pilares do Produto
- **Gravação Inteligente (IA):** Recorte retroativo automático do lance exato.
- **Simplicidade (UX do Botão):** Acionamento físico tático na lateral da quadra, sem necessidade de celular em jogo.
- **Imediatismo:** Entrega do clipe processado em menos de 30 segundos ("O replay antes de sair da quadra").
- **Conectividade Social:** Vídeos prontos para Instagram, WhatsApp e TikTok com a marca da arena integrada.

## Diferenciais Competitivos
- **Transformação em Conteúdo:** Foco na "resenha" e na viralização, não apenas na vigilância passiva.
- **Monetização B2B:** Inserção de marcas e patrocinadores diretamente nos replays.
- **Dados e Retenção:** Fornece insights sobre o uso das quadras para os gestores.

## Organização Técnica (Frontend)
O projeto utiliza **Next.js 16+ (App Router)** com foco em código limpo, manutenção facilitada e alto desempenho.

### Convenções de Arquitetura (App Router)
- `page.tsx`: Definição de rotas.
- `layout.tsx`: UI compartilhada (header, nav, footer).
- `loading.tsx`: Estados de carregamento (skeletons).
- `error.tsx` / `global-error.tsx`: Limites de erro.
- `route.ts`: Endpoints de API.
- `template.tsx` / `not-found.tsx`: Fallbacks e comportamentos de navegação.

### Estrutura de Pastas
- `components/`: Componentes reutilizáveis de baixo nível.
- `sections/`: Blocos de interface compostos e específicos de páginas.
- `pages/`: (Utilizado como agrupador lógico ou camadas de visão dentro do App Router).
- `global/`: Estilos globais, contextos e configurações transversais.
