import { MenuItem, TextField } from "@mui/material";
import { Currency } from "../../hooks/useCurrenciesQuery";
import { ChangeEvent, useEffect } from "react";

interface CurrencyInputsProps {
  currencies: Currency[];
  onCurrencyChange: (value: string) => void;
  onAmountMoneyChange: (value: number) => void;
  defaultCurrency: string;
  isFrom?: boolean;
}
const CurrencyInputs = ({
  currencies,
  onCurrencyChange,
  onAmountMoneyChange,
  defaultCurrency,
  isFrom = true,
}: CurrencyInputsProps) => {
  useEffect(() => {
    console.log("CURRENCY INPUTS RENDER");
  }, []);
  const handleOnCurrencyChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("value from child: ", e.target.value);
    onCurrencyChange(e.target.value);
  };
  const handleOnAmountMoneyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value <= 0) {
      return;
    }
    console.log("value from child...: ", value);
    onAmountMoneyChange(value);
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
        onChange={handleOnAmountMoneyChange}
      />
    </>
  );
};
export { CurrencyInputs };
