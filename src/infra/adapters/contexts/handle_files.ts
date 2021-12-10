import { BasicFileService } from "../files/basic_file_service";
import { ServeFile } from '../../../domain/files/usecases/serve_file'
import { FileController } from "../../controllers/file_controller";

let fileService = new BasicFileService();
let serveFileUseCase = new ServeFile(fileService);

const controller = new FileController(serveFileUseCase);

export default controller;