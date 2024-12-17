import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Auth } from './entities/auth.entity';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth) private readonly authModel: typeof Auth) {}
  register(createAuthDto: CreateAuthDto) {
    return createAuthDto;
  }

  login(loginAuthDto: LoginAuthDto) {
    return loginAuthDto;
  }
  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }
}
