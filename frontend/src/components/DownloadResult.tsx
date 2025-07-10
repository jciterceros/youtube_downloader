import React from 'react';
import { AppConfig, DownloadResponse } from '../types';

interface DownloadResultProps {
  config: AppConfig;
  download: DownloadResponse | null;
  getStatusText: (status: DownloadResponse['status']) => string;
  formatProgress: (progress: number) => string;
}

export const DownloadResult: React.FC<DownloadResultProps> = ({ 
  config, 
  download, 
  getStatusText,
  formatProgress 
}) => {
  const { theme, fonts, texts } = config;

  if (!download) {
    return (
      <section
        style={{
          width: "100%",
          maxWidth: 600,
          margin: "48px 0 0 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            background: theme.cardColor,
            boxShadow: theme.cardShadow,
            borderRadius: 16,
            padding: 32,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              color: theme.accentColor,
              ...fonts.heading,
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            {texts.resultTitle}
          </span>
          <span
            style={{
              color: theme.primaryColor,
              ...fonts.body,
              fontSize: 16,
            }}
          >
            {texts.resultDesc}
          </span>
        </div>
      </section>
    );
  }

  const statusText = getStatusText(download.status);
  const progressText = download.progress ? formatProgress(download.progress) : '';

  return (
    <section
      style={{
        width: "100%",
        maxWidth: 600,
        margin: "48px 0 0 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          background: theme.cardColor,
          boxShadow: theme.cardShadow,
          borderRadius: 16,
          padding: 32,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span
          style={{
            color: download.status === 'error' ? '#e74c3c' : theme.accentColor,
            ...fonts.heading,
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          {statusText}
        </span>
        
        {download.progress !== undefined && (
          <div style={{ width: '100%', maxWidth: 300 }}>
            <div style={{ 
              width: '100%', 
              height: 8, 
              background: '#f0f0f0', 
              borderRadius: 4,
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${download.progress}%`,
                height: '100%',
                background: theme.accentColor,
                transition: 'width 0.3s ease'
              }} />
            </div>
            <p style={{
              textAlign: 'center',
              margin: '8px 0 0 0',
              color: theme.primaryColor,
              ...fonts.body,
              fontSize: 14,
            }}>
              {progressText}
            </p>
          </div>
        )}

        {download.error && (
          <span
            style={{
              color: '#e74c3c',
              ...fonts.body,
              fontSize: 14,
              textAlign: 'center',
            }}
          >
            {download.error}
          </span>
        )}

        {download.downloadUrl && download.status === 'completed' && (
          <a
            href={download.downloadUrl}
            download
            style={{
              background: theme.buttonColor,
              color: theme.buttonTextColor,
              padding: '12px 24px',
              borderRadius: 8,
              textDecoration: 'none',
              ...fonts.button,
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Baixar Arquivo
          </a>
        )}
      </div>
    </section>
  );
}; 