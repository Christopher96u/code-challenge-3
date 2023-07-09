import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import ImgConvertIcon from "../../assets/converter-icon.png";
import ImgConverterSwapIcon from "../../assets/converter-swap-icon.png";
import theme from "../../config/theme";
import { useCurrenciesQuery } from "../../hooks/useCurrenciesQuery";
import { useState } from "react";
import { CurrencyInputs } from "./CurrencyInputs";
import { useCurrentRateQuery } from "../../hooks/useCurrentRateQuery";
export interface CurrencyConversion {
  currencyFrom: string;
  currencyTo: string;
  sourceAmount: number;
  targetAmount: number;
  isTargetAmountProvided: boolean;
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
  const [currencyFrom, setCurrencyFrom] = useState("AUD");
  const [currencyTo, setCurrencyTo] = useState("USD");
  const [sourceAmount, setSourceAmount] = useState(0);
  const [targetAmount, setTargetAmount] = useState(0);
  const [isTargetAmountProvided, setIsTargetAmountProvided] = useState(false);
  const { data: currentRates } = useCurrentRateQuery({
    currencyFrom,
    currencyTo,
    sourceAmount,
    targetAmount,
    isTargetAmountProvided,
  });
  const handleCurrencyChange = (value: string, identifier: string) => {
    if (identifier === "currencyFrom") {
      setCurrencyFrom(value);
    } else {
      setCurrencyTo(value);
    }
  };
  const handleAmountMoneyChange = (value: number, identifier: string) => {
    if (identifier === "sourceAmount") {
      setSourceAmount(value);
      console.log("currentRate to SEND", currentRates?.targetAmount);
      setTargetAmount(currentRates?.targetAmount || 0);
    } else {
      // Target amount changed, so in this case we will update the source amount
      setIsTargetAmountProvided(true);
      setTargetAmount(value);
      console.log("currentRate to SEND", currentRates?.sourceAmount);
      setSourceAmount(currentRates?.sourceAmount || 0);
    }
  };
  const handleSwitchCurrencies = () => {
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
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
              inputValue={sourceAmount}
            />
          </Box>
          <Box sx={{ mx: "auto", textAlign: "center" }}>
            <IconButton
              onClick={handleSwitchCurrencies}
              aria-label="Switch currency button"
              color="primary"
            >
              <img
                src={ImgConverterSwapIcon}
                alt="Swap Icon"
                height={25}
                width={25}
                style={{ cursor: "pointer" }}
              />
            </IconButton>
          </Box>
          <Box sx={{ mt: 3 }}>
            <CurrencyInputs
              inputValue={targetAmount}
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
            <Typography>Market Rate: {currentRates?.fxRate}</Typography>
            <Typography>
              Fee: {currentRates?.fee}{" "}
              {currentRates?.isTargetAmountProvided
                ? currentRates.currencyFrom
                : currentRates?.currencyTo}
            </Typography>
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
