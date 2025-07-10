import { DownloadRequest, DownloadResponse } from '../types';
import { IApiService } from './api';

// Interface para o serviço de download (seguindo o princípio de inversão de dependência)
export interface IDownloadService {
    startDownload(request: DownloadRequest): Promise<DownloadResponse>;
    getDownloadStatus(id: string): Promise<DownloadResponse>;
    getDownloadHistory(): Promise<DownloadResponse[]>;
    validateUrl(url: string): boolean;
    formatProgress(progress: number): string;
    getStatusText(status: DownloadResponse['status']): string;
}

// Implementação concreta do serviço de download
export class DownloadService implements IDownloadService {
    private apiService: IApiService;

    constructor(apiService: IApiService) {
        this.apiService = apiService;
    }

    async startDownload(request: DownloadRequest): Promise<DownloadResponse> {
        // Validação de negócio
        if (!this.validateUrl(request.url)) {
            throw new Error('URL inválida. Por favor, insira uma URL válida do YouTube.');
        }

        // Lógica de negócio antes de chamar a API
        const enhancedRequest = {
            ...request,
            quality: request.quality || 'medium',
            format: request.format || 'video',
        };

        return await this.apiService.downloadVideo(enhancedRequest);
    }

    async getDownloadStatus(id: string): Promise<DownloadResponse> {
        if (!id) {
            throw new Error('ID do download é obrigatório');
        }

        return await this.apiService.getDownloadStatus(id);
    }

    async getDownloadHistory(): Promise<DownloadResponse[]> {
        return await this.apiService.getDownloadHistory();
    }

    validateUrl(url: string): boolean {
        if (!url || typeof url !== 'string') {
            return false;
        }

        try {
            const urlObj = new URL(url);

            // Validar se é uma URL do YouTube
            const validDomains = [
                'youtube.com',
                'www.youtube.com',
                'youtu.be',
                'www.youtu.be',
                'm.youtube.com'
            ];

            return validDomains.some(domain => urlObj.hostname.includes(domain));
        } catch {
            return false;
        }
    }

    // Método utilitário para formatar progresso
    formatProgress(progress: number): string {
        return `${Math.round(progress)}%`;
    }

    // Método utilitário para obter status em português
    getStatusText(status: DownloadResponse['status']): string {
        const statusMap = {
            pending: 'Aguardando',
            processing: 'Processando',
            completed: 'Concluído',
            error: 'Erro'
        };
        return statusMap[status] || status;
    }
}

// Factory para criar instâncias do serviço de download
export class DownloadServiceFactory {
    static create(apiService: IApiService): IDownloadService {
        return new DownloadService(apiService);
    }
} 