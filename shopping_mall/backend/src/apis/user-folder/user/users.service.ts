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
import { EmailService } from './emailService/email.service';
import { PhoneService } from './phoneService/phone.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly emailService: EmailService,
    private readonly phoneService: PhoneService,
  ) {}

  // 전체 사용자 조회
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  // 특정 사용자 조회
  async findOne({ user_no }: IUsersServiceFindOne): Promise<User> {
    const result = await this.usersRepository.findOne({ where: { user_no } });
    if (!result) throw new ConflictException('사용자를 찾을 수 없습니다.', '404');
    return result;
  }

  // 사용자 생성
  async create({ createUserInput, profile_img }: IUsersServiceCreate): Promise<User> {
    if (!this.emailService.checkEmail(createUserInput.email)) throw new ConflictException('유효하지 않은 이메일 형식입니다.', '400');
    if (!this.phoneService.checkPhone(createUserInput.phone)) throw new ConflictException('유효하지 않은 전화번호 입니다.', '400');
    if (await this.findOneByEmail({ email: createUserInput.email })) throw new ConflictException('이미 가입된 이메일 주소입니다.', '409');
    if (await this.findOneByUserId({ user_id: createUserInput.user_id })) throw new ConflictException('이미 가입된 아이디 입니다.', '409');

    const hashedPassword = await this.hashedPassword({ password: createUserInput.password });

    const result = await this.usersRepository.save({
      ...createUserInput,
      password: hashedPassword,
      profile_img,
    });
    const myTemplate = this.emailService.getWelcomeTemplate(createUserInput.name, createUserInput.phone);
    this.emailService.sendTemplateToEmail(createUserInput.email, myTemplate);

    return result;
  }

  async update({ user_no, updateUserInput, profile_img }: IUsersServiceUpdate): Promise<User> {
    const user = await this.findOne({ user_no }); // 수정
    // 이메일이 변경되었을 때만 확인
    if (updateUserInput.email !== user.email) {
      if (!this.emailService.checkEmail(updateUserInput.email)) throw new ConflictException('유효하지 않은 이메일 형식입니다.', '400');
      const userWithEmail = await this.findOneByEmail({ email: updateUserInput.email });
      if (userWithEmail && userWithEmail.user_no !== user_no) {
        // 변경된 이메일이 다른 사용자에게 속한 경우에만 중복 확인
        throw new ConflictException('이미 등록된 이메일 입니다.', '409');
      }
    }
    // 비밀번호가 제공되었을 때만 해시화
    if (updateUserInput.password !== undefined) {
      const hashedPassword = await this.hashedPassword({ password: updateUserInput.password });
      updateUserInput.password = hashedPassword;
    }
    if (!this.phoneService.checkPhone(updateUserInput.phone)) throw new ConflictException('유효하지 않은 전화번호 입니다.', '400');
    const result = this.usersRepository.save({
      ...user,
      ...updateUserInput,
      profile_img,
    });
    return result;
  }

  async delete({ user_no }: IUsersServiceDelete): Promise<string> {
    const result = await this.usersRepository.delete({ user_no });
    if (!result) throw new ConflictException('사용자를 찾을 수 없습니다.', '404');
    return '유저 정보가 성공적으로 삭제되었습니다.';
  }

  // email로 사용자 찾기
  async findOneByEmail({ email }: IUsersServiceFindOneByEmail) {
    return await this.usersRepository.findOne({ where: { email } });
  }
  // user_id로 사용자 찾기
  async findOneByUserId({ user_id }: IUsersServiceFindOneByUserId) {
    return await this.usersRepository.findOne({ where: { user_id } });
  }
  // 패스워드 해시화
  async hashedPassword({ password }: IUsersServiceHashedPassword) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }
}
