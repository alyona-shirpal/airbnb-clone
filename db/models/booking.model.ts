import {
    Table,
    Model,
    PrimaryKey,
    AutoIncrement,
    Column,
    ForeignKey,
    BelongsTo,
    Default,
    CreatedAt, UpdatedAt
} from 'sequelize-typescript';

import { User } from './users.model';
import { Apartment } from './apartments.model';

@Table
export class Booking extends Model<Booking> {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column('datetime')
    from: Date;

    @Column('datetime')
    to: Date;

    @Column
    total_price: number;

    @Default(false)
    @Column
    isApproved: boolean;

    @ForeignKey(() => User)
    @Column
    user_id: number;

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

    @UpdatedAt
    updatedAt: Date;
}
