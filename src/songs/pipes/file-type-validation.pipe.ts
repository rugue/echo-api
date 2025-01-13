import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class FileTypeValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    const allowedTypes = ['.mp3', '.wav'];

    const isValid = allowedTypes.includes(
      extname(file?.originalname).toLowerCase(),
    );

    if (!isValid) {
      throw new BadRequestException(
        `File type should be ${allowedTypes.join(',')}`,
      );
    }

    return file;
  }
}
