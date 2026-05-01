# 1. Definição do Produto: ElitePlay

## Visão Geral
A ElitePlay é uma plataforma que transforma lances esportivos em ativos digitais de alto valor. Através de uma integração entre hardware (botão físico) e software (recorte instantâneo via IA), permitimos que atletas eternizem seus momentos de glória e que arenas esportivas potencializem sua marca através de marketing orgânico.

## Público-Alvo
1.  **Atletas Amadores (B2C):** Buscam registrar lances épicos sem interrupções, compartilhar em redes sociais e analisar seu desempenho sem depender de terceiros para filmagem.
2.  **Gestores de Arenas (B2B):** Buscam oferecer um diferencial tecnológico premium, atrair mais jogadores e gerar novas fontes de receita através de patrocínios inseridos nos vídeos.

## Pilares e Diferenciais
*   **Gravação Inteligente e Imediatismo:** Recorte retroativo automático com entrega do clipe em menos de 30 segundos ("O replay antes de sair da quadra").
*   **Simplicidade (UX):** Acionamento via botão físico na lateral da quadra, mantendo o foco no jogo.
*   **Monetização e Dados:** Transformação da "resenha" em conteúdo viral com marcas de patrocinadores integradas e fornecimento de dados de uso para os gestores.

---

# 2. Especificações Técnicas (Frontend)

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

---

# 3. Fluxo de Trabalho e Protocolos de Desenvolvimento

Todo o trabalho segue princípios rigorosos de **Desenvolvimento Orientado a Testes (TDD)** e rastreabilidade via Git.

## Princípios Norteadores
1.  **O Plano é a Única Verdade:** Todo trabalho deve estar rastreado no arquivo `plan.md`.
2.  **Stack Deliberada:** Mudanças na stack devem ser documentadas em `tech-stack.md` antes da implementação.
3.  **TDD e Qualidade:** Escrever testes antes da funcionalidade, visando >80% de cobertura.
4.  **UX em Primeiro Lugar:** Cada decisão prioriza a experiência do usuário e a performance mobile.

## Ciclo de Vida da Tarefa (Workflow)
Para cada tarefa, o desenvolvedor (ou agente de IA) deve seguir estes passos:

1.  **Seleção e Status:** Selecionar a tarefa no `plan.md` e marcar como em progresso `[~]`.
2.  **Fase Vermelha (TDD):** Criar testes unitários que falham, definindo o comportamento esperado.
3.  **Fase Verde (Implementação):** Escrever o código mínimo necessário para passar nos testes.
4.  **Refatoração:** Melhorar o código mantendo os testes passando.
5.  **Documentação e Commits:**
    *   Commits seguem o padrão: `<tipo>(<escopo>): <descrição>`.
    *   Utilizar `git notes` para anexar um resumo detalhado da tarefa ao commit.
    *   Atualizar o `plan.md` com o SHA do commit e marcar como concluído `[x]`.

## Protocolo de Conclusão de Fase (Checkpoint)
Ao finalizar uma fase do plano, deve-se:
1.  **Verificar Cobertura:** Listar arquivos alterados e garantir que todos possuam testes correspondentes.
2.  **Execução Automatizada:** Rodar toda a suíte de testes (`CI=true npm test`).
3.  **Validação Manual:** Seguir um plano de teste manual (ex: abrir o servidor, verificar visualmente no navegador).
4.  **Feedback do Usuário:** Aguardar confirmação explícita antes de criar o commit de checkpoint.
5.  **Registro de Auditoria:** Anexar o relatório de verificação ao commit de checkpoint via `git notes`.

---

# 4. Padrões de Qualidade e Mobile

## Quality Gates (Portões de Qualidade)
Uma tarefa só é considerada "Pronta" (Done) se:
*   Todos os testes passam e a cobertura é >80%.
*   Não há erros de linting ou tipagem (TypeScript Strict).
*   A interface é responsiva e funcional em dispositivos móveis (alvos de toque de no mínimo 44x44px).
*   As funções públicas estão documentadas (JSDoc).

## Testes Mobile
*   Testar interações de toque e layouts responsivos.
*   Verificar performance em redes 3G/4G.
*   Garantir legibilidade de texto sem necessidade de zoom.

---

# 5. Procedimentos de Emergência e Implantação

## Gestão de Crises
*   **Bug Crítico em Produção:** Criar branch de hotfix, escrever teste que reproduz o erro, aplicar correção mínima e implantar imediatamente.
*   **Brecha de Segurança:** Rotacionar segredos instantaneamente, revisar logs de acesso e corrigir a vulnerabilidade.

## Fluxo de Implantação (Deployment)
1.  **Checklist Pré-Deploy:** Testes passando, cobertura checada, variáveis de ambiente configuradas e migrações de banco prontas.
2.  **Deploy:** Merge para a branch `main`, tagueamento da versão e monitoramento de erros pós-implantação.