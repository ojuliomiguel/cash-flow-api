import { Cash } from "src/cash/entities/cash.entity";
import { DataSourceOptions } from "typeorm";

export const dbConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5477,
  username: 'julio',
  password: 'code42',
  database: 'cash_flow_db',
  entities: [Cash],
  synchronize: true,
}