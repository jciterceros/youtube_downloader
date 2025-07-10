import React, { useEffect } from 'react';
import { AppConfig, DownloadRequest } from '../types';
import { Header } from './Header';
import { Hero } from './Hero';
import { DownloadResult } from './DownloadResult';
import { useDownload } from '../hooks/useDownload';
import { DownloadServiceFactory } from '../services/downloadService';
import { ApiServiceFactory } from '../services/api';

interface DownloaderAppProps {
  config: AppConfig;
  style?: React.CSSProperties;
}

export const DownloaderApp: React.FC<DownloaderAppProps> = ({ config, style }) => {
  // Inicializar serviços usando factories
  const apiService = ApiServiceFactory.create();
  const downloadService = DownloadServiceFactory.create(apiService);
  
  // Usar hook customizado para gerenciar downloads
  const {
    currentDownload,
    isLoading,
    error,
    startDownload,
    validateUrl,
    formatProgress,
    getStatusText,
    clearError,
  } = useDownload(downloadService);

  const handleSubmit = async (request: DownloadRequest) => {
    // Imprimir o request recebido
    console.log('Request de download recebido:', request);
    console.log('URL para download:', request.url);
    
    try {
      await startDownload(request);
    } catch (error) {
      console.error('Erro ao iniciar download:', error);
    }
  };

  // Limpar erro quando o componente montar
  useEffect(() => {
    clearError();
  }, [clearError]);

  const { theme, fonts } = config;

  return (
    <div
      style={{
        ...style,
        width: "100%",
        minHeight: 700,
        background: theme.bgColor,
        color: theme.primaryColor,
        fontFamily: fonts.body.fontFamily,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <Header config={config} />

      {/* Hero Section com Formulário */}
      <Hero 
        config={config} 
        onSubmit={handleSubmit}
        isLoading={isLoading}
        validateUrl={validateUrl}
      />

      {/* Resultado do Download */}
      <DownloadResult
        config={config}
        download={currentDownload}
        getStatusText={getStatusText}
        formatProgress={formatProgress}
      />

      {/* Mensagem de erro global */}
      {error && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: '#e74c3c',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
            ...fonts.body,
            fontSize: 14,
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}; 