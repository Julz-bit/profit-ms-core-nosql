import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from './project/project.module';
import { ScopeModule } from './scope/scope.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/profit'),
    ProjectModule,
    ScopeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
