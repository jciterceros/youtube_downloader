# C4 Model - Code Diagram

Este diagrama mostra detalhes de implementação do componente `VideoProcessor`.

```mermaid
classDiagram
    class VideoProcessor {
        -downloader: IDownloader
        -merger: IMerger
        -fileManager: IFileManager
        +processVideo(url, options)
        +mergeExistingFiles(videoPath, audioPath, outputPath, options)
    }
    class IDownloader
    class IMerger
    class IFileManager
    class YouTubeDownloader
    class FFmpegMerger
    class FileSystemManager

    VideoProcessor --> IDownloader : depends on
    VideoProcessor --> IMerger : depends on
    VideoProcessor --> IFileManager : depends on
    IDownloader <|-- YouTubeDownloader
    IMerger <|-- FFmpegMerger
    IFileManager <|-- FileSystemManager
```

## Explicação
- O `VideoProcessor` depende de abstrações (interfaces) para download, merge e gerenciamento de arquivos.
- As implementações concretas são injetadas via factory.
- O design facilita testes, manutenção e extensibilidade. 