import { Box, Button, Grid, Typography, styled } from "@mui/material";
import ImgConvertIcon from "../../assets/converter-icon.png";
import ImgConverterSwapIcon from "../../assets/converter-swap-icon.png";
import theme from "../../config/theme";
import { useCurrenciesQuery } from "../../hooks/useCurrenciesQuery";
import { useEffect, useState } from "react";
import { CurrencyInputs } from "./CurrencyInputs";
import { useCurrentRateQuery } from "../../hooks/useCurrentRateQuery";
export interface CurrencyConversion {
  currencyFrom: string;
  currencyTo: string;
  sourceAmount: number;
  targetAmount: number;
  /* fxRate: number;
  marketRate: number;
  fee: number; */
}
const CurrencyTransferCard = () => {
  const StyledButton = styled(Button)({
    backgroundColor: theme.palette.bluePrimary.main,
    textTransform: "none",
    border: 0,
    borderRadius: 8,
    height: 48,
    padding: "0 30px",
    width: "180px",
  });
  const { data: currencies, isLoading } = useCurrenciesQuery();
  /* const [transaction, setTransaction] = useState<CurrencyConversion>({
    currencyFrom: "AUD",
    currencyTo: "USD",
    sourceAmount: 0,
    targetAmount: 0,
  }); */
  const [currencyFrom, setCurrencyFrom] = useState("AUD");
  const [currencyTo, setCurrencyTo] = useState("USD");
  const [sourceAmount, setSourceAmount] = useState(0);
  const [targetAmount, setTargetAmount] = useState(0);
  const [lastCurrencyFrom, setLastCurrencyFrom] = useState("AUD");
  const { data: currentRates } = useCurrentRateQuery({
    currencyFrom,
    currencyTo,
    sourceAmount,
    targetAmount,
  });
  const handleConversion = () => {
    console.log("handleConversion fn", { currentRates });
    if (!currentRates) {
      return;
    }
    /* if (currentRates) {
      console.log("currentRates: ", currentRates);
      console.log("sourceAmount: ", sourceAmount);
      console.log(
        "currentRates.rates[currencyFrom]: ",
        currentRates.rates[currencyFrom]
      );
      console.log(
        "currentRates.rates[currencyTo]: ",
        currentRates.rates[currencyTo]
      );
      const usdAmount = sourceAmount / currentRates.rates[currencyFrom];
      console.log("usdAmount:  =========>", usdAmount);
      const amountMoneyTo = usdAmount * currentRates.rates[currencyTo];
      console.log("amountMoneyTo:  =========>", amountMoneyTo);
    } */
  };
  const handleCurrencyChange = (value: string, identifier: string) => {
    if (identifier === "currencyFrom") {
      //console.log("currencyFrom: ", value);
      setCurrencyFrom(value);
      setLastCurrencyFrom(
        value === currencyTo ? lastCurrencyFrom : currencyFrom
      );
    } else {
      setCurrencyTo(value);
    }
  };
  const handleAmountMoneyChange = (value: number, identifier: string) => {
    if (identifier === "sourceAmount") {
      setSourceAmount(value);
    } else {
      setTargetAmount(value);
    }
  };
  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (!currencies) {
    return <span>Something went wrong</span>;
  }
  if (currentRates) {
    console.log("currentRates: ", currentRates);
  }
  return (
    <Box>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={7} md={5} lg={4} xl={3} sx={{ px: 1 }}>
          <Box sx={{ display: "flex" }} px={{ sm: 4 }}>
            <Box sx={{}}>
              <img
                src={ImgConvertIcon}
                alt="Convert Money logo"
                height={65}
                width={65}
              />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                color: theme.palette.bluePrimary.main,
                fontSize: "1.5rem",
                fontWeigh: "semibold",
                textAlign: "center",
                letterSpacing: "0.5px",
              }}
            >
              <div>Currency</div>
              <div>Transfer</div>
            </Box>
          </Box>
          <Box sx={{ mb: 3 }}>
            <CurrencyInputs
              currencies={currencies}
              onCurrencyChange={(value) =>
                handleCurrencyChange(value, "currencyFrom")
              }
              onAmountMoneyChange={(value) =>
                handleAmountMoneyChange(value, "sourceAmount")
              }
              defaultCurrency={currencyFrom}
            />
          </Box>
          <Box sx={{ mx: "auto", textAlign: "center" }}>
            <img
              src={ImgConverterSwapIcon}
              alt="Swap Icon"
              height={25}
              width={25}
              style={{ cursor: "pointer" }}
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <CurrencyInputs
              isFrom={false}
              defaultCurrency={currencyTo}
              currencies={currencies}
              onCurrencyChange={(value) =>
                handleCurrencyChange(value, "currencyTo")
              }
              onAmountMoneyChange={(value) =>
                handleAmountMoneyChange(value, "targetAmount")
              }
            />
          </Box>
          <Box
            sx={{
              textAlign: "center",
              marginTop: 2,
            }}
          >
            <Typography>Market Rate: {123}</Typography>
            <Typography>Fee: 669.34 USD</Typography>
            <StyledButton
              variant="contained"
              onClick={() => {
                console.log();
              }}
            >
              Submit
            </StyledButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export { CurrencyTransferCard };
