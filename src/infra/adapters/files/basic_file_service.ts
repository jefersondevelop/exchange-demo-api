import path from "path";
import * as fs from 'fs'
import { FileService } from "../../../domain/files/ports/file_service";

let validTypes = ['users', 'anotherFile', 'dnis']
let validExtentionImage = ['jpg', 'jpeg', 'png'];
let noFilePath = path.resolve(__dirname, '../../../../public/files/no-image.jpg');
let noUserPath = path.resolve(__dirname, '../../../../public/files/profile-default.png');

export class BasicFileService implements FileService {

    async serveFile(name: string, type: string): Promise<{ filePath?: string, error?: any }> {

        if (!type || !name) {
            return { error: { code: 'F01', message: 'Type and name of file are required', httpCode: 422 } }
        }

        let pathImg = path.resolve(__dirname, `../../../../public/files/${type}/${name}`);

        if (fs.existsSync(pathImg)) {
            return { filePath: pathImg }
        }

        if (type !== 'users') {
            return { filePath: noFilePath };
        }

        return { filePath: noUserPath };


    }

    async uploadFile(type: string, id: string, file: any): Promise<{ filePath?: string, error?: any }> {

        if (!type || !id || !file) {
            return { error: { code: 'F02', message: 'Some fields for upload file are mising.', httpCode: 422 } }
        }

        if (validTypes.indexOf(type) < 0) {
            return { error: { code: 'F03', message: 'Carga de ' + type + ' no permitida.', httpCode: 409 } }
        }

        let nameTokenFile = file.name.split('.');

        let extention = nameTokenFile[nameTokenFile.length - 1].toLowerCase();

        if (validExtentionImage.indexOf(extention) < 0) {
            return { error: { code: 'F04', message: 'Las extensiones válidas son: ' + validExtentionImage.join(', '), httpCode: 409 } }
        }

        let fileName = `${id}-${nameTokenFile[0]}-${new Date().getMilliseconds()}.${extention}`

        await file.mv(path.resolve(__dirname, `../../../../public/files/${type}/${fileName}`));

        return { filePath: fileName }
    }

    async deleteFile(type: string, name: string): Promise<{ message?: string, error?: any }> {
        let pathImg = path.resolve(__dirname, `../../../../public/files/${type}/${name}`);
        if (!fs.existsSync(pathImg)) {
            return { error: { code: 'F06', message: 'File does not exists', httpCode: 404 } }
        }

        fs.unlinkSync(pathImg);
        return { message: 'File deleted successfully' };
    }



}