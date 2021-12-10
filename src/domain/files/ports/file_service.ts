export interface FileService {
    serveFile(name: string | undefined, type: string | undefined): Promise<{ filePath?: string, error?: any }>;
    uploadFile(type: string | undefined, id: string | undefined, file: any | undefined): Promise<{ filePath?: string, error?: any }>;
    deleteFile(type: string | undefined, name: string | undefined): Promise<{ message?: string, error?: any }>;
}
