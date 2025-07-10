import React from 'react';
import { AppConfig } from '../types';

interface HeaderProps {
  config: AppConfig;
}

export const Header: React.FC<HeaderProps> = ({ config }) => {
  const { logo, fonts } = config;
  const { theme } = config;

  return (
    <header
      style={{
        width: "100%",
        maxWidth: 1200,
        padding: "32px 0 0 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={logo.src}
        alt={logo.alt}
        style={{
          height: 48,
          width: 48,
          borderRadius: 12,
          marginRight: 16,
        }}
      />
      <span
        style={{
          color: theme.accentColor,
          ...fonts.heading,
          fontWeight: 700,
          fontSize: 28,
        }}
      >
        Youtube Downloader
      </span>
    </header>
  );
}; 