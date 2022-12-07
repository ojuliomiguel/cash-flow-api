import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateEntryDto } from "../dto/create-entry.dto";
import { Cash } from '../entities/cash.entity';
import { EntryData } from "../interfaces/entry.interface";
import { toMoney } from "../utils/currency.utils";

@Injectable()
export class CashRepository {

  constructor(
    @InjectRepository(Cash)
    private cashRepository: Repository<Cash>
  ) { }

  public async create(entry: EntryData) {
    return this.cashRepository.save(entry);
  }

  public async getLatestEntry() {
    const lastEntry = await this.cashRepository
    .createQueryBuilder('cash')
    .select()
    .orderBy('cash.created_at', 'DESC')
    .getOne();

    lastEntry.balance = toMoney(lastEntry.balance).value
    return lastEntry;
  }

  public async ensureInitializeCash() {
    const description = 'cash_initialize';
    const entry = await this.cashRepository.findOne({
      where: {description: description}
    });

    if (!entry) {
      return this.cashRepository.save({
        balance: 0,
        description
      });
    }
    
    return entry;
  }
}