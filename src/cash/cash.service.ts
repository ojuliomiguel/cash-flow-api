import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import * as currency from 'currency.js';
import { CashRepository } from './repositories/cash.repository';
import { EntryType } from './enums/entry-types.enum';
import { EntryData } from './interfaces/entry.interface';

@Injectable()
export class CashService {

  constructor(private readonly cashRepository: CashRepository) { }

  async create(createEntryDto: CreateEntryDto) {
    const entry = this.validateOperation(createEntryDto);
    const lastestEntry = await this.cashRepository.getLatestEntry();
    let balance = currency(lastestEntry.balance).add(entry.cash_in);
    balance = currency(balance.value).add(entry.cash_out);

    const balanceAfter = {
      balance: balance.value
    }

    if (balanceAfter.balance <= 0) {
      throw new HttpException('Saldo Insuficiente', HttpStatus.BAD_REQUEST);
    }
    
    return this.cashRepository.create({...entry, ...balanceAfter});
  }

  async onModuleInit() {
    await this.cashRepository.ensureInitializeCash();
  }

  private validateOperation(createEntryDto: CreateEntryDto): EntryData {
    const { amount, type, description } = createEntryDto;
    let money = currency(amount,{precision: 7, errorOnInvalid: true});

    const entryData = {
      cash_in: 0,
      cash_out: 0,
      description
    }

    if (type === EntryType.CREDIT && amount > 0) {
      entryData.cash_in = money.value;
      return entryData;
    }

    if (type === EntryType.DEBIT && amount > 0) {
      money = 
        currency(amount,{precision: 7, errorOnInvalid: true}).multiply(-1);
        entryData.cash_out = money.value;
      return entryData;
    }

    throw new HttpException(
      'Operação inválida. O valor deve ser sempre positivoo', 
      HttpStatus.BAD_REQUEST
    );
    
  }
}
