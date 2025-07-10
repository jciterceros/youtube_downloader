/**
 * Interface para downloaders de vídeo
 * Aplica o princípio de inversão de dependência (DIP)
 */
class IDownloader {
  /**
   * Baixa um vídeo de uma URL
   * @param {string} url - URL do vídeo
   * @param {Object} options - Opções de download
   * @returns {Promise<string>} Caminho do arquivo baixado
   */
  async download(url, options) {
    throw new Error('Method download() must be implemented');
  }

  /**
   * Obtém informações do vídeo
   * @param {string} url - URL do vídeo
   * @returns {Promise<Object>} Informações do vídeo
   */
  async getInfo(url) {
    throw new Error('Method getInfo() must be implemented');
  }
}

module.exports = IDownloader; 