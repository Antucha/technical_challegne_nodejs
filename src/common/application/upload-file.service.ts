import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FileRepository } from '../infrastructure/file.repository';

@Injectable()
export class UploadFileService {

    private readonly allowedExtensions = ['jpg', 'jpeg', 'svg', 'png', 'gif', 'pdf', 'docx', 'dvi']; // Agregado 'dvi'
    private readonly allowedMimeTypes = [
        'image/jpeg', 
        'image/png', 
        'image/svg+xml', 
        'image/gif',
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/x-dvi' // Tipo MIME para archivos DVI
    ];

    
    constructor(
        readonly fileRepository: FileRepository
    ) {}

    public async uploadFileFromBufferOrText(buffer: Buffer | string, route: string, ext: string, contentType: string) {

        const GET_RESULT_FILE_UPLOAD = await this.fileRepository.upload(buffer, ext, contentType, this.getFolderByRoute(route));

        return {
            url: GET_RESULT_FILE_UPLOAD.imageUrl,
            key: GET_RESULT_FILE_UPLOAD.imageKey,
            folder: GET_RESULT_FILE_UPLOAD.folder,
            sourceUrl: GET_RESULT_FILE_UPLOAD.sourceUrl
        }
    }


    private getFolderByRoute (route: string) {

        const DICTIONARY = {
            'generator-content-capsule': 'learning-capsule',
            'ocr': 'photo-search',
            'learning-capsule-steps': 'learning-capsule-steps',
            'latex': 'latex-expression',
        }

        return DICTIONARY[route] || 'default';

    }

}
