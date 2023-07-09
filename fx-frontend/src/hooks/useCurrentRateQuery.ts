import { useQuery } from "@tanstack/react-query";
import { openExchangeApiClient } from "../api/openExchangeApi";
import { CurrencyConversion } from "../components/CurrencyTransfer/CurrencyTransferCard";
/* export interface CurrentRate {
  rates: {
    [currency: string]: number;
  };
} */
// This assures the hook below is the only way to fetch the current rate
const getCurrentRate = async (
  currencyConversion: CurrencyConversion
): Promise<any> => {
  try {
    console.log("CALLING API WITH THESE VALUES =>", currencyConversion);
    const response = await openExchangeApiClient.get<any>("/latest.json", {
      params: {
        symbols: `${currencyConversion.currencyFrom},${currencyConversion.currencyTo}`,
      },
    });
    const openExchangeApiResponse = response.data;
    const marketRate = Number(
      (
        (1 / openExchangeApiResponse.rates[currencyConversion.currencyFrom]) *
        openExchangeApiResponse.rates[currencyConversion.currencyTo]
      ).toFixed(5)
    );
    const fxRate = Number((marketRate * 1.01).toFixed(5)); // Use a flag to change the 1.01 to 0.99
    const sourceAmount = currencyConversion.sourceAmount;
    const targetAmount = Number((sourceAmount * fxRate).toFixed(5));
    const fee = Math.abs(Number((sourceAmount - targetAmount).toFixed(2))); // Probably change this based on a flag
    return {
      marketRate,
      fxRate,
      currencyFrom: currencyConversion.currencyFrom,
      currencyTo: currencyConversion.currencyTo,
      sourceAmount,
      targetAmount,
      fee,
    };
  } catch (error) {
    //TODO: Handle error in a better way
    console.error("Error getting the current rate", error);
  }
};
export function useCurrentRateQuery(currencyConversion: CurrencyConversion) {
  return useQuery({
    queryKey: [
      "currentRate",
      currencyConversion.currencyFrom,
      currencyConversion.currencyTo,
      currencyConversion.sourceAmount,
    ],
    cacheTime: 0,
    queryFn: () => getCurrentRate(currencyConversion),
    /* enabled: canCallFn(currencyConversion), */
    refetchOnWindowFocus: false,
  });
}
