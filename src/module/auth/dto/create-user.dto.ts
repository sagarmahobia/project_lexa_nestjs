import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @ApiProperty(
    {
      type: String,
      example: 'User\'s Name',
    },
  )
  name: string;

  @IsString()
  @ApiProperty(
    {
      type: String,
      example: 'Role of the user',
    },
  )
  role: string;

  @IsEmail()
  @ApiProperty(
    {
      type: String,
      example: 'someone@lexa.com',
    },
  )
  email: string;


  @IsStrongPassword()
  @ApiProperty(
    {
      type: String,
      example: '76hg`@&^',
    },
  )
  password: string;

}
