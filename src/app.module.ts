import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CashModule } from './cash/cash.module';
import { dbConfig } from './cash/config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    CashModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
