import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "character varying",
        length: 24
    })
    phoneNumber: string

    @Column({
        type: "text",
    })
    password: string

    @Column({
        type: "character varying",
        length: 32
    })
    username: string

    @Column({
        type: "character varying",
        length: 48
    })
    email: string

    @Column({
        type: 'character varying',
        length: 24
    })
    first_name: string

    @Column({
        type: "date"
    })
    birthday: Date

    @Column("character varying")
    sex: string

    @Column({
        type: "date"
    })
    createdAt: Date
}