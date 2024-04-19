import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';
import { v4 as uuidv4 } from 'uuid';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENTID,
      clientSecret: process.env.KAKAO_CLIENTSECRET,
      callbackURL: 'http://localhost:3000/login/kakao',
      // profile에 뭘받고 싶은지
      scope: ['account_email', 'profile_nickname', 'profile_image'],
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
      name: profile.displayName, // 받아오는건 닉네임인데 본명받아올려면 사업자 번호 필요함.
      profile_img: profile._json.properties.thumbnail_image,
      nickname: '',
      password: process.env.PASSWORD,
      gender: '',
      birthday: '',
      phone: '010-0000-0000',
      address: '',
      email: profile._json.kakao_account.email,
    };
  }
}
