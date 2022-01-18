import { Table, Model, Unique, AutoIncrement, PrimaryKey, Column,
      CreatedAt, UpdatedAt, DataType,Default} from 'sequelize-typescript';

@Table
export class User extends Model {
      @AutoIncrement
      @PrimaryKey
      @Column
      user_id: number;

      @Column
      username: string;

      @Column
      lastname: string;

      @Column
      password: string;

      @Unique
      @Column
      email: string;

      @Column
      phone_number: string;

      @Column
      reviews: string;

      @CreatedAt
      creationDate: Date;

      @UpdatedAt
      updatedOn: Date;

      @Default('USER')
      @Column(DataType.ENUM('USER', 'MANAGER', 'ADMIN'))
      roles: string;
}
