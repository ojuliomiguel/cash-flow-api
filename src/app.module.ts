import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import  dbConfig  from './cash/config/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CashModule } from './cash/cash.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        dbConfig
      ],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('db')
      })
    }),
    CashModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
