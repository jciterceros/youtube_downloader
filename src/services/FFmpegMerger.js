const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const IMerger = require('../interfaces/IMerger');

// Configurar o caminho do ffmpeg
ffmpeg.setFfmpegPath(ffmpegPath);

/**
 * Implementação concreta do merger usando FFmpeg
 * Aplica o princípio de responsabilidade única (SRP)
 */
class FFmpegMerger extends IMerger {
  constructor() {
    super();
  }

  /**
   * Junta arquivos de áudio e vídeo usando FFmpeg
   * @param {string} videoPath - Caminho do arquivo de vídeo
   * @param {string} audioPath - Caminho do arquivo de áudio
   * @param {string} outputPath - Caminho do arquivo de saída
   * @param {Object} options - Opções de merge
   * @returns {Promise<string>} Caminho do arquivo final
   */
  async merge(videoPath, audioPath, outputPath, options = {}) {
    const defaultOptions = {
      videoCodec: 'copy',
      audioCodec: 'aac',
      strict: 'experimental'
    };

    const finalOptions = { ...defaultOptions, ...options };

    return new Promise((resolve, reject) => {
      console.log('Juntando áudio e vídeo...');
      console.log(`Vídeo: ${videoPath}`);
      console.log(`Áudio: ${audioPath}`);
      console.log(`Saída: ${outputPath}`);

      const command = ffmpeg()
        .input(videoPath)
        .input(audioPath)
        .outputOptions([
          `-c:v ${finalOptions.videoCodec}`,
          `-c:a ${finalOptions.audioCodec}`,
          `-strict ${finalOptions.strict}`
        ])
        .output(outputPath);

      command
        .on('end', () => {
          console.log('Merge concluído com sucesso!');
          resolve(outputPath);
        })
        .on('error', (err) => {
          console.error('Erro durante o merge:', err.message);
          reject(err);
        })
        .on('progress', (progress) => {
          if (progress.percent) {
            console.log(`Progresso: ${Math.round(progress.percent)}%`);
          }
        })
        .run();
    });
  }
}

module.exports = FFmpegMerger; 