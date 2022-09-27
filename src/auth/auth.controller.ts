import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiHeader, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserSignUpDto } from './dto/UserSignUp.dto';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  // @ApiUnauthorizedResponse()
  @UseGuards(LocalAuthGuard)
  login(@Body() loginDto: LoginDto) {
    console.log('Login thanh cong');
    return this.authService.login(loginDto);
  }

  @Post('/signup')
  async signup(@Body() userSignUp: UserSignUpDto) {
    console.log(userSignUp);
    return await this.authService.signUp(userSignUp);
  }
}
