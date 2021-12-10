import { Request, Response } from "express";
import { ServeFile } from "../../domain/files/usecases/serve_file";

export class FileController {

    constructor(
        private readonly serveFile: ServeFile
    ) {
    }

    async serveFileRequested(req: Request, response: Response) {
        try {
            let { name, type } = req.params;

            const { filePath, error }: any = await this.serveFile.call(name, type)

            if (error) {
                return response.status(error.httpCode ? error.httpCode : 500).json({ code: error.code, message: error.message });
            }

            return response.sendFile(filePath);

        } catch (error) {
            console.log(error)
            return response.status(500).json(error)
        }

    }

}