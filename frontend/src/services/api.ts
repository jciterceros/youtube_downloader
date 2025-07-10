import { DownloadRequest, DownloadResponse } from '../types';

// Interface para o serviço de API (seguindo o princípio de inversão de dependência)
export interface IApiService {
    downloadVideo(request: DownloadRequest): Promise<DownloadResponse>;
    getDownloadStatus(id: string): Promise<DownloadResponse>;
    getDownloadHistory(): Promise<DownloadResponse[]>;
}

// Implementação concreta do serviço de API
export class ApiService implements IApiService {
    private baseUrl: string;

    constructor(baseUrl: string = 'http://localhost:3001') {
        this.baseUrl = baseUrl;
    }

    async downloadVideo(request: DownloadRequest): Promise<DownloadResponse> {
        try {
            const response = await fetch(`${this.baseUrl}/api/download`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            throw new Error(`Erro ao iniciar download: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        }
    }

    async getDownloadStatus(id: string): Promise<DownloadResponse> {
        try {
            const response = await fetch(`${this.baseUrl}/api/download/${id}/status`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            throw new Error(`Erro ao obter status do download: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        }
    }

    async getDownloadHistory(): Promise<DownloadResponse[]> {
        try {
            const response = await fetch(`${this.baseUrl}/api/downloads`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            throw new Error(`Erro ao obter histórico de downloads: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        }
    }
}

// Factory para criar instâncias do serviço de API
export class ApiServiceFactory {
    static create(baseUrl?: string): IApiService {
        return new ApiService(baseUrl);
    }
} 