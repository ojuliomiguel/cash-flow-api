import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cash } from '../entities/cash.entity';
import { EntryData } from "../interfaces/entry.interface";
import { toMoney } from "../utils/currency.utils";
import { parseISO, startOfDay, endOfDay, } from 'date-fns';
import { IPaginationOptions, paginate } from "nestjs-typeorm-paginate";

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

  public async getEntryByDate(date: Date) {
    const entry = await this.cashRepository
      .createQueryBuilder('cash')
      .select()
      .where('CAST(cash.createdAt as DATE) = :date', {date: date})
      .orderBy('cash.created_at', 'ASC')
      .getOne();

    if (!entry) {
      throw new HttpException(
        'Não há nenhum registro para a data especificada',
        HttpStatus.NOT_FOUND
      );
    }  

    entry.balance = toMoney(entry.balance).value
    return entry;
  }

  public async ensureInitializeCash() {
    const description = 'cash_initialize';
    const entry = await this.cashRepository.findOne({
      where: { description: description }
    });

    if (!entry) {
      return this.cashRepository.save({
        balance: 0,
        description
      });
    }

    return entry;
  }

  public async getConsolidateDailyBalance(date: string, options: IPaginationOptions) {
    const parseDate = parseISO(date);
    
    const consolidateDailyBalance =  this.cashRepository
      .createQueryBuilder('cash')
      .select()
      .where(
        'cash.createdAt BETWEEN :startDate AND :endDate',
        {
          startDate: startOfDay(parseDate), 
          endDate: endOfDay(parseDate)
        }
      )
    const items = await paginate<Cash>(consolidateDailyBalance, options);
    const {id, balance, createdAt: day} = await this.getLatestEntry();
    const {balance: initialBalance} = await this.getEntryByDate(parseDate);
    return {
      consolidateBalance: {
        id,
        initialBalance,
        balance,
        day
      },
      ...items
    }
  }

  private get
}