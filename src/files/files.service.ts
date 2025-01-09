import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class FilesService {
  private readonly uploadPath = './uploads';

  readonly storage = diskStorage({
    destination: (req, file, cb) => {
      cb(null, this.uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  });

  getMulterOptions() {
    if (!this.storage) {
      throw new Error('Multer storage configuration is missing');
    }
    return {
      storage: this.storage,
    };
  }
}
