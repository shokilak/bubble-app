import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  findByPhone(phoneNumber): Promise<UserEntity | undefined> {
    return this.createQueryBuilder('users')
      .where('users.phoneNumber = :phoneNumber', { phoneNumber: phoneNumber })
      .getOne();
  }

  createUser(user): Promise<UserEntity> {
    return this.save(user);
  }
}
