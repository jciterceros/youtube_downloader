const VideoProcessor = require('../src/services/VideoProcessor');

describe('VideoProcessor', () => {
  let downloader, merger, fileManager, processor;
  let logSpy, errorSpy;

  beforeEach(() => {
    downloader = {
      downloadVideoOnly: jest.fn(),
      downloadAudioOnly: jest.fn()
    };
    merger = {
      merge: jest.fn()
    };
    fileManager = {
      ensureDirectoryExists: jest.fn(),
      listFiles: jest.fn(),
      getFullPath: jest.fn((dir, file) => `${dir}/${file}`),
      removeFile: jest.fn(),
      fileExists: jest.fn()
    };
    processor = new VideoProcessor(downloader, merger, fileManager);
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
    errorSpy.mockRestore();
  });

  it('should process video and merge audio/video', async () => {
    // Arrange
    downloader.downloadVideoOnly.mockResolvedValue('video');
    downloader.downloadAudioOnly.mockResolvedValue('audio');
    fileManager.listFiles.mockReturnValue(['test_video.mp4', 'test_audio.webm']);
    fileManager.getFullPath.mockImplementation((dir, file) => `${dir}/${file}`);
    merger.merge.mockResolvedValue('dir/test_final.mp4');

    // Act
    const result = await processor.processVideo('url', { outputDir: 'dir' });

    // Assert
    expect(fileManager.ensureDirectoryExists).toHaveBeenCalledWith('dir');
    expect(downloader.downloadVideoOnly).toHaveBeenCalled();
    expect(downloader.downloadAudioOnly).toHaveBeenCalled();
    expect(merger.merge).toHaveBeenCalled();
    expect(fileManager.removeFile).toHaveBeenCalledTimes(2);
    expect(result).toBe('dir/test_final.mp4');
  });

  it('should throw error if video or audio file not found', async () => {
    // Arrange
    fileManager.listFiles.mockReturnValue(['only_video.mp4']);

    // Act & Assert
    await expect(processor.processVideo('url', { outputDir: 'dir' })).rejects.toThrow('Arquivos de vídeo ou áudio não encontrados');
  });

  it('should not remove temp files if cleanupTempFiles is false', async () => {
    // Arrange
    downloader.downloadVideoOnly.mockResolvedValue('video');
    downloader.downloadAudioOnly.mockResolvedValue('audio');
    fileManager.listFiles.mockReturnValue(['test_video.mp4', 'test_audio.webm']);
    merger.merge.mockResolvedValue('dir/test_final.mp4');

    // Act
    await processor.processVideo('url', { outputDir: 'dir', cleanupTempFiles: false });

    // Assert
    expect(fileManager.removeFile).not.toHaveBeenCalled();
  });

  it('should merge existing files', async () => {
    // Arrange
    fileManager.fileExists.mockReturnValue(true);
    merger.merge.mockResolvedValue('final.mp4');

    // Act
    const result = await processor.mergeExistingFiles('v', 'a', 'o');

    // Assert
    expect(merger.merge).toHaveBeenCalledWith('v', 'a', 'o', {});
    expect(result).toBe('final.mp4');
  });

  it('should throw error if existing video file does not exist', async () => {
    // Arrange
    fileManager.fileExists.mockImplementation((file) => file === 'audio');

    // Act & Assert
    await expect(processor.mergeExistingFiles('video', 'audio', 'out')).rejects.toThrow('Arquivo de vídeo não encontrado: video');
  });

  it('should throw error if existing audio file does not exist', async () => {
    // Arrange
    fileManager.fileExists.mockImplementation((file) => file === 'video');

    // Act & Assert
    await expect(processor.mergeExistingFiles('video', 'audio', 'out')).rejects.toThrow('Arquivo de áudio não encontrado: audio');
  });
}); 