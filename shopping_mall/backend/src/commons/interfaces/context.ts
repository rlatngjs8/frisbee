import { Request, Response } from 'express';

export interface IAuthUser {
  user: {
    user_no: number;
  };
}
// RequestWithAuthUser를 정의
export interface RequestWithAuthUser extends Request {
  user?: {
    user_id?: string;
  };
}

export interface IContext {
  req: Request & IAuthUser;
  res: Response;
}
