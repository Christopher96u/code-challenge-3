import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  @Length(3)
  readonly currencyFrom: string;

  @IsString()
  @IsNotEmpty()
  @Length(3)
  readonly currencyTo: string;
}
