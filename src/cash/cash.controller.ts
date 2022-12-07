import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CashService } from './cash.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateCashDto } from './dto/update-cash.dto';

@Controller('cash')
export class CashController {
  constructor(private readonly cashService: CashService) {}

  @Post('entry')
  create(@Body() createEntryDto: CreateEntryDto) {
    return this.cashService.create(createEntryDto);
  }
  
}
