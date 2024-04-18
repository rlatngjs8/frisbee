import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  IUsersServiceCreate,
  IUsersServiceDelete,
  IUsersServiceFindOne,
  IUsersServiceFindOneByEmail,
  IUsersServiceFindOneByUserId,
  IUsersServiceHashedPassword,
  IUsersServiceUpdate,
} from './interfaces/user-service.interface';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // 전체 사용자 조회
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  // 특정 사용자 조회
  async findOne({ user_no }: IUsersServiceFindOne): Promise<User> {
    return this.usersRepository.findOne({
      where: { user_no: user_no },
    });
  }

  // 사용자 생성
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

  async update({ user_no, updateUserInput, profile_img }: IUsersServiceUpdate): Promise<User> {
    const user = await this.findOne({ user_no }); // 수정
    // 이메일이 변경되었을 때만 확인
    if (updateUserInput.email !== user.email) {
      const userWithEmail = await this.findOneByEmail({ email: updateUserInput.email });
      if (userWithEmail && userWithEmail.user_no !== user_no) {
        // 변경된 이메일이 다른 사용자에게 속한 경우에만 중복 확인
        throw new ConflictException('이미 등록된 이메일 입니다.');
      }
    }
    // 비밀번호가 제공되었을 때만 해시화
    if (updateUserInput.password !== undefined) {
      const hashedPassword = await this.hashedPassword({ password: updateUserInput.password });
      updateUserInput.password = hashedPassword;
    }
    const result = this.usersRepository.save({
      ...user,
      ...updateUserInput,
      profile_img,
    });
    return result;
  }

  async delete({ user_no }: IUsersServiceDelete): Promise<string> {
    await this.usersRepository.delete({ user_no });
    return '유저 정보가 성공적으로 삭제되었습니다.';
  }

  // email로 사용자 찾기
  findOneByEmail({ email }: IUsersServiceFindOneByEmail) {
    return this.usersRepository.findOne({ where: { email } });
  }
  // user_id로 사용자 찾기
  findOneByUserId({ user_id }: IUsersServiceFindOneByUserId) {
    return this.usersRepository.findOne({ where: { user_id } });
  }
  // 패스워드 해시화
  async hashedPassword({ password }: IUsersServiceHashedPassword) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }
}
