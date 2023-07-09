import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}
  findAll(): Promise<Transaction[]> {
    return this.transactionsRepository.find();
  }
  create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.transactionsRepository.save(
      this.transactionsRepository.create(createTransactionDto),
    );
  }
  remove(id: number): any {
    return this.transactionsRepository.delete(id);
  }
}
