import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAuthDto, LoginAuthDto } from 'src/auth/dto/create-auth.dto';
import { Auth } from 'src/auth/entities/auth.entity';
import { JwtConstans } from 'src/constans/jwt.constans';
import { comparePass, generateHash } from 'src/helpers/bycrpt';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(Auth) private readonly authModel: typeof Auth,
    private readonly jwtservice: JwtService,
  ) {}

  async registerUserRepo(CreateAuthDto: CreateAuthDto) {
    try {
      const checkUser = await this.authModel.findOne({
        where: { email: CreateAuthDto.email },
      });
      const hasPass = await generateHash(CreateAuthDto.password);
      if (!checkUser) {
        const newUser = new this.authModel({
          ...CreateAuthDto,
          password: hasPass,
        });
        await newUser.save();
        return {
          msg: 'Success',
          userId: newUser.id,
        };
      }
      throw new BadRequestException('User Already register');
    } catch (error) {
      return error;
    }
  }
  async loginUserRepo(user: LoginAuthDto) {
    try {
      const checkUser = await this.authModel.findOne({
        where: { email: user.email },
      });
      if (!checkUser) {
        throw new NotFoundException('User not found');
      }
      const checkPass = await comparePass(user.password, checkUser.password);
      if (!checkPass) {
        throw new BadRequestException('Your email or password does not match');
      }
      const payload = {
        sub: checkUser.id,
        name: checkUser.name,
        email: checkUser.email,
        role: checkUser.roles,
      };
      const accessToken = await this.jwtservice.signAsync(payload, {
        secret: JwtConstans.access.secret,
        expiresIn: JwtConstans.access.exporesTime,
      });
      const refreshToken = await this.jwtservice.signAsync(payload, {
        secret: JwtConstans.refresh.secret,
        expiresIn: JwtConstans.refresh.exporesTime,
      });
      return {
        access: accessToken,
        refresh: refreshToken,
      };
    } catch (error) {
      return error;
    }
  }
  async findOne(email: string) {
    const getById = await this.authModel.findOne({ where: { email: email } });
    if (!getById) {
      throw new NotFoundException('usere not found');
    }
    delete getById.password;
    return getById;
  }
}
