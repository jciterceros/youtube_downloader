const YouTubeDownloader = require('../src/services/YouTubeDownloader');

jest.mock('yt-dlp-exec', () => jest.fn());
const ytdlp = require('yt-dlp-exec');

describe('YouTubeDownloader', () => {
  let downloader;
  let logSpy, errorSpy;

  beforeEach(() => {
    downloader = new YouTubeDownloader();
    ytdlp.mockReset();
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
    errorSpy.mockRestore();
  });

  it('should download video with correct options', async () => {
    // Arrange
    ytdlp.mockResolvedValue('video-file-path');
    const url = 'https://youtube.com/watch?v=abc123';

    // Act
    const result = await downloader.download(url, { format: 'best' });

    // Assert
    expect(result).toBe('video-file-path');
    expect(ytdlp).toHaveBeenCalledWith(url, expect.objectContaining({ format: 'best' }));
  });

  it('should throw error if download fails', async () => {
    // Arrange
    ytdlp.mockRejectedValue(new Error('fail'));

    // Act & Assert
    await expect(downloader.download('url')).rejects.toThrow('Erro ao baixar vídeo: fail');
  });

  it('should get info', async () => {
    // Arrange
    ytdlp.mockResolvedValue({ title: 'Test Video' });

    // Act
    const info = await downloader.getInfo('url');

    // Assert
    expect(info).toEqual({ title: 'Test Video' });
    expect(ytdlp).toHaveBeenCalledWith('url', expect.objectContaining({ dumpJson: true }));
  });

  it('should throw error if getInfo fails', async () => {
    // Arrange
    ytdlp.mockRejectedValue(new Error('info fail'));

    // Act & Assert
    await expect(downloader.getInfo('url')).rejects.toThrow('Erro ao obter informações do vídeo: info fail');
  });

  it('should call downloadVideoOnly with correct format', async () => {
    // Arrange
    ytdlp.mockResolvedValue('video-file');
    const url = 'url';
    const output = 'output';

    // Act
    await downloader.downloadVideoOnly(url, output);

    // Assert
    expect(ytdlp).toHaveBeenCalledWith(url, expect.objectContaining({ format: 'bestvideo[height>=720]', output }));
  });

  it('should call downloadAudioOnly with correct format', async () => {
    // Arrange
    ytdlp.mockResolvedValue('audio-file');
    const url = 'url';
    const output = 'output';

    // Act
    await downloader.downloadAudioOnly(url, output);

    // Assert
    expect(ytdlp).toHaveBeenCalledWith(url, expect.objectContaining({ format: 'bestaudio', output }));
  });
}); 