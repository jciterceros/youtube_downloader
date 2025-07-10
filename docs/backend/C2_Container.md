# C4 Model - Container Diagram

Este diagrama mostra os principais containers do sistema **YouTube Downloader**.

```mermaid
graph TD
    user["Usuário"]
    cli["CLI/API (Node.js)"]
    core["Core Application (Node.js)"]
    downloaded["Downloaded Files"]
    youtube["YouTube"]
    ffmpeg["FFmpeg"]

    user -->|Usa via CLI/API| cli
    cli -->|Invoca operações| core
    core -->|Baixa vídeo/áudio| youtube
    core -->|Chama para merge| ffmpeg
    core -->|Salva arquivos| downloaded
```

## Explicação
- O usuário interage via CLI/API.
- O container principal orquestra o fluxo de download, merge e gerenciamento de arquivos.
- Os arquivos baixados são salvos no sistema de arquivos.
- FFmpeg é chamado como ferramenta externa para merge. 