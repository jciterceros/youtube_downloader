const fs = require('fs');
const path = require('path');
const IFileManager = require('../interfaces/IFileManager');

/**
 * Implementação concreta do gerenciador de arquivos
 * Aplica o princípio de responsabilidade única (SRP)
 */
class FileSystemManager extends IFileManager {
  constructor() {
    super();
  }

  /**
   * Cria um diretório se não existir
   * @param {string} dirPath - Caminho do diretório
   */
  ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  /**
   * Lista arquivos em um diretório
   * @param {string} dirPath - Caminho do diretório
   * @returns {string[]} Lista de arquivos
   */
  listFiles(dirPath) {
    if (!fs.existsSync(dirPath)) {
      return [];
    }
    return fs.readdirSync(dirPath);
  }

  /**
   * Remove um arquivo
   * @param {string} filePath - Caminho do arquivo
   */
  removeFile(filePath) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  /**
   * Verifica se um arquivo existe
   * @param {string} filePath - Caminho do arquivo
   * @returns {boolean} True se existe
   */
  fileExists(filePath) {
    return fs.existsSync(filePath);
  }

  /**
   * Encontra arquivos por padrão
   * @param {string} dirPath - Caminho do diretório
   * @param {string} pattern - Padrão para buscar
   * @returns {string[]} Lista de arquivos que correspondem ao padrão
   */
  findFilesByPattern(dirPath, pattern) {
    const files = this.listFiles(dirPath);
    return files.filter(file => file.includes(pattern));
  }

  /**
   * Obtém o caminho completo de um arquivo
   * @param {string} dirPath - Caminho do diretório
   * @param {string} fileName - Nome do arquivo
   * @returns {string} Caminho completo
   */
  getFullPath(dirPath, fileName) {
    return path.join(dirPath, fileName);
  }
}

module.exports = FileSystemManager; 