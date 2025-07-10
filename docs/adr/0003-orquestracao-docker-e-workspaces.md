# ADR 0003: Orquestração com Docker Compose e Workspaces NPM

## Status
Decidido

## Contexto
O projeto requer ambientes de desenvolvimento e produção consistentes, além de facilitar a integração entre frontend e backend. A utilização de múltiplos workspaces npm permite modularidade e independência entre os módulos.

## Decisão
Adotar Docker Compose para orquestração dos serviços (backend, frontend) e workspaces npm para gerenciamento de dependências e scripts compartilhados.

- Docker Compose simplifica o setup local e em produção.
- Workspaces npm permitem dependências compartilhadas e builds otimizados.
- Cada serviço pode ser desenvolvido e testado isoladamente.

## Alternativas Consideradas
- Gerenciamento manual de containers e dependências.
- Utilizar apenas scripts npm sem containerização.

## Consequências
- Onboarding mais rápido para novos desenvolvedores.
- Ambientes reprodutíveis e padronizados.
- Facilidade para CI/CD e deploy. 