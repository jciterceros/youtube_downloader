const VideoProcessorFactory = require('../factories/VideoProcessorFactory');
const YouTubeDownloader = require('../services/YouTubeDownloader');
const FFmpegMerger = require('../services/FFmpegMerger');
const FileSystemManager = require('../services/FileSystemManager');

/**
 * Exemplo de uso avançado demonstrando a extensibilidade da estrutura SOLID
 */

// Exemplo 1: Uso básico com configuração padrão
async function exemploBasico() {
  console.log('=== EXEMPLO BÁSICO ===');
  
  const processor = VideoProcessorFactory.createDefault();
  
  try {
    const result = await processor.processVideo(
      'https://www.youtube.com/watch?v=GwvLNW4pFBU',
      {
        outputDir: './downloaded/exemplo1',
        cleanupTempFiles: true
      }
    );
    console.log(`Resultado: ${result}`);
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

// Exemplo 2: Uso com configuração customizada
async function exemploCustomizado() {
  console.log('=== EXEMPLO CUSTOMIZADO ===');
  
  // Criar instâncias customizadas
  const downloader = new YouTubeDownloader();
  const merger = new FFmpegMerger();
  const fileManager = new FileSystemManager();
  
  const processor = VideoProcessorFactory.createCustom({
    downloader,
    merger,
    fileManager
  });
  
  try {
    const result = await processor.processVideo(
      'https://www.youtube.com/watch?v=GwvLNW4pFBU',
      {
        outputDir: './downloaded/exemplo2',
        cleanupTempFiles: false, // Manter arquivos temporários
        videoQuality: 'bestvideo[height>=1080]', // Qualidade 1080p
        audioQuality: 'bestaudio[ext=m4a]' // Apenas M4A
      }
    );
    console.log(`Resultado: ${result}`);
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

// Exemplo 3: Processamento em lote
async function exemploLote() {
  console.log('=== EXEMPLO EM LOTE ===');
  
  const processor = VideoProcessorFactory.createDefault();
  const urls = [
    'https://www.youtube.com/watch?v=GwvLNW4pFBU',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  ];
  
  const results = [];
  
  for (let i = 0; i < urls.length; i++) {
    console.log(`Processando vídeo ${i + 1}/${urls.length}`);
    
    try {
      const result = await processor.processVideo(urls[i], {
        outputDir: `./downloaded/lote/video${i + 1}`,
        cleanupTempFiles: true
      });
      results.push(result);
    } catch (error) {
      console.error(`Erro no vídeo ${i + 1}:`, error.message);
    }
  }
  
  console.log('Resultados:', results);
}

// Exemplo 4: Merge de arquivos existentes
async function exemploMergeExistente() {
  console.log('=== EXEMPLO MERGE EXISTENTE ===');
  
  const processor = VideoProcessorFactory.createDefault();
  
  try {
    const result = await processor.mergeExistingFiles(
      './downloaded/video.mp4',
      './downloaded/audio.webm',
      './downloaded/final.mp4',
      {
        videoCodec: 'copy',
        audioCodec: 'aac',
        strict: 'experimental'
      }
    );
    console.log(`Merge concluído: ${result}`);
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

// Exemplo 5: Uso com tratamento de erros avançado
async function exemploComTratamentoErros() {
  console.log('=== EXEMPLO COM TRATAMENTO DE ERROS ===');
  
  const processor = VideoProcessorFactory.createDefault();
  
  try {
    // Tentar processar um vídeo inválido
    const result = await processor.processVideo(
      'https://www.youtube.com/watch?v=invalid',
      {
        outputDir: './downloaded/erro',
        cleanupTempFiles: true
      }
    );
    console.log(`Resultado: ${result}`);
  } catch (error) {
    if (error.message.includes('Video unavailable')) {
      console.error('Vídeo não disponível ou privado');
    } else if (error.message.includes('Network')) {
      console.error('Erro de conexão com a internet');
    } else if (error.message.includes('FFmpeg')) {
      console.error('Erro no processamento de mídia');
    } else {
      console.error('Erro desconhecido:', error.message);
    }
  }
}

// Executar exemplos
async function executarExemplos() {
  console.log('Iniciando exemplos de uso avançado...\n');
  
  // await exemploBasico();
  // await exemploCustomizado();
  // await exemploLote();
  // await exemploMergeExistente();
  await exemploComTratamentoErros();
  
  console.log('\nExemplos concluídos!');
}

// Executar se chamado diretamente
if (require.main === module) {
  executarExemplos();
}

module.exports = {
  exemploBasico,
  exemploCustomizado,
  exemploLote,
  exemploMergeExistente,
  exemploComTratamentoErros
}; 