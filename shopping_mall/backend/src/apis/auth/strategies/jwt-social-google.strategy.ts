import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { v4 as uuidv4 } from 'uuid';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENTSECRET,
      callbackURL: 'http://localhost:3000/login/google',
      // profile에 뭘받고 싶은지
      scope: ['email', 'profile'],
    });
  }
  // 인증성공하면 validate실행
  validate(accessToken, refreshToken, profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log('프로필', profile);

    const user_id = uuidv4(); // UUID 생성
    const profile_img = profile.photos && profile.photos.length > 0 ? profile.photos[0].value : '';

    return {
      user_id: user_id,
      name: profile.displayName,
      profile_img: profile_img,
      nickname: '',
      password: process.env.PASSWORD,
      birthday: '',
      phone: '010-0000-0000',
      address: '',
      email: profile.emails[0].value,
    };
  }
}
