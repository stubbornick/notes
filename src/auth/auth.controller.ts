import { Controller, Get, Post, Request,UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { LoginRequestDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { ProfileResponseDto } from './dto/profile.response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Получение токена авторизации' })
  @ApiBody({ type: LoginRequestDto })
  @ApiResponse({ status: 201, type: LoginResponseDto })
  public async login(@Request() req): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получение профиля текущего пользователя' })
  @ApiResponse({ type: ProfileResponseDto })
  @ApiBearerAuth(jwtConstants.authName)
  public getProfile(@Request() req) {
    return req.user;
  }
}
