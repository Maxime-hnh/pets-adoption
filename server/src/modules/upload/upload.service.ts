import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lookup } from 'mime-types';


@Injectable()
export class UploadService {
  private s3Client: S3Client;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_S3_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow<string>('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }


  async upload(fileName: string, file: Buffer, folder: string | null = 'images'): Promise<string | void> {
    const contentType = lookup(fileName) || 'application/octet-stream';
    const timestampedFileName = `${Date.now()}-${fileName}`

    const bucket = this.configService.getOrThrow<string>('AWS_BUCKET_NAME');
    const region = this.configService.getOrThrow<string>('AWS_S3_REGION');
    const fileKey = `${folder}/${timestampedFileName}`;

    const upload = await this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: fileKey,
        Body: file,
        ContentType: contentType,
      })
    )
    if (upload.$metadata.httpStatusCode !== 200) throw new Error('Failed to upload file');
    return `https://${bucket}.s3.${region}.amazonaws.com/${fileKey}`;
  }

  async uploadMany(files: Express.Multer.File[], folder: string | null = 'images'): Promise<string[] | void> {
    const urls: string[] = [];
    for (const file of files) {
      const url = await this.upload(file.originalname, file.buffer, folder)
      if (url) urls.push(url);
    }
    return urls;
  }

  async delete(fileName: string, folder: string | null = "images"): Promise<void> {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
        Key: `${folder}/${fileName}`,
      })
    )
  }

  async deleteMany(fileNames: string[], folder: string | null = "images"): Promise<void> {
    for (const fileName of fileNames) {
      const decodedFileName = decodeURI(fileName)
      await this.delete(decodedFileName, folder)
    }
  }
}
