import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
@Injectable()
export class TransactionsService {
  findAll(): any {
    const tempData = [
      {
        symbol: 'USD',
        sourceAmount: 105,
        targetAmount: 970,
        fee: 24.99,
        createdAt: '2021-08-01T00:00:00.000Z',
        id: 132,
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
