/**
 * Interface para merger de áudio e vídeo
 * Aplica o princípio de inversão de dependência (DIP)
 */
class IMerger {
  /**
   * Junta arquivos de áudio e vídeo
   * @param {string} videoPath - Caminho do arquivo de vídeo
   * @param {string} audioPath - Caminho do arquivo de áudio
   * @param {string} outputPath - Caminho do arquivo de saída
   * @param {Object} options - Opções de merge
   * @returns {Promise<string>} Caminho do arquivo final
   */
  async merge(videoPath, audioPath, outputPath, options = {}) {
    throw new Error('Method merge() must be implemented');
  }
}

module.exports = IMerger; 