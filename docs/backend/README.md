# Documentação Backend - YouTube Downloader

Esta documentação descreve a arquitetura do backend do YouTube Downloader usando o modelo C4.

## 📋 Visão Geral

O backend é uma API REST Node.js que implementa a lógica de negócio para download e processamento de vídeos do YouTube. A arquitetura segue os princípios SOLID com injeção de dependência, interfaces bem definidas e testes unitários abrangentes.

## 🏗️ Estrutura C4 Model

### C1 - Context Diagram
- **Escopo**: Sistema no contexto de usuários e sistemas externos
- **Foco**: Interação entre usuário, backend, YouTube e FFmpeg
- **Artefato**: `C1_Context.md`

### C2 - Container Diagram  
- **Escopo**: Containers principais do sistema
- **Foco**: CLI/API, Core Application, Downloaded Files
- **Artefato**: `C2_Container.md`

### C3 - Component Diagram
- **Escopo**: Componentes internos do Core Application
- **Foco**: VideoProcessor, YouTubeDownloader, FFmpegMerger, FileSystemManager
- **Artefato**: `C3_Component.md`

### C4 - Code Diagram
- **Escopo**: Detalhes de implementação dos componentes
- **Foco**: Classes, interfaces, métodos e propriedades
- **Artefato**: `C4_Code.md`

## 🎯 Principais Características

### Arquitetura SOLID
- **Single Responsibility**: Cada classe tem uma única responsabilidade
- **Open/Closed**: Aberto para extensão, fechado para modificação
- **Liskov Substitution**: Implementações podem ser substituídas por suas interfaces
- **Interface Segregation**: Interfaces específicas e coesas
- **Dependency Inversion**: Dependências de abstrações, não de implementações

### Padrões de Design
- **Dependency Injection**: Injeção de dependências via interfaces
- **Factory Pattern**: Criação de instâncias via VideoProcessorFactory
- **Strategy Pattern**: Diferentes estratégias de download e merge
- **Adapter Pattern**: Adaptação de bibliotecas externas

### Funcionalidades Principais
- **Download Separado**: Baixa áudio e vídeo separadamente
- **Merge Automático**: Une arquivos usando FFmpeg
- **Configuração Flexível**: Opções customizáveis para qualidade e formato
- **Tratamento de Erros**: Sistema robusto de tratamento de exceções
- **Limpeza Automática**: Remove arquivos temporários

## 📁 Estrutura de Arquivos

```
backend/
├── src/
│   ├── interfaces/                    # Interfaces SOLID
│   │   ├── IDownloader.js             # Interface para downloaders
│   │   ├── IMerger.js                 # Interface para mergers
│   │   └── IFileManager.js            # Interface para gerenciamento de arquivos
│   ├── services/                      # Implementações concretas
│   │   ├── YouTubeDownloader.js       # Downloader para YouTube
│   │   ├── FFmpegMerger.js            # Merger usando FFmpeg
│   │   ├── FileSystemManager.js       # Gerenciamento de arquivos
│   │   └── VideoProcessor.js          # Orquestrador principal
│   ├── factories/                     # Factories para criação
│   │   └── VideoProcessorFactory.js   # Factory para VideoProcessor
│   ├── examples/                      # Exemplos de uso
│   │   └── advanced-usage.js          # Exemplos avançados
│   ├── index.js                       # Ponto de entrada simplificado
│   └── server.js                      # Servidor Express
├── tests/                             # Testes unitários
│   ├── YouTubeDownloader.test.js
│   ├── FFmpegMerger.test.js
│   ├── FileSystemManager.test.js
│   └── VideoProcessor.test.js
└── downloaded/                        # Pasta para arquivos baixados
```

## 🔄 Fluxo de Processamento

1. **Recebimento da URL**: API recebe URL do YouTube
2. **Validação**: Verificação do formato e disponibilidade do vídeo
3. **Download Separado**: Baixa áudio e vídeo em streams separados
4. **Processamento**: FFmpeg processa e une os arquivos
5. **Limpeza**: Remove arquivos temporários
6. **Retorno**: Retorna caminho do arquivo final

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript
- **Express**: Framework web
- **yt-dlp-exec**: Download de vídeos do YouTube
- **fluent-ffmpeg**: Processamento de áudio/vídeo
- **@ffmpeg-installer/ffmpeg**: Instalador automático do FFmpeg
- **Jest**: Framework de testes
- **CORS**: Middleware para requisições cross-origin

## 🧪 Testes

O backend inclui cobertura completa de testes:

- **Testes Unitários**: Cada serviço testado isoladamente
- **Testes de Integração**: Fluxo completo de download e merge
- **Mocks**: Simulação de dependências externas
- **Cobertura**: Relatórios de cobertura de código

## 🚀 Deploy

A aplicação pode ser executada em diferentes ambientes:

- **Desenvolvimento**: `npm run dev` (nodemon)
- **Produção**: `npm start` (Node.js)
- **Docker**: Containerização para deploy consistente
- **Testes**: `npm test` (Jest)

## 📊 Formatos Suportados

### Qualidade de Vídeo
- `bestvideo[height>=720]`: Melhor vídeo 720p+
- `bestvideo[height>=1080]`: Melhor vídeo 1080p+
- `bestvideo`: Melhor qualidade disponível

### Qualidade de Áudio
- `bestaudio`: Melhor áudio disponível
- `bestaudio[ext=m4a]`: Melhor áudio M4A
- `bestaudio[ext=webm]`: Melhor áudio WebM

### Formatos de Saída
- **MP4**: Formato padrão com codec H.264
- **WebM**: Formato alternativo com codec VP9
- **MKV**: Formato container flexível

## 🔧 Configuração

### Variáveis de Ambiente
```env
PORT=3000                    # Porta do servidor
NODE_ENV=development         # Ambiente de execução
DOWNLOAD_DIR=./downloaded    # Pasta para downloads
CLEANUP_TEMP=true            # Limpeza automática
```

### Opções de Processamento
```javascript
const options = {
  outputDir: './custom-output',
  videoQuality: 'bestvideo[height>=1080]',
  audioQuality: 'bestaudio[ext=m4a]',
  cleanupTempFiles: true,
  videoCodec: 'copy',
  audioCodec: 'aac'
};
```

## 📚 Documentação Relacionada

- **ADR 0001**: Arquitetura SOLID e Injeção de Dependência
- **ADR 0002**: Framework de Testes Jest
- **Frontend C4 Model**: Documentação da interface web
- **README Principal**: Visão geral do projeto
- **Docker Compose**: Orquestração de containers

## 🔄 Extensibilidade

### Adicionar Novo Provedor
```javascript
class VimeoDownloader extends IDownloader {
  async download(url, options) {
    // Implementação específica
  }
}
```

### Adicionar Nova Estratégia de Merge
```javascript
class HandBrakeMerger extends IMerger {
  async merge(videoPath, audioPath, outputPath, options) {
    // Implementação usando HandBrake
  }
}
```

### Usar Factory Customizada
```javascript
const processor = VideoProcessorFactory.createCustom({
  downloader: new VimeoDownloader(),
  merger: new HandBrakeMerger()
});
``` 