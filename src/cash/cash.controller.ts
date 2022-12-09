import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
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
  
  @Get('balance')
   getConsolidateBalance(
    @Query('date') date: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10
   ) {
    return this.cashService.getConsolidateDailyBalance(date, {page, limit});
  }
}
