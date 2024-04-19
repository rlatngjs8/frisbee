import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    // 부모한테 넘겨주고 싶을때 super
    //(부모클래스 - PassportStrategy)에 가서 검증 됨
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      }, // accessToken
      secretOrKey: process.env.JWT_REFRESH_SECRET, // 직접 .env 파일에서 값을 가져옴
    });
  }
  // PassportStrategy 검증완료되면 validate실행
  // payload에는 토큰에 있는 id가져옴
  validate(payload) {
    console.log('페이로드:', payload); // {sub: 유저아이디}

    return {
      user_id: payload.sub,
    };
  }
}
