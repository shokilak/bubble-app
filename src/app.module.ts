import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuleImport } from '../config/module.import';

@Module({
  imports: ModuleImport,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
