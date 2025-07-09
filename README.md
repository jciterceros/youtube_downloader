# YouTube Downloader com Merge de Áudio/Vídeo

Este projeto permite baixar vídeos do YouTube separando áudio e vídeo, e depois juntá-los em um único arquivo final de alta qualidade.

## Funcionalidades

- **Download separado + Merge automático**: Baixa áudio e vídeo separadamente e depois junta automaticamente
- **Merge de áudio/vídeo**: Função utilitária para juntar arquivos de áudio e vídeo já baixados

## Instalação

```bash
npm install
```

## Como usar

### Download Separado + Merge Automático
```javascript
downloadAndMergeVideo(url);
```
Esta função:
- Baixa o vídeo (sem áudio) na melhor qualidade disponível (720p ou superior)
- Baixa o áudio separadamente na melhor qualidade
- Junta os dois arquivos usando FFmpeg
- Remove os arquivos temporários automaticamente
- Gera um arquivo final MP4

### Merge de Arquivos Existentes
```javascript
const videoFile = 'caminho/para/video.mp4';
const audioFile = 'caminho/para/audio.webm';
const outputFile = 'caminho/para/final.mp4';
mergeExistingFiles(videoFile, audioFile, outputFile);
```

## Formatos de Qualidade

- `bestvideo[height>=720]`: Melhor vídeo com altura mínima de 720p
- `bestaudio`: Melhor áudio disponível

## Estrutura de Arquivos

```
youtube_downloader/
├── src/
│   └── index.js          # Código principal
├── downloaded/           # Pasta onde os arquivos são salvos
├── package.json
└── README.md
```

## Dependências

- `yt-dlp-exec`: Para download de vídeos do YouTube
- `fluent-ffmpeg`: Para processamento de áudio/vídeo
- `@ffmpeg-installer/ffmpeg`: Instalador automático do FFmpeg

## Exemplo de Uso

### Download e Merge Automático
```javascript
const videoUrl = 'https://www.youtube.com/watch?v=VIDEO_ID';

// Download e merge automático
downloadAndMergeVideo(videoUrl);
```

### Merge de Arquivos Existentes
```javascript
const { mergeExistingFiles } = require('./src/index.js');

const videoFile = 'caminho/para/video.mp4';
const audioFile = 'caminho/para/audio.webm';
const outputFile = 'caminho/para/final.mp4';

mergeExistingFiles(videoFile, audioFile, outputFile);
```

## Vantagens do Download Separado + Merge

1. **Melhor qualidade**: Permite escolher a melhor qualidade de vídeo e áudio separadamente
2. **Controle total**: Você pode escolher exatamente qual formato de áudio e vídeo usar
3. **Compatibilidade**: O arquivo final é sempre MP4, garantindo compatibilidade
4. **Eficiência**: Não precisa recodificar o vídeo, apenas junta os streams
5. **Limpeza automática**: Remove arquivos temporários automaticamente

## Características Técnicas

- **Vídeo**: Copiado sem recodificação (`-c:v copy`)
- **Áudio**: Convertido para AAC (`-c:a aac`)
- **Formato final**: MP4
- **Qualidade mínima**: 720p para vídeo
- **Progresso**: Exibido em tempo real durante o merge

## Notas

- Os arquivos temporários são automaticamente removidos após o merge
- O arquivo final é sempre salvo em formato MP4
- O progresso do merge é exibido em tempo real
- Em caso de erro, uma mensagem detalhada é exibida
- O diretório `downloaded/` é criado automaticamente se não existir 