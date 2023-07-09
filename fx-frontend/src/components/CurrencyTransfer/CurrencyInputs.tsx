import { MenuItem, TextField } from "@mui/material";
import { Currency } from "../../hooks/useCurrenciesQuery";
import { ChangeEvent } from "react";

interface CurrencyInputsProps {
  currencies: Currency[];
  onCurrencyChange: (value: string) => void;
  onAmountMoneyChange: (value: number) => void;
  defaultCurrency: string;
  isFrom?: boolean;
  inputValue: number;
}
const CurrencyInputs = ({
  currencies,
  onCurrencyChange,
  onAmountMoneyChange,
  defaultCurrency,
  isFrom = true,
  inputValue,
}: CurrencyInputsProps) => {
  const handleOnCurrencyChange = (e: ChangeEvent<HTMLInputElement>) => {
    onCurrencyChange(e.target.value);
  };
  const handleOnAmountMoneyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value <= 0) {
      return;
    }
    onAmountMoneyChange(Number(event.target.value));
  };
  return (
    <>
      <TextField
        size="small"
        select
        label={isFrom ? "From" : "To"}
        value={defaultCurrency}
        helperText="Please select your currency"
        onChange={handleOnCurrencyChange}
      >
        {currencies.map((option) => (
          <MenuItem key={option.code} value={option.code}>
            {option.code}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        size="small"
        variant="outlined"
        type="number"
        value={inputValue}
        onChange={handleOnAmountMoneyChange}
      />
    </>
  );
};
export { CurrencyInputs };
