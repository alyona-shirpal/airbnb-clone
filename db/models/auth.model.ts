import { Table, Model, AutoIncrement, PrimaryKey, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';

import { User } from './users.model';

@Table
export class Auth extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @ForeignKey(() => User)
    @Column
    user_id: number

    @BelongsTo(() => User, { foreignKey: 'user_id' })
    userId: User

    @Column
    access_token: string;

    @Column
    refresh_token: string;
}
