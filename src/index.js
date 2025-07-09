const youtubedl = require('yt-dlp-exec');
const path = require('path');
const fs = require('fs');

async function listAvailableFormats(url) {
  try {
    console.log('Obtendo formatos disponíveis...');
    
    const result = await youtubedl(
      url,
      {
        listFormats: true,
        noCheckCertificates: true,
        noWarnings: true
      }
    );

    console.log('Formatos disponíveis:');
    console.log(result);
    
  } catch (error) {
    console.error('Erro ao obter formatos:', error.message);
  }
}

async function downloadYouTubeVideo(url, quality = 'bestvideo+bestaudio') {
  const outputDir = path.join(__dirname, '../downloaded');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputTemplate = path.join(outputDir, '%(title)s.%(ext)s');

  try {
    console.log('Iniciando download...');
    
    const result = await youtubedl(
      url,
      {
        format: quality,
        output: outputTemplate,
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

    console.log('Download concluído!');
    console.log('Resultado:', result);
    
  } catch (error) {
    console.error('Erro ao baixar o vídeo:', error.message);
  }
}

async function downloadYouTubeVideoMKV(url, quality = 'bestvideo+bestaudio') {
  const outputDir = path.join(__dirname, '../downloaded');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputTemplate = path.join(outputDir, '%(title)s.%(ext)s');

  try {
    console.log('Iniciando download em MKV...');
    
    const result = await youtubedl(
      url,
      {
        format: quality,
        output: outputTemplate,
        restrictFilenames: true,
        noCheckCertificates: true,
        noWarnings: true,
        preferFreeFormats: true,
        mergeOutputFormat: 'mkv',
        addHeader: [
          'referer:youtube.com',
          'user-agent:googlebot'
        ]
      }
    );

    console.log('Download MKV concluído!');
    console.log('Resultado:', result);
    
  } catch (error) {
    console.error('Erro ao baixar o vídeo MKV:', error.message);
  }
}

// Exemplo de uso:
const videoUrl = 'https://www.youtube.com/watch?v=GwvLNW4pFBU';

// Primeiro, listar os formatos disponíveis
// console.log('=== LISTANDO FORMATOS DISPONÍVEIS ===');
// listAvailableFormats(videoUrl);

// Depois, fazer o download (comentado por enquanto)
// console.log('\n=== FAZENDO DOWNLOAD ===');
// downloadYouTubeVideo(videoUrl, 'best[height<=1080]/best[ext=mp4][height<=1080]');
downloadYouTubeVideo(videoUrl, 'bestvideo[height>=720]+bestaudio');

// Depois, fazer o download em MKV (comentado por enquanto)
// console.log('\n=== FAZENDO DOWNLOAD EM MKV ===');
// downloadYouTubeVideoMKV(videoUrl, 'bestvideo[height<=720]+bestaudio/best[height<=720]');
