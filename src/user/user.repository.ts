import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  findByPhone(phoneNumber): Promise<UserEntity | undefined> {
    return this.createQueryBuilder('users')
      .where('users.phoneNumber = :phoneNumber', {phoneNumber: phoneNumber})
      .getOne();
  }

  findById(id: number) {
    return this.createQueryBuilder('users')
      .where('users.id = :id', {id:id})
      .getOne()
  }

  createUser(user): Promise<UserEntity> {
    return this.save(user);
  }

  setBanFlag(id: number, banFlag: boolean) {
    return this.createQueryBuilder('users')
      .update(UserEntity)
      .set({
        banFlag: banFlag
      })
      .where('users.id = :id', {id:id})
      .execute()
  }
}
