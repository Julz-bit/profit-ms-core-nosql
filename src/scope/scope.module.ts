import { Module } from '@nestjs/common';
import { ScopeService } from './scope.service';
import { ScopeController } from './scope.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScopeSchema } from './schema/scope.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Scope', schema: ScopeSchema }])
  ],
  controllers: [ScopeController],
  providers: [ScopeService]
})
export class ScopeModule { }
