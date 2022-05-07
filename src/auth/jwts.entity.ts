import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Jwts {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "text"
    })
    access_token: string
}