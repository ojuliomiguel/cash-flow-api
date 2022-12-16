import { EntryType } from "../../src/cash/enums/entry-types.enum"
import { EntryData } from "src/cash/interfaces/entry.interface"

export class CashRepositoryMock {
  public create(entry: EntryData) {
    return entry
  }

  public async getLatestEntry() {
    return {
      balance: 0,
      cash_in: '0',
      cash_out: '-8',
      createdAt: new Date(),
      description: 'troco',
      id: '94c61180-22fa-40f5-aa48-a795dca0374c'
    }
  }

  public async ensureInitializeCash() {}
  
  public async getConsolidateDailyBalance() {}

}

export const entryMock = {
  amount: 100,
  description: 'Panetone',
  type: EntryType.CREDIT
} 