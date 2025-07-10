const express = require('express');
const cors = require('cors');
const { downloadAndMergeVideo, mergeExistingFiles } = require('./index');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'YouTube Downloader API is running' });
});

// Rota para download de vídeo
app.post('/api/download', async (req, res) => {
  try {
    const { url, format = 'video', quality = 'medium' } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL é obrigatória' });
    }

    // Simular processamento de download
    const downloadId = `download_${Date.now()}`;
    
    // Retornar resposta imediata com ID do download
    res.json({
      id: downloadId,
      status: 'pending',
      url: url,
      format: format,
      quality: quality
    });

    // Simular processamento em background
    setTimeout(async () => {
      try {
        // Aqui você chamaria a função real de download
        // const result = await downloadAndMergeVideo(url, { format, quality });
        console.log(`Processando download ${downloadId} para URL: ${url}`);
        // Processando download download_1752113834358 para URL: https://www.youtube.com/watch?v=hazTB1rprhg
        downloadAndMergeVideo(url);
      } catch (error) {
        console.error(`Erro no download ${downloadId}:`, error);
      }
    }, 1000);

  } catch (error) {
    console.error('Erro na rota de download:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para verificar status do download
app.get('/api/download/:id/status', (req, res) => {
  const { id } = req.params;
  
  // Simular diferentes status baseado no ID
  const statuses = ['pending', 'processing', 'completed', 'error'];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  
  res.json({
    id: id,
    status: randomStatus,
    progress: randomStatus === 'processing' ? Math.floor(Math.random() * 100) : undefined,
    downloadUrl: randomStatus === 'completed' ? `/downloads/${id}.mp4` : undefined,
    error: randomStatus === 'error' ? 'Erro simulado' : undefined
  });
});

// Rota para obter histórico de downloads
app.get('/api/downloads', (req, res) => {
  // Simular histórico de downloads
  res.json([
    {
      id: 'download_1',
      status: 'completed',
      url: 'https://www.youtube.com/watch?v=example1',
      progress: 100,
      downloadUrl: '/downloads/download_1.mp4'
    },
    {
      id: 'download_2',
      status: 'processing',
      url: 'https://www.youtube.com/watch?v=example2',
      progress: 45
    }
  ]);
});

// Rota para servir arquivos baixados
app.use('/downloads', express.static('downloaded'));

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
  console.error('Erro não tratado:', error);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

module.exports = app; 