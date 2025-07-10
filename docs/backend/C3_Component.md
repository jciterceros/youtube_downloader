# C4 Model - Component Diagram

Este diagrama mostra os principais componentes internos do container "Core Application" do **YouTube Downloader**.

```mermaid
graph TD
  core[Core Application]
  vp[VideoProcessor]
  ytd[YouTubeDownloader]
  ffm[FFmpegMerger]
  fsm[FileSystemManager]
  vpf[VideoProcessorFactory]
  intf[Interfaces SOLID]

  core --> vp
  vp --> ytd
  vp --> ffm
  vp --> fsm
  vpf --> vp
  vp --> intf
```

## Explicação
- O `VideoProcessor` é o orquestrador do fluxo.
- Os serviços são injetados via factory e abstraídos por interfaces.
- Cada componente tem responsabilidade única, seguindo SOLID. 