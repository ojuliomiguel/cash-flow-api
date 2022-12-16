import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CashRepositoryMock, entryMock } from '../../test/mocks/cash.repository.mock';
import { CashService } from './cash.service';
import { CashRepository } from './repositories/cash.repository';

describe('CashService', () => {
  let cashService: CashService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CashService,
        {
          provide: CashRepository,
          useClass: CashRepositoryMock
        }
      ],
    }).compile();

    cashService = module.get<CashService>(CashService);
  });

  afterEach(() => {
    entryMock.amount = 100;
  })

  it('should be defined', () => {
    expect(cashService).toBeDefined();
  });

  it('should validate balance and create entry', async () => {
    const entry = await cashService.create(entryMock)
    const EXPECTED_AMOUNT = 100;
    
    expect(entry.balance).toEqual(EXPECTED_AMOUNT);
    expect(entry).toBeDefined();
  });

  it('should throw error when passed invalid amount', async () => {
    entryMock.amount = -1;
    await expect(cashService.create(entryMock)).rejects.toThrow(HttpException);
  }); 

  it('should throw error when passed invalid type (debit or credit)', async () => {
    await expect(cashService.create({
      amount: 10,
      description: '',
      type: 'invalid'
    } as any)).rejects.toThrow(HttpException);
  }); 
});
