import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from './entities/auth.entity';
import { AuthRepository } from './repositories/user.repositories';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstans } from 'src/constans/jwt.constans';

@Module({
  imports: [
    SequelizeModule.forFeature([Auth]),
    JwtModule.register({
      global: true,
      secret: JwtConstans.access.secret,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthRepository, AuthService],
})
export class AuthModule {}
