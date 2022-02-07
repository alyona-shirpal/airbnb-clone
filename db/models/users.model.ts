import {
    Table,
    Model,
    Unique,
    AutoIncrement,
    PrimaryKey,
    Column,
    CreatedAt,
    UpdatedAt,
    DataType,
    Default,
    HasMany, AllowNull
} from 'sequelize-typescript';
import { Apartment } from './apartments.model';

@Table
export class User extends Model <User> {
      @AutoIncrement
      @PrimaryKey
      @Column
      user_id: number;

      @Column
      username: string;

      @Column
      password: string;

      @Unique
      @Column
      email: string;

      @Column
      phone_number: string;

      @AllowNull(true)
      @Default(null)
      @Column
      stripe_id: string;

      @Column
      first_name: string;

      @CreatedAt
      creationDate: Date;

      @UpdatedAt
      updatedOn: Date;

      @Default('USER')
      @Column(DataType.ENUM('USER', 'MANAGER', 'ADMIN'))
      roles: string;

      @HasMany(() => Apartment, {
          onDelete: 'CASCADE', hooks: true
      })
      apartments: Apartment[]
}
