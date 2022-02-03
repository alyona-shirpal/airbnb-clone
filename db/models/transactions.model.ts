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
    user_id: number;

    @BelongsTo(() => User, {
        foreignKey: 'user_id'
    })
    user: User;

    @CreatedAt
    createdAt: Date;
}
