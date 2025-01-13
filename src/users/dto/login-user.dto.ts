import { IntersectionType, PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class LoginUserDto extends IntersectionType(
  PickType(CreateUserDto, ['email', 'password']),
) {}
