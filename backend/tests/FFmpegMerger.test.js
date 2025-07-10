jest.mock('fluent-ffmpeg', () => {
  const mockFfmpeg = jest.fn(() => mockFfmpegInstance);
  let mockFfmpegInstance = {
    input: jest.fn().mockReturnThis(),
    outputOptions: jest.fn().mockReturnThis(),
    output: jest.fn().mockReturnThis(),
    on: jest.fn().mockReturnThis(),
    run: jest.fn()
  };
  mockFfmpeg.mockFfmpegInstance = mockFfmpegInstance;
  mockFfmpeg.setFfmpegPath = jest.fn();
  return mockFfmpeg;
});

const FFmpegMerger = require('../src/services/FFmpegMerger');
const ffmpeg = require('fluent-ffmpeg');

describe('FFmpegMerger', () => {
  let merger;
  let mockInstance;
  let logSpy, errorSpy;

  beforeEach(() => {
    merger = new FFmpegMerger();
    mockInstance = ffmpeg.mockFfmpegInstance;
    jest.clearAllMocks();
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
    errorSpy.mockRestore();
  });

  it('should resolve on end event', async () => {
    // Arrange
    mockInstance.on.mockImplementation(function (event, cb) {
      if (event === 'end') cb();
      return this;
    });

    // Act
    const promise = merger.merge('video', 'audio', 'output');

    // Assert
    await expect(promise).resolves.toBe('output');
  });

  it('should reject on error event', async () => {
    // Arrange
    mockInstance.on.mockImplementation(function (event, cb) {
      if (event === 'error') cb(new Error('merge fail'));
      return this;
    });

    // Act
    const promise = merger.merge('video', 'audio', 'output');

    // Assert
    await expect(promise).rejects.toThrow('merge fail');
  });

  it('should log progress if percent exists', async () => {
    // Arrange
    let progressCb;
    mockInstance.on.mockImplementation(function (event, cb) {
      if (event === 'progress') progressCb = cb;
      return this;
    });

    // Act
    merger.merge('video', 'audio', 'output');
    progressCb({ percent: 42 });

    // Assert
    expect(logSpy).toHaveBeenCalledWith('Progresso: 42%');
  });
}); 