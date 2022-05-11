import { EntityRepository, Repository } from "typeorm";
import { TimedCodeEntity } from "./entities/timedCode.entity";

@EntityRepository(TimedCodeEntity)
export class TimedCodeRepository extends Repository<TimedCodeEntity> {
  findByClientCode(clientCode: string): Promise<TimedCodeEntity | undefined> {
    return this.createQueryBuilder('timedCode')
      .where('timedCode.clientCode = :clientCode', {clientCode:clientCode})
      .getOne()
  }

  findByBotCode(botCode: string): Promise<TimedCodeEntity | undefined> {
    return this.createQueryBuilder('timedCode')
      .where('timedCode.botCode = :botCode', {botCode:botCode})
      .getOne()
  }

  createNew(codes): Promise<TimedCodeEntity> {
    return this.save(codes)
  }
}