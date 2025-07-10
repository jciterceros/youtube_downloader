const YouTubeDownloader = require('../services/YouTubeDownloader');
const FFmpegMerger = require('../services/FFmpegMerger');
const FileSystemManager = require('../services/FileSystemManager');
const VideoProcessor = require('../services/VideoProcessor');

/**
 * Factory para criar instâncias do VideoProcessor
 * Aplica o princípio de responsabilidade única (SRP)
 */
class VideoProcessorFactory {
  /**
   * Cria uma instância padrão do VideoProcessor
   * @returns {VideoProcessor} Instância configurada
   */
  static createDefault() {
    const downloader = new YouTubeDownloader();
    const merger = new FFmpegMerger();
    const fileManager = new FileSystemManager();
    
    return new VideoProcessor(downloader, merger, fileManager);
  }

  /**
   * Cria uma instância customizada do VideoProcessor
   * @param {Object} options - Opções de configuração
   * @returns {VideoProcessor} Instância configurada
   */
  static createCustom(options = {}) {
    const {
      downloader = new YouTubeDownloader(),
      merger = new FFmpegMerger(),
      fileManager = new FileSystemManager()
    } = options;

    return new VideoProcessor(downloader, merger, fileManager);
  }
}

module.exports = VideoProcessorFactory; 