import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileRepository {
    private s3: AWS.S3;

    constructor(private configService: ConfigService) {
        AWS.config.update({
          accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
          secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
          region: this.configService.get<string>('AWS_REGION'),
        });
    
        this.s3 = new AWS.S3();
    }
    
    async upload(
        fileBuffer: Buffer | string, 
        extension: string, 
        contentType: string,
        folder: string): Promise<{imageUrl: string, imageKey: string, folder: string, sourceUrl: string}> {

        const fileName = uuidv4()
        const imageKey = `${fileName}.${extension}`;
        const imageFolder = `${folder}/${fileName}.${extension}`;

        // const base64Data = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        
        const params = {
            Bucket: this.configService.get<string>('CONFIG_AWS_S3_BUCKET_NAME'),
            Key: imageFolder,
            Body: fileBuffer,
            ContentType: contentType,
            // ACL: 'public-read',
        };

        await this.s3.upload(params).promise();
        return {
            imageUrl: `https://${this.configService.get<string>('CONFIG_AWS_S3_BUCKET_NAME')}.s3.amazonaws.com/${imageFolder}`,
            imageKey,
            folder,
            sourceUrl: `https://${this.configService.get<string>('CONFIG_AWS_S3_BUCKET_NAME')}.s3.amazonaws.com`
        }
    }
}