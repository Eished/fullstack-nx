import { Module } from '@nestjs/common';
import { PrismaService } from './data-model.services';

@Module({
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
