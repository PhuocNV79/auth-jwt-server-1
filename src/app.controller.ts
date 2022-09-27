import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('AppController')
@Controller()
export class AppController {
  constructor() {}

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
