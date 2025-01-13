import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File) {
    if (!value) {
      throw new BadRequestException('No file provided.');
    }

    const maxFileSizeBytes = 15 * 1024 * 1024;
    if (value.size > maxFileSizeBytes) {
      // Example: 5MB limit
      throw new BadRequestException(
        `File size should not exceed ${maxFileSizeBytes}bytes`,
      );
    }

    return value;
  }
}
