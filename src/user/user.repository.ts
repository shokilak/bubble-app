import {EntityRepository, Repository} from "typeorm";
import {UserEntity} from "./entities/user.entity";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    findByPhone(phoneNumber) {
        return this.createQueryBuilder('users')
            .where('users.phoneNumber = :phoneNumber', {phoneNumber:phoneNumber})
            .getOne()
    }
}