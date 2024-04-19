import { Request, Response } from 'express';

export interface IAuthUser {
  user?: {
    user_id: string;
  };
}
// RequestWithAuthUser를 정의
export interface RequestWithAuthUser extends Request {
  user?: {
    user_id?: string;
  };
}

export interface IContext {
  req: RequestWithAuthUser;
  res: Response;
}
