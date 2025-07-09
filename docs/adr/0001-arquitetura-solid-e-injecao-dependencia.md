# ADR 0001: Arquitetura SOLID e Injeção de Dependência

## Status
Decidido

## Contexto
O projeto YouTube Downloader precisava de uma arquitetura flexível, testável e fácil de manter, capaz de crescer e ser adaptada para diferentes cenários (novos provedores, novas estratégias de merge, etc). O código original era monolítico e acoplado.

## Decisão
Adotar os princípios SOLID (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) e aplicar injeção de dependência via interfaces e fábricas (factories).

- Cada serviço tem uma responsabilidade única.
- Dependências são abstraídas por interfaces.
- O orquestrador (VideoProcessor) recebe dependências via factory.
- O código é aberto para extensão, fechado para modificação.

## Alternativas Consideradas
- Manter código monolítico e acoplado.
- Usar apenas funções sem separação de responsabilidades.
- Usar frameworks pesados (NestJS, etc) para injeção de dependência.

## Consequências
- O código ficou mais modular, testável e fácil de evoluir.
- É possível adicionar novos provedores ou estratégias sem modificar o núcleo.
- Testes unitários ficaram mais simples com mocks.
- Pequeno aumento de complexidade inicial, compensado pela manutenibilidade. 