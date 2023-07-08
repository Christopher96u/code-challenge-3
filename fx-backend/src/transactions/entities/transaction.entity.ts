import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  currencyFrom: string;

  @Column({ type: String })
  currencyTo: string;

  @Column({ type: 'decimal' })
  sourceAmount: number;

  @Column({ type: 'decimal' })
  targetAmount: number;

  @Column({ type: 'decimal' })
  fee: number;

  @Column({ type: 'decimal' })
  marketRate: number;

  @CreateDateColumn()
  createdAt: Date;
}
