# Product Guidelines - ElitePlay

## Princípios de Experiência do Usuário (UX)

### 1. Mobile First & Fast Access
O acesso principal ocorre em ambientes esportivos (arenas, quadras), frequentemente sob luz solar ou condições de movimento.
- **Prioridade Móvel:** Toda funcionalidade deve ser otimizada para uso em smartphones com uma mão.
- **Carregamento Rápido:** O tempo de percepção de carga deve ser mínimo para acompanhar a adrenalina do pós-jogo.

### 2. Fricção Zero
O caminho entre o desejo do usuário e a visualização/compartilhamento do vídeo deve ser o mais curto possível.
- **Acesso Direto:** Reduzir o número de cliques para acessar os replays recentes.
- **Fluxos Simplificados:** Evitar fluxos de autenticação complexos no momento da visualização.

### 3. Destaque de Marca & Arena
A plataforma é um veículo de marketing para as arenas parceiras.
- **Visibilidade Orgânica:** A identidade visual da arena deve estar presente de forma elegante em layouts de compartilhamento e visualização.
- **Espaço para Patrocinadores:** O layout deve prever áreas para exibição de parceiros da arena sem comprometer a clareza do conteúdo principal (o vídeo).

## Diretrizes de Interface e Conteúdo
*Nota: Conforme definido em documentação externa do projeto.*
- **Estética:** Manter o design já pronto, focando na implementação de código limpo.
- **Voz e Tom:** Seguir o manual de identidade já estabelecido para a marca ElitePlay.

## Padrões de Implementação
- **Performance:** Utilizar componentes de servidor (Server Components) do Next.js sempre que possível para reduzir o bundle de JS no cliente.
- **Acessibilidade:** Garantir contraste adequado para visualização em ambientes externos (quadras abertas).
- **Consistência:** Utilizar a estrutura organizacional definida (`components`, `sections`, `pages`, `global`) para garantir escalabilidade.
