import {TypeOrmModule} from "@nestjs/typeorm";
import {TypeOrmConfig} from "./typeOrm.config";
import {AuthModule} from "../src/auth/auth.module";
import {UserModule} from "../src/user/user.module";

export const ModuleImport = [
    TypeOrmModule.forRootAsync({useClass: TypeOrmConfig}),

    AuthModule,
    UserModule
]