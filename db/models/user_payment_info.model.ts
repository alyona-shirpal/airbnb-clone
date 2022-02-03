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
export class UserPaymentInfo extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column
    stripe_token: string;

    @Column
    last_4_digits: string;

    @Column
    vendor: string;

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
