# C4 Model - Context Diagram (Frontend)

Este diagrama mostra o sistema **YouTube Downloader Frontend** no contexto de seus usuários e sistemas externos.

```mermaid
C4Context
Person(user, "Usuário", "Pessoa que deseja baixar vídeos do YouTube através da interface web.")
System_Boundary(frontend, "YouTube Downloader Frontend") {
  System(react_app, "React Application", "Interface web React + TypeScript para download de vídeos.")
}
System_Ext(backend_api, "Backend API", "API REST que processa downloads e merges.")
System_Ext(youtube, "YouTube", "Fonte dos vídeos e áudios.")

Rel(user, react_app, "Usa interface web")
Rel(react_app, backend_api, "Faz requisições HTTP")
Rel(backend_api, youtube, "Baixa vídeo e áudio")
```

## Explicação
- O **Usuário** interage com o sistema através da interface web React.
- O **React Application** se comunica com o **Backend API** via requisições HTTP.
- O **Backend API** faz o download e processamento dos vídeos do **YouTube**.
- A interface web fornece uma experiência amigável para o usuário final. 