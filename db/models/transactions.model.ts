import {
    AutoIncrement,
    BelongsTo,
    Column,
    CreatedAt,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';
import { Apartment } from '.';
import { User } from './users.model';

@Table
export class Transaction extends Model<Transaction> {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column
    amount: number;

    @ForeignKey(() => User)
    @Column
    tenent_id: number;

    @BelongsTo(() => User, {
        foreignKey: 'user_id'
    })
    user: User;

    @ForeignKey(() => Apartment)
    @Column
    apartment_id: number;

    @BelongsTo(() => Apartment, {
        foreignKey: 'apartment_id'
    })
    apartment: Apartment;

    @CreatedAt
    createdAt: Date;
}
