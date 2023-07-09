import { CurrencyConversion } from "../components/CurrencyTransfer/CurrencyTransferCard";
import {
  CurrencyConversionResult,
  OpenExchangeApiResponse,
} from "../hooks/useCurrentRateQuery";

export const calculateCurrencyConversion = (
  currencyConversion: CurrencyConversion,
  openExchangeApiResponse: OpenExchangeApiResponse
): CurrencyConversionResult => {
  const marketRate = Number(
    (
      (1 / openExchangeApiResponse.rates[currencyConversion.currencyFrom]) *
      openExchangeApiResponse.rates[currencyConversion.currencyTo]
    ).toFixed(5)
  );
  if (currencyConversion.isTargetAmountProvided) {
    const fxRate = Number((marketRate * 0.99).toFixed(5));
    const targetAmount = currencyConversion.targetAmount; //200
    const sourceAmount = Number(
      (currencyConversion.targetAmount / fxRate).toFixed(5)
    );
    const fee = Math.abs(Number((targetAmount / 101).toFixed(2)));
    return {
      marketRate,
      fxRate,
      currencyFrom: currencyConversion.currencyFrom,
      currencyTo: currencyConversion.currencyTo,
      sourceAmount,
      targetAmount,
      fee,
    };
  } else {
    const fxRate = Number((marketRate * 1.01).toFixed(5));
    const sourceAmount = currencyConversion.sourceAmount;
    const targetAmount = Number((sourceAmount * fxRate).toFixed(5));
    const fee = Math.abs(Number((targetAmount / 100).toFixed(2)));
    return {
      marketRate,
      fxRate,
      currencyFrom: currencyConversion.currencyFrom,
      currencyTo: currencyConversion.currencyTo,
      sourceAmount,
      targetAmount,
      fee,
    };
  }
};
