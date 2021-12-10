import { FileService } from '../ports/file_service'

export class DeleteFile {
    constructor(private readonly fileService: FileService) {
    }

    public async call(type: string, name: string): Promise<{ message?: string, error?: any }> {
        const result = await this.fileService.deleteFile(type, name);

        if (result.error) {
            return result.error
        }

        return { message: result.message };
    }
}
