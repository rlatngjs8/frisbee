import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IAuthServiceGetAccessToken, IAuthServiceLogin, IAuthServiceLoginOAuth, IAuthServiceRestoreAccessToken, IAuthServiceSetRefreshToken } from './interfaces/auth-service.interface';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../user-folder/user/users.service';
import { CreateUserInput } from '../user-folder/user/dto/create-user.input';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService, //
  ) {}

  async login({ user_id, password, request }: IAuthServiceLogin): Promise<string> {
    const user = await this.usersService.findOneByUserId({ user_id });
    if (!user) throw new HttpException('사용자를 찾을 수 없습니다.', 404);
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new HttpException('사용자를 찾을 수 없습니다.', 404);

    this.setRefreshToken({ user, request });
    return this.getAccessToken({ user });
  }

  async loginOAuth({ req, res }: IAuthServiceLoginOAuth): Promise<void> {
    // 1. 회원조회
    let user = await this.usersService.findOneByEmail({ email: req.user.email });
    console.log(user);
    const profile_img = req.user.profile_img; //

    // 2. 회원가입 없다면, 자동 회원가입
    if (!user) {
      const createUserInput: CreateUserInput = { ...req.user };
      user = await this.usersService.create({ createUserInput, profile_img }); //
    }

    // 3. 회원가입 되어있으면, 토큰 만들어서 브라우저에 전송
    this.setRefreshToken({ user, request: req });
    // 프론트 개발되면 바꾸기
    res.redirect('http://localhost:5500/shopping_mall/frontend/social-login.html');
  }

  async logout(response: Response): Promise<void> {
    // 쿠키에서 refreshToken 제거
    response.clearCookie('accessToken');
    response.clearCookie('refreshToken');
    console.log('로그아웃 성공');
  }

  restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
    return this.getAccessToken({ user });
  }

  // 리프레시 토큰은 쿠키에 저장 (인증용도가 아니고, 엑세스토큰을 갱신하거나 재발급 용도 )
  setRefreshToken({ user, request }: IAuthServiceSetRefreshToken): void {
    // 4. 리프레시 토큰 만들기
    const refreshToken = this.jwtService.sign(
      { sub: user.user_no }, //
      { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '2w' },
    );
    // 개발환경(http)
    request.res.setHeader('set-Cookie', `refreshToken=${refreshToken}; path=/;`);
    // 배포환경(https)
    // context.res.setHeader('set-Cookie', `refreshToken=${refreshToken}; path=/; domain=.mybackendstie.com; SameSite=None; Secure; httpOnly`);
    // context.res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com')
  }

  // 엑세스토큰은 세션에 저장되고, 엑세스권한이 있는 api접근시 로그인상태(토큰발급상태)로 요청을 하는지 인증확인
  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.user_no }, //
      { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '2h' },
    );
  }
}
