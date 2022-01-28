import {
    Table,
    Model,
    PrimaryKey,
    AutoIncrement,
    Column,
    ForeignKey,
    BelongsTo,
    CreatedAt, UpdatedAt
} from 'sequelize-typescript';

import { User } from './users.model';
import { Apartment } from './apartments.model';

@Table
export class Files extends Model<Files> {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column
    files: string

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
