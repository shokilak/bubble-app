import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('userInfo')
export class UserInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'character varying',
    length: 24,
  })
  second_name: string;

  @Column({
    type: 'character varying',
    length: 24,
  })
  third_name: string;

  @Column({
    type: 'boolean',
  })
  subscription: boolean;

  @Column({
    type: 'date',
  })
  subscription_expires: Date;

  @Column('int')
  searchGoal: number;

  @Column('character varying')
  workPlace: string;

  @Column('character varying')
  studyPlace: string;

  // @ManyToMany(() => TagEntity)
  // @JoinTable()
  // tags: TagEntity[]

  @Column('int')
  height: number;

  @Column('int')
  weight: number;

  // @Column("character varying")
  // children:

  // @Column('character varying')
  // sexOrientation: //todo sex orientation
}
