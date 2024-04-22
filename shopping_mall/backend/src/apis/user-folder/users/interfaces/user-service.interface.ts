import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';

export interface IUsersServiceFindOne {
  user_no: number;
}
export interface IUsersServiceCreate {
  createUserInput: CreateUserInput;
  profile_img: string;
}
export interface IUsersServiceUpdate {
  user_no: number;
  updateUserInput: UpdateUserInput;
  profile_img: string;
}

export interface IUsersServiceDelete {
  user_no: number;
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
