const path = require('path');

/**
 * Serviço principal para processamento de vídeos
 * Aplica o princípio de responsabilidade única (SRP) e inversão de dependência (DIP)
 */
class VideoProcessor {
  /**
   * @param {IDownloader} downloader - Implementação do downloader
   * @param {IMerger} merger - Implementação do merger
   * @param {IFileManager} fileManager - Implementação do gerenciador de arquivos
   */
  constructor(downloader, merger, fileManager) {
    this.downloader = downloader;
    this.merger = merger;
    this.fileManager = fileManager;
  }

  /**
   * Processa um vídeo: baixa áudio e vídeo separadamente e depois junta
   * @param {string} url - URL do vídeo
   * @param {Object} options - Opções de processamento
   * @returns {Promise<string>} Caminho do arquivo final
   */
  async processVideo(url, options = {}) {
    const defaultOptions = {
      outputDir: path.join(__dirname, '../../downloaded'),
      videoQuality: 'bestvideo[height>=720]',
      audioQuality: 'bestaudio',
      cleanupTempFiles: true
    };

    const finalOptions = { ...defaultOptions, ...options };

    try {
      console.log('=== DOWNLOAD SEPARADO DE ÁUDIO E VÍDEO ===');
      
      // Garantir que o diretório de saída existe
      this.fileManager.ensureDirectoryExists(finalOptions.outputDir);

      // Download do vídeo (sem áudio)
      const videoOutputTemplate = path.join(finalOptions.outputDir, '%(title)s_video.%(ext)s');
      console.log('Baixando vídeo...');
      
      await this.downloader.downloadVideoOnly(url, videoOutputTemplate);

      // Download do áudio
      const audioOutputTemplate = path.join(finalOptions.outputDir, '%(title)s_audio.%(ext)s');
      console.log('Baixando áudio...');
      
      await this.downloader.downloadAudioOnly(url, audioOutputTemplate);

      // Encontrar os arquivos baixados
      const files = this.fileManager.listFiles(finalOptions.outputDir);
      const videoFile = files.find(file => file.includes('_video.'));
      const audioFile = files.find(file => file.includes('_audio.'));

      if (!videoFile || !audioFile) {
        throw new Error('Arquivos de vídeo ou áudio não encontrados');
      }

      const videoPath = this.fileManager.getFullPath(finalOptions.outputDir, videoFile);
      const audioPath = this.fileManager.getFullPath(finalOptions.outputDir, audioFile);
      const finalOutputPath = this.fileManager.getFullPath(
        finalOptions.outputDir, 
        videoFile.replace('_video.', '_final.').replace(/\.[^/.]+$/, '.mp4')
      );

      console.log('=== FAZENDO MERGE DE ÁUDIO E VÍDEO ===');
      await this.merger.merge(videoPath, audioPath, finalOutputPath);

      // Limpar arquivos temporários se solicitado
      if (finalOptions.cleanupTempFiles) {
        console.log('Limpando arquivos temporários...');
        this.fileManager.removeFile(videoPath);
        this.fileManager.removeFile(audioPath);
      }

      console.log(`Download e merge concluídos! Arquivo final: ${finalOutputPath}`);
      return finalOutputPath;
      
    } catch (error) {
      console.error('Erro durante o processo:', error.message);
      throw error;
    }
  }

  /**
   * Junta arquivos de áudio e vídeo existentes
   * @param {string} videoPath - Caminho do arquivo de vídeo
   * @param {string} audioPath - Caminho do arquivo de áudio
   * @param {string} outputPath - Caminho do arquivo de saída
   * @param {Object} options - Opções de merge
   * @returns {Promise<string>} Caminho do arquivo final
   */
  async mergeExistingFiles(videoPath, audioPath, outputPath, options = {}) {
    // Verificar se os arquivos existem
    if (!this.fileManager.fileExists(videoPath)) {
      throw new Error(`Arquivo de vídeo não encontrado: ${videoPath}`);
    }
    if (!this.fileManager.fileExists(audioPath)) {
      throw new Error(`Arquivo de áudio não encontrado: ${audioPath}`);
    }

    // Garantir que o diretório de saída existe
    const outputDir = path.dirname(outputPath);
    this.fileManager.ensureDirectoryExists(outputDir);

    return this.merger.merge(videoPath, audioPath, outputPath, options);
  }
}

module.exports = VideoProcessor; 