# C4 Model - Context Diagram

Este diagrama mostra o sistema **YouTube Downloader** no contexto de seus usuários e sistemas externos.

```mermaid
C4Context
Person(user, "Usuário", "Pessoa que deseja baixar vídeos do YouTube.")
System_Boundary(ytd, "YouTube Downloader") {
  System(ytd_app, "YouTube Downloader App", "Node.js CLI/API para baixar e unir vídeos do YouTube.")
}
System_Ext(youtube, "YouTube", "Fonte dos vídeos e áudios.")
System_Ext(ffmpeg, "FFmpeg", "Ferramenta externa para processamento de mídia.")

Rel(user, ytd_app, "Usa via CLI ou API")
Rel(ytd_app, youtube, "Baixa vídeo e áudio")
Rel(ytd_app, ffmpeg, "Processa e une mídia usando FFmpeg")
```

## Explicação
- O **Usuário** interage com o sistema via CLI ou API.
- O sistema faz download de vídeo/áudio do **YouTube**.
- O sistema utiliza o **FFmpeg** para unir e processar os arquivos de mídia. 