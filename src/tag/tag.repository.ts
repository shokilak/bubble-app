import { EntityRepository, Repository } from "typeorm";
import { TagEntity } from "./entities/tag.entity";

@EntityRepository(TagEntity)
export class TagRepository extends Repository<TagEntity> {
  findByTitle(title: string) {
    return this.createQueryBuilder('tags')
      .where('tags.title = :title', {title:title})
      .getOne()
  }

  findById(id: number) {
    return this.createQueryBuilder('tags')
      .where('tags.id = :id', {id:id})
      .getOne()
  }
}