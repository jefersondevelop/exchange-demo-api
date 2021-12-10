import { FileService } from '../ports/file_service'

export class UploadFile {
    constructor(private readonly fileService: FileService) {
    }

    public async call(type: string, id: string, file: any): Promise<{ filePath?: string, error?: any }> {
        const result = await this.fileService.uploadFile(type, id, file);

        if (result.error) {
            return result.error
        }

        return { filePath: result.filePath };
    }
}
