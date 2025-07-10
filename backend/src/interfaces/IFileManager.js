/**
 * Interface para gerenciamento de arquivos
 * Aplica o princípio de inversão de dependência (DIP)
 */
class IFileManager {
  /**
   * Cria um diretório se não existir
   * @param {string} path - Caminho do diretório
   */
  ensureDirectoryExists(path) {
    throw new Error('Method ensureDirectoryExists() must be implemented');
  }

  /**
   * Lista arquivos em um diretório
   * @param {string} path - Caminho do diretório
   * @returns {string[]} Lista de arquivos
   */
  listFiles(path) {
    throw new Error('Method listFiles() must be implemented');
  }

  /**
   * Remove um arquivo
   * @param {string} path - Caminho do arquivo
   */
  removeFile(path) {
    throw new Error('Method removeFile() must be implemented');
  }

  /**
   * Verifica se um arquivo existe
   * @param {string} path - Caminho do arquivo
   * @returns {boolean} True se existe
   */
  fileExists(path) {
    throw new Error('Method fileExists() must be implemented');
  }
}

module.exports = IFileManager; 