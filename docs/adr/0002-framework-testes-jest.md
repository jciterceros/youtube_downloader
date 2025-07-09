# ADR 0002: Escolha do Jest como Framework de Testes Unitários

## Status
Decidido

## Contexto
O projeto precisava de testes unitários confiáveis, rápidos e fáceis de escrever, com suporte a mocks, spies e cobertura de código. Era importante que o framework fosse amplamente adotado na comunidade Node.js e fácil de integrar ao fluxo de desenvolvimento.

## Decisão
Adotar o Jest como framework de testes unitários.

- Suporte nativo a mocks, spies e cobertura de código.
- Sintaxe simples e expressiva.
- Integração fácil com projetos Node.js.
- Comunidade ativa e boa documentação.

## Alternativas Consideradas
- Mocha + Chai + Sinon (mais verboso, mais configuração).
- AVA (minimalista, mas menos popular).
- Jasmine (menos adotado em projetos Node.js modernos).

## Consequências
- Testes ficaram mais fáceis de escrever e manter.
- Cobertura de código integrada.
- Facilidade para rodar testes em CI/CD.
- Padronização com o que há de mais usado no ecossistema Node.js.