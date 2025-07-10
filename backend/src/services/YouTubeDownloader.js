const youtubedl = require('yt-dlp-exec');
const IDownloader = require('../interfaces/IDownloader');

/**
 * Implementação concreta do downloader do YouTube
 * Aplica o princípio de responsabilidade única (SRP)
 */
class YouTubeDownloader extends IDownloader {
  constructor() {
    super();
  }

  /**
   * Baixa um vídeo do YouTube
   * @param {string} url - URL do vídeo
   * @param {Object} options - Opções de download
   * @returns {Promise<string>} Caminho do arquivo baixado
   */
  async download(url, options = {}) {
    const defaultOptions = {
      format: 'best',
      restrictFilenames: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: [
        'referer:youtube.com',
        'user-agent:googlebot'
      ]
    };

    const finalOptions = { ...defaultOptions, ...options };
    
    try {
      const result = await youtubedl(url, finalOptions);
      return result;
    } catch (error) {
      throw new Error(`Erro ao baixar vídeo: ${error.message}`);
    }
  }

  /**
   * Obtém informações do vídeo
   * @param {string} url - URL do vídeo
   * @returns {Promise<Object>} Informações do vídeo
   */
  async getInfo(url) {
    try {
      const info = await youtubedl(url, {
        dumpJson: true,
        noCheckCertificates: true,
        noWarnings: true
      });
      return info;
    } catch (error) {
      throw new Error(`Erro ao obter informações do vídeo: ${error.message}`);
    }
  }

  /**
   * Baixa apenas o vídeo (sem áudio)
   * @param {string} url - URL do vídeo
   * @param {string} outputTemplate - Template de saída
   * @returns {Promise<string>} Caminho do arquivo de vídeo
   */
  async downloadVideoOnly(url, outputTemplate) {
    return this.download(url, {
      format: 'bestvideo[height>=720]',
      output: outputTemplate
    });
  }

  /**
   * Baixa apenas o áudio
   * @param {string} url - URL do vídeo
   * @param {string} outputTemplate - Template de saída
   * @returns {Promise<string>} Caminho do arquivo de áudio
   */
  async downloadAudioOnly(url, outputTemplate) {
    return this.download(url, {
      format: 'bestaudio',
      output: outputTemplate
    });
  }
}

module.exports = YouTubeDownloader; 