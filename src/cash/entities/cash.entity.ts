import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cash')
export class Cash {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: "numeric", default: 0})
  cash_in: number;

  @Column({type: "numeric", default: 0})
  cash_out: number;

  @Column({type: 'text'})
  description: string;

  @Column({type: "numeric"})
  balance: number;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;
}
