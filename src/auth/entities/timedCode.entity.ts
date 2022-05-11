import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('timedCode')
export class TimedCodeEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('character varying')
  clientCode: string

  @Column("character varying")
  botCode: string
}