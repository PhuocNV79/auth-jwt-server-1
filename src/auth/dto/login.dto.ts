import { IsEmail, IsNotEmpty } from 'class-validator';
export class LoginDto {
  @IsEmail({}, { message: 'email khong dung dinh dang' })
  email: string;

  @IsNotEmpty()
  password: number;
}
