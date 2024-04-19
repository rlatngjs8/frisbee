import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { IOAuthUser } from './interfaces/auth-service.interface';
import { DynamicAuthGuard } from './guards/dynamic-auth.guard-02';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginInput } from './dto/login.input';

@Controller()
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '로그인', description: '아이디와 패스워드로 로그인합니다.' })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async login(@Body() loginInput: LoginInput, @Req() request: Request): Promise<string> {
    const { user_id, password } = loginInput;
    console.log(`유저아이디: ${user_id}, 비밀번호: ${password},콘텍스트: ${request}`); //
    return this.authService.login({ user_id, password, request });
  }

  // 요청이 들어오면 guard에서 걸려서, 구글 스트레티지로 감
  @Get('/login/:social')
  @UseGuards(DynamicAuthGuard)
  @ApiOperation({ summary: '소셜로그인', description: '구글, 네이버, 카카오 로그인을 진행합니다.' })
  @ApiResponse({ status: 200, description: '소셜로그인 성공' })
  async loginOAuth(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ): Promise<void> {
    return await this.authService.loginOAuth({ req, res });
  }
  @Get('logout')
  @ApiOperation({ summary: '로그아웃', description: '로그아웃 합니다.' })
  @ApiResponse({ status: 200, description: '로그아웃 성공' })
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    // 세션을 파기하거나 토큰을 만료시키는 작업 수행
    await this.authService.logout(res);
    // 클라이언트에게 "로그아웃 성공" 메시지 반환
    res.status(200).send('로그아웃 성공');
  }
}
