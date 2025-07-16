import { Body, Controller, Delete, Param, ParseFilePipe, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {

  constructor(
    private readonly uploadService: UploadService
  ) { }


  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(new ParseFilePipe({ validators: [] })) file: Express.Multer.File,
    @Body('folder') folder: string
  ): Promise<string | void> {
    return await this.uploadService.upload(file.originalname, file.buffer, folder)
  }

  @Post('images')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadMany(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('folder') folder: string
  ): Promise<string[] | void> {
    return await this.uploadService.uploadMany(files, folder)
  }


  @Delete('image/:fileName')
  async deleteFile(@Param('fileName') fileName: string): Promise<void> {
    return await this.uploadService.delete(decodeURI(fileName))
  }

  @Delete('images')
  async deleteMany(@Body() body: { fileNames: string[] }): Promise<void> {
    return await this.uploadService.deleteMany(body.fileNames)
  }

}
