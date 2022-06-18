import {UserEntity} from "../src/user/entities/user.entity";
import { TimedCodeEntity } from "../src/auth/entities/timedCode.entity";
import { TagEntity } from "../src/tag/entities/tag.entity";
import { UserInfoEntity } from "../src/user/entities/userInfo.entity";

export const EntitiesArray = [
    UserEntity,
    UserInfoEntity,
    TimedCodeEntity,
    TagEntity
]