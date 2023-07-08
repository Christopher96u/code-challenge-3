import { Box, Button, Grid, Typography, styled } from "@mui/material";
import ImgConvertIcon from "../../assets/converter-icon.png";
import ImgConverterSwapIcon from "../../assets/converter-swap-icon.png";
import theme from "../../config/theme";
import { useCurrenciesQuery } from "../../hooks/useCurrenciesQuery";
import { useState } from "react";
import { CurrencyInputs } from "./CurrencyInputs";
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
  const [currencyFrom, setCurrencyFrom] = useState(""); //FIX: Remove this state or wrap all the vars in an obj
  const handleCurrencyChange = (value: string) => {
    //setCurrencyFrom(value);
    console.log("value from parent: ", value);
  };
  const handleAmountMoneyChange = (value: number) => {
    console.log("value from parent...: ", value);
  };
  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (!currencies) {
    return <span>Something went wrong</span>;
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
              onCurrencyChange={handleCurrencyChange}
              onAmountMoneyChange={handleAmountMoneyChange}
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
              defaultCurrency="USD"
              currencies={currencies}
              onCurrencyChange={handleCurrencyChange}
              onAmountMoneyChange={handleAmountMoneyChange}
            />
          </Box>
          <Box
            sx={{
              textAlign: "center",
              marginTop: 2,
            }}
          >
            <Typography>Market Rate: 1.20433</Typography>
            <Typography>Fee: 669.34 USD</Typography>
            <StyledButton variant="contained">Submit</StyledButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export { CurrencyTransferCard };
