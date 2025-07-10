# ADR 0005: Gerenciamento de Dependências com Monorepo e Workspaces

## Status
Decidido

## Contexto
O projeto possui múltiplos módulos (backend, frontend) que compartilham algumas dependências e precisam de integração contínua. O gerenciamento separado de dependências pode causar inconsistências e retrabalho.

## Decisão
Adotar monorepo com workspaces npm para centralizar o gerenciamento de dependências e scripts.

- Facilita atualização de dependências compartilhadas.
- Scripts globais para testes, builds e lint.
- Integração contínua mais simples.

## Alternativas Consideradas
- Repositórios separados para cada módulo.
- Gerenciamento manual de dependências em cada projeto.

## Consequências
- Redução de duplicidade e inconsistências.
- Deploy e CI/CD mais eficientes.
- Facilidade para refatorações cross-project. 