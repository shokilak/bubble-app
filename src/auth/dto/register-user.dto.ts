import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty()
  phoneNumber: string | null;

  @ApiProperty()
  password: string;

  @ApiProperty()
  passwordRepeat: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  birthday: Date;

  @ApiProperty()
  sex: string;
}
