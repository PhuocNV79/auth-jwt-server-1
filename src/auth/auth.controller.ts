import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  login(@Body() loginDto: LoginDto) {
    console.log('Login thanh cong');
    return this.authService.login(loginDto);
  }
}
