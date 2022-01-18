import { Table, Model, AutoIncrement, PrimaryKey, Column, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { User } from './users.model';

@Table
export class Apartment extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    apartment_id: number;

    @Column(DataType.JSON)  // bedrooms, beds, floor, room_type[private, shared, apartment]
    place: object

    @Column
    description: string;

    @Column (DataType.JSON) // smoking, pets, elevator, rent_days_min(number)
    renting_rules: object;

    @Column(DataType.JSON) // address [country, city, street, house_number] lat,lng
    location: object;

    @Column
    price: number;

    @ForeignKey(() => User)
    @Column
    user_id: number

    @BelongsTo(() => User, {foreignKey: 'user_id'})
    host: User

    @Column(DataType.JSON) // from to
    reservation: object;

}
