import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('userInfo')
export class UserInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'character varying',
    length: 24,
  })
  secondName: string;

  @Column({
    type: 'character varying',
    length: 24,
  })
  thirdName: string;

  @Column({
    type: "character varying",
    length: 128
  })
  description: string

  @Column({
    type: 'boolean',
  })
  subscription: boolean;

  @Column({
    type: 'date',
  })
  subscription_expires: Date;

  @Column('character varying')
  searchGoal: string;

  @Column('character varying')
  workPlace: string;

  @Column('character varying')
  studyPlace: string;

  @Column({type: "array"})
  tags: Array<number>

  @Column('int')
  height: number;

  @Column('int')
  weight: number;

  @Column("character varying")
  children: string

  @Column('character varying')
  sexOrientation: string
}
