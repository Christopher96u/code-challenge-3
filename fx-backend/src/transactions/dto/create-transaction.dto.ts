import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  @Length(3)
  readonly currencyFrom: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly sourceAmount: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly targetAmount: number;

  @IsString()
  @IsNotEmpty()
  @Length(3)
  readonly currencyTo: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly fee: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly marketRate: number;
}
