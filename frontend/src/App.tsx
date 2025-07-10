import React from 'react';
import { DownloaderApp } from './components/DownloaderApp';
import { ThemeFactory } from './config/themes';

function App() {
  // Usar factory para obter configuração do tema
  const config = ThemeFactory.getTheme('default');
  // const config = ThemeFactory.getTheme('dark');

  return (
    <div className="App">
      <DownloaderApp config={config} />
    </div>
  );
}

export default App;
