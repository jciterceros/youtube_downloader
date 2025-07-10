import React, { useState } from 'react';
import { AppConfig, DownloadRequest } from '../types';

interface DownloadFormProps {
  config: AppConfig;
  onSubmit: (request: DownloadRequest) => void;
  isLoading: boolean;
  validateUrl: (url: string) => boolean;
}

export const DownloadForm: React.FC<DownloadFormProps> = ({ 
  config, 
  onSubmit, 
  isLoading,
  validateUrl 
}) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const { theme, fonts, texts } = config;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Imprimir o valor do input no console
    console.log('URL digitada:', url);
    
    if (!url.trim()) {
      setError('Por favor, insira uma URL');
      return;
    }

    if (!validateUrl(url)) {
      setError('URL inválida. Por favor, insira uma URL válida do YouTube.');
      return;
    }

    setError('');
    onSubmit({ url: url.trim() });
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (error) setError('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 420 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 0,
          width: "100%",
          background: theme.cardColor,
          boxShadow: theme.cardShadow,
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder={texts.inputPlaceholder}
          disabled={isLoading}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            padding: "18px 20px",
            background: "transparent",
            color: theme.primaryColor,
            ...fonts.body,
            fontSize: 18,
          }}
          aria-label={texts.inputPlaceholder}
        />
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          style={{
            background: isLoading ? '#ccc' : theme.buttonColor,
            color: theme.buttonTextColor,
            border: "none",
            padding: "0 28px",
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading || !url.trim() ? 0.6 : 1,
            ...fonts.button,
            fontSize: 18,
            fontWeight: 700,
          }}
          aria-label={texts.buttonLabel}
        >
          {isLoading ? 'Processando...' : texts.buttonLabel}
        </button>
      </div>
      {error && (
        <p style={{ 
          color: '#e74c3c', 
          margin: '8px 0 0 0',
          ...fonts.body,
          fontSize: 14,
        }}>
          {error}
        </p>
      )}
    </form>
  );
}; 