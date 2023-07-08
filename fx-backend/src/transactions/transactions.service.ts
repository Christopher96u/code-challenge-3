import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
@Injectable()
export class TransactionsService {
  findAll(): any {
    const tempData = [
      {
        symbol: 'USD',
        sourceAmount: 100,
        argetAmount: 100,
        fee: 0,
        createdAt: '2021-08-01T00:00:00.000Z',
      },
    ];
    return tempData;
  }
  create(createTransactionDto: CreateTransactionDto): any {
    return createTransactionDto;
  }
  remove(id: number): any {
    return id;
  }
}
