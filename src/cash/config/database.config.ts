import { registerAs } from "@nestjs/config";
import { Cash } from "src/cash/entities/cash.entity";
import { DataSourceOptions } from "typeorm";

export default registerAs<DataSourceOptions>('db', () => ({
  type: 'postgres',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT ? Number(process.env.PORT) : 5477,
  username: process.env.DB_USER || 'julio',
  password: process.env.DB_PWD || 'code42',
  database: process.env.DB_NAME || 'cash_flow_db',
  entities: [Cash],
  synchronize: true,
}))