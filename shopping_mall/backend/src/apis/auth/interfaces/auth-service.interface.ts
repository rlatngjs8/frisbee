import { IAuthUser } from 'src/commons/interfaces/context';
import { Request, Response } from 'express';
import { User } from 'src/apis/user-folder/user/entities/user.entity';

export interface IAuthServiceLogin {
  user_id: string;
  password: string;
  // context: IContext;
  request: Request;
  response?: Response;
}

export interface IAuthServiceGetAccessToken {
  user: User | IAuthUser['user'];
}
export interface IAuthServiceSetRefreshToken {
  user: User;
  // context: IContext;
  request: Request;
  response?: Response;
}
export interface IAuthServiceRestoreAccessToken {
  user: IAuthUser['user'];
}
export interface IOAuthUser {
  user: {
    user_id: string;
    name: string;
    profile_img: string; //
    nickname: string;
    password: string;
    gender: string;
    birthday: string;
    phone: string;
    address: string;
    email: string;
  };
}
export interface IAuthServiceLoginOAuth {
  req: Request & IOAuthUser;
  res: Response;
}
