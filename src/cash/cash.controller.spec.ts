import { Test, TestingModule } from '@nestjs/testing';
import { CashController } from './cash.controller';
import { CashModule } from './cash.module';
import { CashService } from './cash.service';
import { CashRepository } from './repositories/cash.repository';

describe('CashController', () => {
  let controller: CashController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CashController],
      providers: [
        CashService,
        {
          provide: CashRepository,
          useValue: {}
        }
      ],
    }).compile();

    controller = module.get<CashController>(CashController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
