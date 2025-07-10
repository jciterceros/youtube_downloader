import { useState, useCallback } from 'react';
import { DownloadRequest, DownloadState } from '../types';
import { IDownloadService } from '../services/downloadService';

// Hook customizado para gerenciar downloads
export const useDownload = (downloadService: IDownloadService) => {
    const [state, setState] = useState<DownloadState>({
        currentDownload: null,
        downloadHistory: [],
        isLoading: false,
        error: null,
    });

    const startDownload = useCallback(async (request: DownloadRequest) => {
        setState(prev => ({
            ...prev,
            isLoading: true,
            error: null,
        }));

        try {
            const response = await downloadService.startDownload(request);

            setState(prev => ({
                ...prev,
                currentDownload: response,
                downloadHistory: [...prev.downloadHistory, response],
                isLoading: false,
            }));

            return response;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';

            setState(prev => ({
                ...prev,
                error: errorMessage,
                isLoading: false,
            }));

            throw error;
        }
    }, [downloadService]);

    const checkDownloadStatus = useCallback(async (id: string) => {
        try {
            const response = await downloadService.getDownloadStatus(id);

            setState(prev => ({
                ...prev,
                currentDownload: response,
                downloadHistory: prev.downloadHistory.map(download =>
                    download.id === id ? response : download
                ),
            }));

            return response;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';

            setState(prev => ({
                ...prev,
                error: errorMessage,
            }));

            throw error;
        }
    }, [downloadService]);

    const loadDownloadHistory = useCallback(async () => {
        try {
            const history = await downloadService.getDownloadHistory();

            setState(prev => ({
                ...prev,
                downloadHistory: history,
            }));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';

            setState(prev => ({
                ...prev,
                error: errorMessage,
            }));
        }
    }, [downloadService]);

    const clearError = useCallback(() => {
        setState(prev => ({
            ...prev,
            error: null,
        }));
    }, []);

    const resetDownload = useCallback(() => {
        setState(prev => ({
            ...prev,
            currentDownload: null,
            error: null,
        }));
    }, []);

    return {
        // Estado
        currentDownload: state.currentDownload,
        downloadHistory: state.downloadHistory,
        isLoading: state.isLoading,
        error: state.error,

        // Ações
        startDownload,
        checkDownloadStatus,
        loadDownloadHistory,
        clearError,
        resetDownload,

        // Utilitários
        validateUrl: downloadService.validateUrl,
        formatProgress: downloadService.formatProgress,
        getStatusText: downloadService.getStatusText,
    };
}; 