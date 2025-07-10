import React from 'react';
import { AppConfig, DownloadRequest } from '../types';
import { DownloadForm } from './DownloadForm';

interface HeroProps {
  config: AppConfig;
  onSubmit: (request: DownloadRequest) => void;
  isLoading: boolean;
  validateUrl: (url: string) => boolean;
}

export const Hero: React.FC<HeroProps> = ({ 
  config, 
  onSubmit, 
  isLoading,
  validateUrl 
}) => {
  const { theme, fonts, texts, heroImg } = config;

  return (
    <section
      style={{
        width: "100%",
        maxWidth: 900,
        margin: "40px 0 0 0",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 40,
      }}
    >
      <div style={{ flex: 1, minWidth: 320 }}>
        <h1
          style={{
            margin: 0,
            color: theme.primaryColor,
            ...fonts.heading,
          }}
        >
          {texts.title}
        </h1>
        <p
          style={{
            margin: "18px 0 32px 0",
            color: theme.primaryColor,
            ...fonts.body,
          }}
        >
          {texts.subtitle}
        </p>
        
        {/* Formulário de download */}
        <DownloadForm
          config={config}
          onSubmit={onSubmit}
          isLoading={isLoading}
          validateUrl={validateUrl}
        />
      </div>
      
      <div
        style={{
          flex: 1,
          minWidth: 320,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={heroImg.src}
          alt={heroImg.alt}
          style={{
            width: 320,
            height: 320,
            objectFit: "cover",
            borderRadius: 24,
            boxShadow: theme.cardShadow,
          }}
        />
      </div>
    </section>
  );
}; 