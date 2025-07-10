// Tipos para o sistema de download
export interface DownloadRequest {
    url: string;
    format?: 'video' | 'audio';
    quality?: 'low' | 'medium' | 'high';
}

export interface DownloadResponse {
    id: string;
    status: 'pending' | 'processing' | 'completed' | 'error';
    progress?: number;
    downloadUrl?: string;
    error?: string;
}

export interface DownloadState {
    currentDownload: DownloadResponse | null;
    downloadHistory: DownloadResponse[];
    isLoading: boolean;
    error: string | null;
}

// Tipos para temas e estilos
export interface Theme {
    bgColor: string;
    primaryColor: string;
    accentColor: string;
    cardColor: string;
    cardShadow: string;
    buttonColor: string;
    buttonTextColor: string;
}

export interface Typography {
    fontSize: string;
    fontFamily: string;
    fontWeight: string;
    letterSpacing: string;
    lineHeight: string;
}

export interface FontConfig {
    heading: Typography;
    body: Typography;
    button: Typography;
}

export interface AppConfig {
    theme: Theme;
    fonts: FontConfig;
    logo: {
        src: string;
        alt: string;
    };
    heroImg: {
        src: string;
        alt: string;
    };
    texts: {
        title: string;
        subtitle: string;
        inputPlaceholder: string;
        buttonLabel: string;
        resultTitle: string;
        resultDesc: string;
    };
} 