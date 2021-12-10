import { FileService } from '../ports/file_service'

export class ServeFile {
    constructor(private readonly fileService: FileService) {
    }

    public async call(name: string, type: string): Promise<{ filePath?: string, error?: any }> {
        const result = await this.fileService.serveFile(name, type);

        if (result.error) {
            return result.error
        }

        return { filePath: result.filePath };
    }
}
