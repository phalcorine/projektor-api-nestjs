import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UtilModule } from './util/util.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UtilModule, PrismaModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
