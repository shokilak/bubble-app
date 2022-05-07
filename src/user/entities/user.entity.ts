import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'character varying',
        length: 24
    })
    first_name: string

    @Column({
        type: 'character varying',
        length: 24
    })
    second_name: string

    @Column({
        type: 'character varying',
        length: 24
    })
    third_name: string

    @Column({
        type: "character varying",
        length: 24
    })
    phoneNumber: string

    @Column({
        type: "character varying",
        length: 48
    })
    email: string

    @Column({
        type: "date"
    })
    birthday: Date

    @Column({
        type: "character varying",
        length: 32
    })
    username: string

    @Column({
        type: "text"
    })
    password: string

    @Column({
        type: "boolean"
    })
    subscription: boolean

    @Column({
        type: "date"
    })
    subscription_expires: Date

    @Column({
        type: "date"
    })
    created_at: Date

    @Column('int')
    searchGoal: number

    @Column('character varying')
    workPlace: string

    @Column('character varying')
    studyPlace: string

    // @ManyToMany(() => TagEntity)
    // @JoinTable()
    // tags: TagEntity[]

    @Column("int")
    height: number

    @Column("int")
    weight: number

    // @Column("character varying")
    // children:

    // @Column('character varying')
    // sex:

    // @Column('character varying')
    // sexOrientation: //todo sex orientation

}