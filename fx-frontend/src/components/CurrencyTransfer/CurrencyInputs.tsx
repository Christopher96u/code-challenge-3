import { MenuItem, TextField } from "@mui/material";
import { Currency } from "../../hooks/useCurrenciesQuery";
import { ChangeEvent } from "react";

interface CurrencyInputsProps {
  currencies: Currency[];
  onCurrencyChange: (value: string) => void;
  onAmountMoneyChange: (value: number) => void;
  defaultCurrency?: string;
  isFrom?: boolean;
}
const CurrencyInputs = ({
  currencies,
  onCurrencyChange,
  onAmountMoneyChange,
  defaultCurrency = "AUD",
  isFrom = true,
}: CurrencyInputsProps) => {
  const handleOnCurrencyChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("value from child: ", e.target.value);
    onCurrencyChange(e.target.value);
  };
  const handleOnAmountMoneyChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("value from child...: ", e.target.value);
    onAmountMoneyChange(Number(e.target.value));
  };
  return (
    <>
      <TextField
        size="small"
        select
        label={isFrom ? "From" : "To"}
        defaultValue={defaultCurrency}
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
        onChange={handleOnAmountMoneyChange}
      />
    </>
  );
};
export { CurrencyInputs };
