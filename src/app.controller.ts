import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req) {
    console.log('login thanh cong');
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    // Verify token thu cong. Da co JwtStrategy ho tro
    // let authorHeader: string = req.header('authorization');
    // const verify = this.jwtService.verify(
    //   authorHeader.replace('Bearer ', '').trim(),
    //   {
    //     secret: jwtConstants.secret,
    //     ignoreExpiration: false,
    //   },
    // );
    // return verify;
    return {
      success: true,
    };
  }
}
