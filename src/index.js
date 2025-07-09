const youtubedl = require('yt-dlp-exec');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

// Configurar o caminho do ffmpeg
ffmpeg.setFfmpegPath(ffmpegPath);

async function mergeAudioVideo(videoPath, audioPath, outputPath) {
  return new Promise((resolve, reject) => {
    console.log('Juntando áudio e vídeo...');
    console.log(`Vídeo: ${videoPath}`);
    console.log(`Áudio: ${audioPath}`);
    console.log(`Saída: ${outputPath}`);

    ffmpeg()
      .input(videoPath)
      .input(audioPath)
      .outputOptions([
        '-c:v copy',        // Copiar vídeo sem recodificar
        '-c:a aac',         // Converter áudio para AAC
        '-strict experimental'
      ])
      .output(outputPath)
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

async function downloadAndMergeVideo(url, quality = 'bestvideo[height>=720]+bestaudio') {
  const outputDir = path.join(__dirname, '../downloaded');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    console.log('=== DOWNLOAD SEPARADO DE ÁUDIO E VÍDEO ===');
    
    // Download do vídeo (sem áudio)
    const videoOutputTemplate = path.join(outputDir, '%(title)s_video.%(ext)s');
    console.log('Baixando vídeo...');
    
    const videoResult = await youtubedl(
      url,
      {
        format: 'bestvideo[height>=720]',
        output: videoOutputTemplate,
        restrictFilenames: true,
        noCheckCertificates: true,
        noWarnings: true,
        preferFreeFormats: true,
        addHeader: [
          'referer:youtube.com',
          'user-agent:googlebot'
        ]
      }
    );

    // Download do áudio
    const audioOutputTemplate = path.join(outputDir, '%(title)s_audio.%(ext)s');
    console.log('Baixando áudio...');
    
    const audioResult = await youtubedl(
      url,
      {
        format: 'bestaudio',
        output: audioOutputTemplate,
        restrictFilenames: true,
        noCheckCertificates: true,
        noWarnings: true,
        preferFreeFormats: true,
        addHeader: [
          'referer:youtube.com',
          'user-agent:googlebot'
        ]
      }
    );

    // Encontrar os arquivos baixados
    const files = fs.readdirSync(outputDir);
    const videoFile = files.find(file => file.includes('_video.'));
    const audioFile = files.find(file => file.includes('_audio.'));

    if (!videoFile || !audioFile) {
      throw new Error('Arquivos de vídeo ou áudio não encontrados');
    }

    const videoPath = path.join(outputDir, videoFile);
    const audioPath = path.join(outputDir, audioFile);
    const finalOutputPath = path.join(outputDir, videoFile.replace('_video.', '_final.').replace(/\.[^/.]+$/, '.mp4'));

    console.log('=== FAZENDO MERGE DE ÁUDIO E VÍDEO ===');
    await mergeAudioVideo(videoPath, audioPath, finalOutputPath);

    // Limpar arquivos temporários
    console.log('Limpando arquivos temporários...');
    fs.unlinkSync(videoPath);
    fs.unlinkSync(audioPath);

    console.log(`Download e merge concluídos! Arquivo final: ${finalOutputPath}`);
    
  } catch (error) {
    console.error('Erro durante o processo:', error.message);
  }
}

// Exemplo de uso:
const videoUrl = 'https://www.youtube.com/watch?v=GwvLNW4pFBU';

// Download separado e merge de áudio/vídeo
console.log('\n=== DOWNLOAD SEPARADO E MERGE ===');
downloadAndMergeVideo(videoUrl);
