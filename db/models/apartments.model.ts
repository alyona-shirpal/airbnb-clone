import {
    Table,
    Model,
    AutoIncrement,
    PrimaryKey,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
    CreatedAt, UpdatedAt, HasMany
} from 'sequelize-typescript';

import { User } from './users.model';
import { Booking } from './booking.model';

interface RentingRules { smoking: boolean; pets: boolean; elevator: boolean; rent_days_max: number }
interface Place { bedrooms: number, beds: number, floor: number, room_type: 'private' | 'shared' |'apartment'}
interface Location { country: string, city: string, street: string, house_number: number }

@Table
export class Apartment extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    apartment_id: number;

    @Column(DataType.JSON) // bedrooms, beds, floor, room_type[private, shared, apartment]
    place: Place;

    @Column
    description: string;

    @Column(DataType.JSON) // smoking, pets, elevator, rent_days_min(number)
    renting_rules: RentingRules;

    @Column(DataType.JSON) // location [country, city, street, house_number]
    location: Location;

    @Column
    price: number;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @ForeignKey(() => User)
    @Column
    user_id: number;

    @BelongsTo(() => User, {
        foreignKey: 'user_id'
    })
    user: User;

    @HasMany(() => Booking, {
        onDelete: 'CASCADE'
    })
    booking: Booking;
}
