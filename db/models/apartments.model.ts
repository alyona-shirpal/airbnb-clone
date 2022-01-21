import { Table, Model, AutoIncrement, PrimaryKey, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './users.model';

interface RentingRules { smoking: boolean; pets: boolean; elevator: boolean; rent_days_min: number }
interface Place { bedrooms: number, beds: number, floor: number, room_type: object } // TODO the type safety of room_type object!

@Table
export class Apartment extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    apartment_id: number;

    @Column(DataType.JSON)// bedrooms, beds, floor, room_type[private, shared, apartment]
    place: Place;

    @Column
    description: string;

    @Column(DataType.JSON) // smoking, pets, elevator, rent_days_min(number)
    renting_rules: RentingRules;

    @Column(DataType.JSON) // address [country, city, street, house_number]
    location: object; // TODO the interface for this object!

    @Column
    price: number;

    @ForeignKey(() => User)
    @Column
    user_id: number

    @BelongsTo(() => User, { foreignKey: 'user_id' })
    host: User

    @Column(DataType.JSON) // from to
    reservation: Date;
}
