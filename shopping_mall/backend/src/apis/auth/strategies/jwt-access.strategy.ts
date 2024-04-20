import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }
  // PassportStrategy 검증완료되면 validate실행
  // payload에는 토큰에 있는 id가져옴
  validate(payload) {
    console.log('페이로드:', payload); // {sub: 유저아이디}

    return {
      user_no: payload.sub,
    };
  }
}
