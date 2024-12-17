import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Auth extends Model {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column({ defaultValue: false })
  isActive: boolean;
}
