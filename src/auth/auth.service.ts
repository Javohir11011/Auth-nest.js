import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthRepository } from './repositories/user.repositories';

@Injectable()
export class AuthService {
  constructor(@Inject() private readonly authRepo: AuthRepository) {}
  async register(createAuthDto: CreateAuthDto) {
    try {
      return this.authRepo.registerUserRepo(createAuthDto);
    } catch (error) {
      return error;
    }
  }

  login(loginAuthDto: LoginAuthDto) {
    try {
      return this.authRepo.loginUserRepo(loginAuthDto);
    } catch (error) {
      return error;
    }
  }
  findOne(email: string) {
    try {
      return this.authRepo.findOne(email);
    } catch (error) {
      return error;
    }
  }
}
