import { AppConfig } from '../types';

// Configurações de temas predefinidos
export const themes: Record<string, AppConfig> = {
    default: {
        theme: {
            bgColor: "#F5F5F5",
            primaryColor: "#000000",
            accentColor: "#0099FF",
            cardColor: "#fff",
            cardShadow: "0 2px 12px rgba(0,0,0,0.06)",
            buttonColor: "#0099FF",
            buttonTextColor: "#fff"
        },
        fonts: {
            heading: {
                fontSize: "32px",
                fontFamily: "sans-serif",
                fontWeight: "800",
                letterSpacing: "-0.03em",
                lineHeight: "1em",
            },
            body: {
                fontSize: "18px",
                fontFamily: "sans-serif",
                fontWeight: "500",
                letterSpacing: "-0.01em",
                lineHeight: "1.3em",
            },
            button: {
                fontSize: "18px",
                fontFamily: "sans-serif",
                fontWeight: "600",
                letterSpacing: "-0.01em",
                lineHeight: "1em",
            }
        },
        logo: {
            src: "https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg",
            alt: "Logo",
        },
        heroImg: {
            src: "https://framerusercontent.com/images/aNsAT3jCvt4zglbWCUoFe33Q.jpg",
            alt: "Hero",
        },
        texts: {
            title: "Baixe vídeos de qualquer lugar",
            subtitle: "Cole o link do vídeo que deseja baixar. Rápido, fácil e grátis.",
            inputPlaceholder: "Cole o link aqui...",
            buttonLabel: "Baixar",
            resultTitle: "Pronto para baixar!",
            resultDesc: "Clique no botão para iniciar o download do seu arquivo.",
        }
    },
    dark: {
        theme: {
            bgColor: "#1a1a1a",
            primaryColor: "#ffffff",
            accentColor: "#00d4ff",
            cardColor: "#2d2d2d",
            cardShadow: "0 4px 20px rgba(0,0,0,0.3)",
            buttonColor: "#00d4ff",
            buttonTextColor: "#000000"
        },
        fonts: {
            heading: {
                fontSize: "32px",
                fontFamily: "sans-serif",
                fontWeight: "800",
                letterSpacing: "-0.03em",
                lineHeight: "1em",
            },
            body: {
                fontSize: "18px",
                fontFamily: "sans-serif",
                fontWeight: "500",
                letterSpacing: "-0.01em",
                lineHeight: "1.3em",
            },
            button: {
                fontSize: "18px",
                fontFamily: "sans-serif",
                fontWeight: "600",
                letterSpacing: "-0.01em",
                lineHeight: "1em",
            }
        },
        logo: {
            src: "https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg",
            alt: "Logo",
        },
        heroImg: {
            src: "https://framerusercontent.com/images/aNsAT3jCvt4zglbWCUoFe33Q.jpg",
            alt: "Hero",
        },
        texts: {
            title: "Download de Vídeos e Músicas",
            subtitle: "Faça o download de qualquer vídeo ou música de forma rápida e segura",
            inputPlaceholder: "Cole o link aqui...",
            buttonLabel: "Download",
            resultTitle: "Download Iniciado!",
            resultDesc: "Seu arquivo está sendo processado. O download começará em breve.",
        }
    },
    colorful: {
        theme: {
            bgColor: "#f0f8ff",
            primaryColor: "#2c3e50",
            accentColor: "#e74c3c",
            cardColor: "#ffffff",
            cardShadow: "0 8px 32px rgba(231, 76, 60, 0.2)",
            buttonColor: "#e74c3c",
            buttonTextColor: "#ffffff"
        },
        fonts: {
            heading: {
                fontSize: "32px",
                fontFamily: "sans-serif",
                fontWeight: "800",
                letterSpacing: "-0.03em",
                lineHeight: "1em",
            },
            body: {
                fontSize: "18px",
                fontFamily: "sans-serif",
                fontWeight: "500",
                letterSpacing: "-0.01em",
                lineHeight: "1.3em",
            },
            button: {
                fontSize: "18px",
                fontFamily: "sans-serif",
                fontWeight: "600",
                letterSpacing: "-0.01em",
                lineHeight: "1em",
            }
        },
        logo: {
            src: "https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg",
            alt: "Logo",
        },
        heroImg: {
            src: "https://framerusercontent.com/images/aNsAT3jCvt4zglbWCUoFe33Q.jpg",
            alt: "Hero",
        },
        texts: {
            title: "Download Rápido e Seguro",
            subtitle: "Cole o link e baixe instantaneamente. Suporte para YouTube, Vimeo e muito mais.",
            inputPlaceholder: "Cole o link aqui...",
            buttonLabel: "Baixar Agora",
            resultTitle: "Processando...",
            resultDesc: "Estamos preparando seu download. Aguarde um momento.",
        }
    }
};

// Factory para criar configurações de tema
export class ThemeFactory {
    static getTheme(themeName: string = 'default'): AppConfig {
        return themes[themeName] || themes.default;
    }

    static getAvailableThemes(): string[] {
        return Object.keys(themes);
    }

    static createCustomTheme(overrides: Partial<AppConfig>): AppConfig {
        const baseTheme = themes.default;
        return {
            ...baseTheme,
            ...overrides,
            theme: {
                ...baseTheme.theme,
                ...overrides.theme,
            },
            fonts: {
                ...baseTheme.fonts,
                ...overrides.fonts,
            },
            texts: {
                ...baseTheme.texts,
                ...overrides.texts,
            }
        };
    }
} 