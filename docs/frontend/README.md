# Documentação Frontend - YouTube Downloader

Esta documentação descreve a arquitetura do frontend do YouTube Downloader usando o modelo C4.

## 📋 Visão Geral

O frontend é uma aplicação React + TypeScript que fornece uma interface web moderna e responsiva para o sistema de download de vídeos do YouTube. A arquitetura segue padrões modernos de desenvolvimento React com hooks, componentes funcionais e tipagem estática.

## 🏗️ Estrutura C4 Model

### C1 - Context Diagram
- **Escopo**: Sistema no contexto de usuários e sistemas externos
- **Foco**: Interação entre usuário, frontend, backend e YouTube
- **Artefato**: `C1_Context.md`

### C2 - Container Diagram  
- **Escopo**: Containers principais do sistema
- **Foco**: Browser, React App, Backend API
- **Artefato**: `C2_Container.md`

### C3 - Component Diagram
- **Escopo**: Componentes internos da React Application
- **Foco**: App.tsx, DownloaderApp, DownloadForm, DownloadResult, hooks, services
- **Artefato**: `C3_Component.md`

### C4 - Code Diagram
- **Escopo**: Detalhes de implementação dos componentes
- **Foco**: Classes, interfaces, métodos e propriedades
- **Artefato**: `C4_Code.md`

## 🎯 Principais Características

### Arquitetura React Moderna
- **Componentes Funcionais**: Uso de hooks e componentes funcionais
- **TypeScript**: Tipagem estática para maior robustez
- **Custom Hooks**: Encapsulamento de lógica reutilizável
- **Serviços Centralizados**: Comunicação com API organizada

### Padrões de Design
- **Separation of Concerns**: Cada componente tem responsabilidade única
- **Composition over Inheritance**: Composição de componentes
- **Custom Hooks**: Lógica de estado e efeitos colaterais encapsulada
- **Type Safety**: Interfaces TypeScript bem definidas

### Experiência do Usuário
- **Interface Responsiva**: Adaptação a diferentes tamanhos de tela
- **Feedback em Tempo Real**: Status de download atualizado
- **Tratamento de Erros**: Mensagens de erro claras e informativas
- **Loading States**: Indicadores visuais de progresso

## 📁 Estrutura de Arquivos

```
frontend/
├── src/
│   ├── components/          # Componentes React
│   │   ├── App.tsx         # Componente raiz
│   │   ├── Header.tsx      # Cabeçalho da aplicação
│   │   ├── Hero.tsx        # Seção de apresentação
│   │   ├── DownloaderApp.tsx # Orquestrador principal
│   │   ├── DownloadForm.tsx   # Formulário de entrada
│   │   └── DownloadResult.tsx # Exibição de resultados
│   ├── hooks/              # Custom hooks
│   │   └── useDownload.ts  # Hook para downloads
│   ├── services/           # Serviços de API
│   │   ├── api.ts          # Configuração HTTP
│   │   └── downloadService.ts # Serviços de download
│   ├── types/              # Definições TypeScript
│   │   └── index.ts        # Interfaces compartilhadas
│   └── config/             # Configurações
│       └── themes.ts       # Temas e estilos
```

## 🔄 Fluxo de Dados

1. **Entrada do Usuário**: URL inserida no DownloadForm
2. **Validação**: Verificação do formato da URL
3. **Chamada da API**: useDownload hook faz requisição HTTP
4. **Processamento**: Backend processa o download
5. **Feedback**: Interface atualiza status em tempo real
6. **Resultado**: DownloadResult exibe o arquivo final

## 🛠️ Tecnologias Utilizadas

- **React 19.1.0**: Framework de UI
- **TypeScript 4.9.5**: Tipagem estática
- **React Scripts 5.0.1**: Scripts de desenvolvimento
- **Testing Library**: Testes de componentes
- **Web Vitals**: Métricas de performance

## 🧪 Testes

O frontend inclui testes unitários e de integração:

- **Testes de Componentes**: Verificação de renderização e comportamento
- **Testes de Hooks**: Validação de custom hooks
- **Testes de Serviços**: Mock de chamadas HTTP
- **Testes de Integração**: Fluxo completo de download

## 🚀 Deploy

A aplicação pode ser executada em diferentes ambientes:

- **Desenvolvimento**: `npm start` (localhost:3000)
- **Produção**: Build otimizado com `npm run build`
- **Docker**: Containerização para deploy consistente
- **CI/CD**: Integração contínua com testes automáticos

## 📚 Documentação Relacionada

- **ADR 0004**: Escolha de React + TypeScript
- **Backend C4 Model**: Documentação da API
- **README Principal**: Visão geral do projeto
- **Docker Compose**: Orquestração de containers 