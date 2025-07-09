# YouTube Downloader com Merge de Áudio/Vídeo (Arquitetura SOLID)

Este projeto permite baixar vídeos do YouTube separando áudio e vídeo, e depois juntá-los em um único arquivo final de alta qualidade. A arquitetura foi refatorada seguindo os princípios SOLID para máxima extensibilidade e manutenibilidade.

## 🏗️ Arquitetura SOLID

O projeto foi estruturado seguindo os princípios SOLID:

- **S** - Single Responsibility: Cada classe tem uma única responsabilidade
- **O** - Open/Closed: Aberto para extensão, fechado para modificação
- **L** - Liskov Substitution: Implementações podem ser substituídas por suas interfaces
- **I** - Interface Segregation: Interfaces específicas e coesas
- **D** - Dependency Inversion: Dependências de abstrações, não de implementações

## 📁 Estrutura do Projeto

```
youtube_downloader/
├── src/
│   ├── interfaces/           # Interfaces SOLID
│   │   ├── IDownloader.js
│   │   ├── IMerger.js
│   │   └── IFileManager.js
│   ├── services/            # Implementações concretas
│   │   ├── YouTubeDownloader.js
│   │   ├── FFmpegMerger.js
│   │   ├── FileSystemManager.js
│   │   └── VideoProcessor.js
│   ├── factories/           # Factories para criação de instâncias
│   │   └── VideoProcessorFactory.js
│   ├── examples/            # Exemplos de uso avançado
│   │   └── advanced-usage.js
│   └── index.js             # Ponto de entrada simplificado
├── downloaded/              # Pasta onde os arquivos são salvos
├── SOLID_ANALYSIS.md        # Documentação da aplicação SOLID
├── package.json
└── README.md
```

## 🚀 Instalação

```bash
npm install
```

## 💡 Como Usar

### Uso Básico

```javascript
const { downloadAndMergeVideo } = require('./src/index.js');

// Download e merge automático
const result = await downloadAndMergeVideo('https://www.youtube.com/watch?v=VIDEO_ID');
console.log(`Arquivo final: ${result}`);
```

### Uso Avançado com Factory

```javascript
const { VideoProcessorFactory } = require('./src/index.js');

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
const { mergeExistingFiles } = require('./src/index.js');

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

## 🎯 Exemplos de Extensibilidade

### Adicionar Novo Provedor de Vídeo

```javascript
const IDownloader = require('./src/interfaces/IDownloader');

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
const IMerger = require('./src/interfaces/IMerger');

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

## 🛠️ Dependências

- `yt-dlp-exec`: Para download de vídeos do YouTube
- `fluent-ffmpeg`: Para processamento de áudio/vídeo
- `@ffmpeg-installer/ffmpeg`: Instalador automático do FFmpeg

## 🧪 Testes

O projeto possui **testes unitários reais** para todos os serviços principais, escritos com Jest e seguindo o padrão AAA (Arrange, Act, Assert) recomendado por Rodrigo Branas. Os testes cobrem:

- YouTubeDownloader
- FFmpegMerger
- FileSystemManager
- VideoProcessor

### Como rodar os testes

```bash
npm run test
```

### Exemplo de teste (padrão AAA)

```javascript
it('should process video and merge audio/video', async () => {
  // Arrange
  downloader.downloadVideoOnly.mockResolvedValue('video');
  downloader.downloadAudioOnly.mockResolvedValue('audio');
  fileManager.listFiles.mockReturnValue(['test_video.mp4', 'test_audio.webm']);
  fileManager.getFullPath.mockImplementation((dir, file) => `${dir}/${file}`);
  merger.merge.mockResolvedValue('dir/test_final.mp4');

  // Act
  const result = await processor.processVideo('url', { outputDir: 'dir' });

  // Assert
  expect(fileManager.ensureDirectoryExists).toHaveBeenCalledWith('dir');
  expect(downloader.downloadVideoOnly).toHaveBeenCalled();
  expect(downloader.downloadAudioOnly).toHaveBeenCalled();
  expect(merger.merge).toHaveBeenCalled();
  expect(fileManager.removeFile).toHaveBeenCalledTimes(2);
  expect(result).toBe('dir/test_final.mp4');
});
```

- Todos os testes são isolados, utilizam mocks para dependências externas e silenciam logs para não poluir o output.
- A cobertura dos serviços é superior a 90%.
- Para ver a cobertura, rode:

```bash
npx jest --coverage
```

## 📈 Benefícios da Arquitetura SOLID

### 1. Testabilidade
- Fácil criação de mocks para testes unitários
- Isolamento de responsabilidades para testes específicos

### 2. Extensibilidade
- Adicionar novos provedores sem modificar código existente
- Implementar novas estratégias de merge facilmente

### 3. Manutenibilidade
- Código organizado e fácil de entender
- Mudanças isoladas em classes específicas

### 4. Reutilização
- Componentes podem ser reutilizados em outros contextos
- Interfaces padronizadas facilitam integração

## 🎨 Características Técnicas

- **Vídeo**: Copiado sem recodificação (`-c:v copy`)
- **Áudio**: Convertido para AAC (`-c:a aac`)
- **Formato final**: MP4
- **Qualidade configurável**: 720p, 1080p ou customizada
- **Progresso**: Exibido em tempo real durante o merge
- **Limpeza automática**: Remove arquivos temporários automaticamente

## 📝 Notas

- Os arquivos temporários são automaticamente removidos após o merge
- O arquivo final é sempre salvo em formato MP4
- O progresso do merge é exibido em tempo real
- Em caso de erro, uma mensagem detalhada é exibida
- O diretório de saída é criado automaticamente se não existir
- A arquitetura permite fácil extensão para outros provedores de vídeo

## 🔍 Documentação Adicional

Para mais detalhes sobre a aplicação dos princípios SOLID, consulte o arquivo [SOLID_ANALYSIS.md](./SOLID_ANALYSIS.md). 