import { CreateUserInput } from '../dto/create-user.input';

export interface IUsersServiceCreate {
  createUserInput: CreateUserInput;
  profile_img: string;
}

export interface IUsersServiceFindOneByEmail {
  email: string;
}
export interface IUsersServiceFindOneByUserId {
  user_id: string;
}
export interface IUsersServiceHashedPassword {
  password: string;
}
