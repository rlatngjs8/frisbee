import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-naver-v2';
import { v4 as uuidv4 } from 'uuid';

export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENTID,
      clientSecret: process.env.NAVER_CLIENTSECRET,
      callbackURL: 'http://localhost:3000/login/naver',
      // profile에 뭘받고 싶은지
      scope: ['email', 'name'],
    });
  }
  // 인증성공하면 validate실행
  validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log('프로필', profile);

    const user_id = uuidv4(); // UUID 생성

    return {
      user_id: user_id,
      name: profile.name,
      profile_img: profile.profileImage,
      nickname: '',
      password: process.env.PASSWORD,
      birthday: profile.birthYear + '-' + profile.birthday,
      phone: profile.mobile,
      address: '',
      email: profile.email,
    };
  }
}
