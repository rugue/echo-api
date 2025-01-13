import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      throw new BadRequestException('No file provided.');
    }
    if (value.size > 5 * 1024 * 1024) {
      // Example: 5MB limit
      throw new BadRequestException('File size exceeds the allowed limit.');
    }
    return value;
  }
}
