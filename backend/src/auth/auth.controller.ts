import { Controller, Post, Body, Res, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-users.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(credentials, res);
  }
 
  @Post('register')
async register(@Body() dto: CreateUserDto ) {
  return this.authService.register(dto);
}
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Req() req: Request) {
    const user = req.user as any;
    return {
      name: user.name,
      email: user.email,
    };
  }

 @Post('logout')
logout(@Res() res: Response) {
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'lax' });
  return res.status(200).json({ message: 'Sesión cerrada' });
}

}
