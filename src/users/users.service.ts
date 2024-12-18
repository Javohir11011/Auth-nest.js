import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}
  async findAll() {
    return await this.userModel.findAll();
  }

  async findOne(id: number) {
    return await this.userModel.findOne({ where: { id: id } });
  }

  // async update(id: number, updateUserDto: UpdateUserDto) {
  //   return await this.userModel.findOne({ where: { id: id } });
  // }

  async remove(id: number) {
    try {
      const get = await this.userModel.findOne({ where: { id: id } });
      if (!get) {
        throw new NotFoundException('User not found');
      }
      await this.userModel.destroy({ where: { id: id } });
      return {
        msg: 'Your user deleted',
        deletedUserID: id,
      };
    } catch (error) {
      return error;
    }
  }
}
