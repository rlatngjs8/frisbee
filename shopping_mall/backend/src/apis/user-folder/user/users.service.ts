import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IUsersServiceCreate, IUsersServiceFindOneByEmail, IUsersServiceFindOneByUserId, IUsersServiceHashedPassword } from './interfaces/user-service.interface';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create({ createUserInput, profile_img }: IUsersServiceCreate): Promise<User> {
    const user_email = await this.findOneByEmail({ email: createUserInput.email });
    const user_id = await this.findOneByUserId({ user_id: createUserInput.user_id });
    if (user_email) throw new ConflictException('이미 등록된 이메일 입니다.');
    if (user_id) throw new ConflictException('중복된 아이디 입니다.');

    const hashedPassword = await this.hashedPassword({ password: createUserInput.password });

    return this.usersRepository.save({
      ...createUserInput,
      password: hashedPassword,
      profile_img,
    });
  }

  findOneByEmail({ email }: IUsersServiceFindOneByEmail) {
    return this.usersRepository.findOne({ where: { email } });
  }
  findOneByUserId({ user_id }: IUsersServiceFindOneByUserId) {
    return this.usersRepository.findOne({ where: { user_id } });
  }
  async hashedPassword({ password }: IUsersServiceHashedPassword) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }
}
