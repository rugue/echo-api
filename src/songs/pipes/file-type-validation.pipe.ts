import { PipeTransform, Injectable } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class FileTypeValidationPipe implements PipeTransform {
  transform(file: any) {
    return ['.mp3', '.wav'].includes(extname(file?.originalname).toLowerCase());
  }
}
