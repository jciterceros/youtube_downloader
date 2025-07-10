const FileSystemManager = require('../src/services/FileSystemManager');

jest.mock('fs');
jest.mock('path');
const fs = require('fs');
const path = require('path');

describe('FileSystemManager', () => {
  let manager;
  let logSpy, errorSpy;

  beforeEach(() => {
    manager = new FileSystemManager();
    jest.clearAllMocks();
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
    errorSpy.mockRestore();
  });

  it('should create directory if not exists', () => {
    // Arrange
    fs.existsSync.mockReturnValue(false);

    // Act
    manager.ensureDirectoryExists('dir');

    // Assert
    expect(fs.mkdirSync).toHaveBeenCalledWith('dir', { recursive: true });
  });

  it('should not create directory if exists', () => {
    // Arrange
    fs.existsSync.mockReturnValue(true);

    // Act
    manager.ensureDirectoryExists('dir');

    // Assert
    expect(fs.mkdirSync).not.toHaveBeenCalled();
  });

  it('should list files if directory exists', () => {
    // Arrange
    fs.existsSync.mockReturnValue(true);
    fs.readdirSync.mockReturnValue(['a', 'b']);

    // Act
    const result = manager.listFiles('dir');

    // Assert
    expect(result).toEqual(['a', 'b']);
  });

  it('should return empty array if directory does not exist', () => {
    // Arrange
    fs.existsSync.mockReturnValue(false);

    // Act
    const result = manager.listFiles('dir');

    // Assert
    expect(result).toEqual([]);
  });

  it('should remove file if exists', () => {
    // Arrange
    fs.existsSync.mockReturnValue(true);

    // Act
    manager.removeFile('file');

    // Assert
    expect(fs.unlinkSync).toHaveBeenCalledWith('file');
  });

  it('should not remove file if does not exist', () => {
    // Arrange
    fs.existsSync.mockReturnValue(false);

    // Act
    manager.removeFile('file');

    // Assert
    expect(fs.unlinkSync).not.toHaveBeenCalled();
  });

  it('should check if file exists', () => {
    // Arrange
    fs.existsSync.mockReturnValue(true);

    // Act
    const exists1 = manager.fileExists('file');
    fs.existsSync.mockReturnValue(false);
    const exists2 = manager.fileExists('file');

    // Assert
    expect(exists1).toBe(true);
    expect(exists2).toBe(false);
  });

  it('should find files by pattern', () => {
    // Arrange
    manager.listFiles = jest.fn().mockReturnValue(['a.txt', 'b.js', 'c.txt']);

    // Act
    const result = manager.findFilesByPattern('dir', '.txt');

    // Assert
    expect(result).toEqual(['a.txt', 'c.txt']);
  });

  it('should get full path', () => {
    // Arrange
    path.join.mockReturnValue('/full/path/file');

    // Act
    const result = manager.getFullPath('/full/path', 'file');

    // Assert
    expect(result).toBe('/full/path/file');
    expect(path.join).toHaveBeenCalledWith('/full/path', 'file');
  });
}); 