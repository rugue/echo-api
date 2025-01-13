import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
interface FileServiceT {
  upload: (file: Express.Multer.File) => Promise<string>;
}

@Injectable()
export class FilesService implements FileServiceT {
  async upload(file: Express.Multer.File) {
    const uniqueFileName = this.generateUniqueFileName(file);

    const uploadDir = join(process.cwd(), 'uploads');

    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filePath = join(uploadDir, uniqueFileName);

    await writeFile(filePath, file.buffer);

    return filePath;
  }

  private generateUniqueFileName(file: Express.Multer.File) {
    const fileExtension = '.' + file.originalname.split('.').at(-1);

    const uniqueFileName = uuidv4() + fileExtension;
    return uniqueFileName;
  }
}
