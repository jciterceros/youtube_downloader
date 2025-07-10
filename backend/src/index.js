const VideoProcessorFactory = require('./factories/VideoProcessorFactory');

// Criar instância do processador usando a factory
const videoProcessor = VideoProcessorFactory.createDefault();

/**
 * Função principal para download e merge de vídeo
 * @param {string} url - URL do vídeo do YouTube
 * @param {Object} options - Opções de processamento
 * @returns {Promise<string>} Caminho do arquivo final
 */
async function downloadAndMergeVideo(url, options = {}) {
  return videoProcessor.processVideo(url, options);
}

/**
 * Função para merge de arquivos existentes
 * @param {string} videoPath - Caminho do arquivo de vídeo
 * @param {string} audioPath - Caminho do arquivo de áudio
 * @param {string} outputPath - Caminho do arquivo de saída
 * @param {Object} options - Opções de merge
 * @returns {Promise<string>} Caminho do arquivo final
 */
async function mergeExistingFiles(videoPath, audioPath, outputPath, options = {}) {
  return videoProcessor.mergeExistingFiles(videoPath, audioPath, outputPath, options);
}

// Exemplo de uso:
// const videoUrl = 'https://www.youtube.com/watch?v=GwvLNW4pFBU';

// Download separado e merge de áudio/vídeo
// console.log('\n=== DOWNLOAD SEPARADO E MERGE ===');
// downloadAndMergeVideo(videoUrl)
//   .then(finalPath => {
//     console.log(`Processo concluído: ${finalPath}`);
//   })
//   .catch(error => {
//     console.error('Erro:', error.message);
//   });

// Exportar funções para uso externo
module.exports = {
  downloadAndMergeVideo,
  mergeExistingFiles,
  VideoProcessorFactory
};
