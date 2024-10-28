import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileRepository } from './infrastructure/file.repository';
import { UploadFileService } from './application/upload-file.service';


const EXPORTS = [FileRepository, UploadFileService];
const SERVICES = [FileRepository, UploadFileService];

@Module({
    imports: [ConfigModule.forRoot()],
    providers: [...SERVICES],
    exports: EXPORTS,
    controllers: [],
})
export class CommonModule {}
