# YouTube Downloader com Merge de Áudio/Vídeo (Arquitetura SOLID)

Este projeto permite baixar vídeos do YouTube separando áudio e vídeo, e depois juntá-los em um único arquivo final de alta qualidade. A arquitetura foi refatorada seguindo os princípios SOLID para máxima extensibilidade e manutenibilidade.

## 🏗️ Arquitetura SOLID

O projeto foi estruturado seguindo os princípios SOLID:

- **S** - Single Responsibility: Cada classe tem uma única responsabilidade
- **O** - Open/Closed: Aberto para extensão, fechado para modificação
- **L** - Liskov Substitution: Implementações podem ser substituídas por suas interfaces
- **I** - Interface Segregation: Interfaces específicas e coesas
- **D** - Dependency Inversion: Dependências de abstrações, não de implementações

## 📁 Estrutura do Projeto (Workspaces)

O projeto utiliza **workspaces npm** para organizar o código em módulos separados:

```
youtube_downloader/
├── backend/                    # API REST + Lógica de negócio
│   ├── src/
│   │   ├── interfaces/         # Interfaces SOLID
│   │   │   ├── IDownloader.js
│   │   │   ├── IMerger.js
│   │   │   └── IFileManager.js
│   │   ├── services/           # Implementações concretas
│   │   │   ├── YouTubeDownloader.js
│   │   │   ├── FFmpegMerger.js
│   │   │   ├── FileSystemManager.js
│   │   │   └── VideoProcessor.js
│   │   ├── factories/          # Factories para criação de instâncias
│   │   │   └── VideoProcessorFactory.js
│   │   ├── examples/           # Exemplos de uso avançado
│   │   │   └── advanced-usage.js
│   │   ├── index.js            # Ponto de entrada simplificado
│   │   └── server.js           # Servidor Express
│   ├── tests/                  # Testes unitários (Jest)
│   │   ├── FileSystemManager.test.js
│   │   ├── YouTubeDownloader.test.js
│   │   ├── FFmpegMerger.test.js
│   │   └── VideoProcessor.test.js
│   ├── downloaded/             # Pasta onde os arquivos baixados são salvos
│   ├── Dockerfile              # Containerização do backend
│   └── package.json            # Dependências do backend
│
│
├── frontend/                   # Interface React + TypeScript
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   │   ├── DownloaderApp.tsx
│   │   │   ├── DownloadForm.tsx
│   │   │   ├── DownloadResult.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Hero.tsx
│   │   ├── services/           # Serviços de API
│   │   │   ├── api.ts
│   │   │   └── downloadService.ts
│   │   ├── hooks/              # Custom hooks React
│   │   │   └── useDownload.ts
│   │   ├── config/             # Configurações
│   │   │   └── themes.ts
│   │   ├── types/              # Definições TypeScript
│   │   │   └── index.ts
│   │   ├── App.tsx             # Componente principal
│   │   ├── index.tsx           # Ponto de entrada
│   │   └── index.css           # Estilos globais
│   ├── Dockerfile              # Containerização do frontend
│   └── package.json            # Dependências do frontend
│
├── docs/                       # Documentação geral
│   ├── adr/                    # Architecture Decision Records
│   │   ├── 0001-arquitetura-solid-e-injecao-dependencia.md
│   │   └── 0002-framework-testes-jest.md
│   ├── C1_Context.md           # Contexto da aplicação
│   ├── C2_Container.md         # Containers
│   ├── C3_Component.md         # Componentes
│   └── C4_Code.md              # Código
├── docker-compose.yml          # Orquestração Docker
├── env.example                 # Variáveis de ambiente
├── package.json                # Workspace root
└── README.md                   # Este arquivo
```

## 🚀 Instalação

### Opção 1: Instalação Local (Workspaces)
```bash
# Instalar dependências de todos os workspaces
npm install

# Executar backend
cd backend && npm start

# Executar frontend (em outro terminal)
cd frontend && npm start
```

### Opção 2: Docker (Recomendado)
```bash
# Desenvolvimento
./scripts/dev.ps1 start

# Produção
docker-compose up --build
```

## 📦 Dependências por Workspace

### Backend (`backend/package.json`)
**Dependências principais:**
- `@ffmpeg-installer/ffmpeg`: Instalador automático do FFmpeg
- `cors`: Middleware para CORS
- `express`: Servidor HTTP
- `fluent-ffmpeg`: Processamento de áudio/vídeo
- `yt-dlp-exec`: Download de vídeos do YouTube
- `ytdl-core`: Biblioteca alternativa para YouTube

**DevDependencies:**
- `jest`: Framework de testes

### Frontend (`frontend/package.json`)
**Dependências principais:**
- `react`: Framework de UI
- `react-dom`: Renderização React
- `react-scripts`: Scripts de desenvolvimento
- `typescript`: Tipagem estática
- `web-vitals`: Métricas de performance

**Dependências de teste:**
- `@testing-library/dom`: Utilitários de teste DOM
- `@testing-library/jest-dom`: Matchers customizados
- `@testing-library/react`: Utilitários de teste React
- `@testing-library/user-event`: Simulação de eventos

**DevDependencies:**
- `@types/jest`: Tipos para Jest
- `@types/node`: Tipos para Node.js
- `@types/react`: Tipos para React
- `@types/react-dom`: Tipos para React DOM

## 💡 Como Usar

### Uso Básico

```javascript
const { downloadAndMergeVideo } = require('./backend/src/index.js');

// Download e merge automático
const result = await downloadAndMergeVideo('https://www.youtube.com/watch?v=VIDEO_ID');
console.log(`Arquivo final: ${result}`);
```

### Uso Avançado com Factory

```javascript
const { VideoProcessorFactory } = require('./backend/src/index.js');

// Criar processador com configuração padrão
const processor = VideoProcessorFactory.createDefault();

// Processar vídeo com opções customizadas
const result = await processor.processVideo(
  'https://www.youtube.com/watch?v=VIDEO_ID',
  {
    outputDir: './custom-output',
    videoQuality: 'bestvideo[height>=1080]',
    audioQuality: 'bestaudio[ext=m4a]',
    cleanupTempFiles: false
  }
);
```

### Merge de Arquivos Existentes

```javascript
const { mergeExistingFiles } = require('./backend/src/index.js');

const result = await mergeExistingFiles(
  './video.mp4',
  './audio.webm',
  './final.mp4',
  {
    videoCodec: 'copy',
    audioCodec: 'aac'
  }
);
```

## 🔧 Funcionalidades

- **Download separado + Merge automático**: Baixa áudio e vídeo separadamente e depois junta automaticamente
- **Arquitetura extensível**: Fácil adicionar novos provedores de vídeo ou ferramentas de merge
- **Configuração flexível**: Opções customizáveis para qualidade, formato e comportamento
- **Tratamento de erros robusto**: Sistema de tratamento de erros avançado
- **Processamento em lote**: Suporte para processar múltiplos vídeos
- **Limpeza automática**: Remove arquivos temporários automaticamente
- **Interface web moderna**: Frontend React com TypeScript
- **API REST**: Backend Express com endpoints bem definidos

## 🎯 Exemplos de Extensibilidade

### Adicionar Novo Provedor de Vídeo

```javascript
const IDownloader = require('./backend/src/interfaces/IDownloader');

class VimeoDownloader extends IDownloader {
  async download(url, options) {
    // Implementação específica para Vimeo
  }
  
  async getInfo(url) {
    // Obter informações do vídeo Vimeo
  }
}

// Usar o novo downloader
const processor = VideoProcessorFactory.createCustom({
  downloader: new VimeoDownloader()
});
```

### Adicionar Nova Ferramenta de Merge

```javascript
const IMerger = require('./backend/src/interfaces/IMerger');

class HandBrakeMerger extends IMerger {
  async merge(videoPath, audioPath, outputPath, options) {
    // Implementação usando HandBrake
  }
}

// Usar o novo merger
const processor = VideoProcessorFactory.createCustom({
  merger: new HandBrakeMerger()
});
```

## 📊 Formatos de Qualidade

- `bestvideo[height>=720]`: Melhor vídeo com altura mínima de 720p
- `bestvideo[height>=1080]`: Melhor vídeo com altura mínima de 1080p
- `bestaudio`: Melhor áudio disponível
- `bestaudio[ext=m4a]`: Melhor áudio em formato M4A

## 🛠️ Scripts Disponíveis

### Root Workspace
```bash
npm test                    # Executar testes de todos os workspaces
```

### Backend
```bash
cd backend
npm start                   # Iniciar servidor de produção
npm run dev                 # Iniciar servidor de desenvolvimento
npm test                    # Executar testes
```

### Frontend
```bash
cd frontend
npm start                   # Iniciar servidor de desenvolvimento
npm run build               # Build de produção
npm test                    # Executar testes
npm run eject               # Ejetar configurações (irreversível)
```

## 🐳 Docker

O projeto inclui configuração completa do Docker para desenvolvimento e produção:

### Desenvolvimento
```bash
# Iniciar ambiente de desenvolvimento
./scripts/dev.ps1 start

# Ver logs
./scripts/dev.ps1 logs

# Parar ambiente
./scripts/dev.ps1 stop
```

### Produção
```bash
# Build e execução
docker-compose up --build
```

## 📚 Documentação

- **ADR (Architecture Decision Records)**: Decisões arquiteturais importantes
- **C4 Model**: Documentação da arquitetura em diferentes níveis
- **Integration Guide**: Guia de integração do frontend
- **Testes**: Cobertura completa com Jest

## 🔄 Desenvolvimento

### Estrutura de Workspaces
O projeto utiliza workspaces npm para:
- **Separação de responsabilidades**: Backend e frontend isolados
- **Dependências compartilhadas**: Algumas dependências no root
- **Desenvolvimento independente**: Cada workspace pode ser desenvolvido separadamente
- **Build otimizado**: Dependências compartilhadas são instaladas uma vez

### Fluxo de Desenvolvimento
1. **Backend**: Desenvolver APIs e lógica de negócio
2. **Frontend**: Consumir APIs e criar interface
3. **Testes**: Manter cobertura de testes em ambos os workspaces
4. **Docker**: Testar integração completa 