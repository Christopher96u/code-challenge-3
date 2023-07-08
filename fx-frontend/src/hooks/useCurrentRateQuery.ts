import { useQuery } from "@tanstack/react-query";
import { openExchangeApiClient } from "../api/openExchangeApi";
import { CurrencyConversion } from "../components/CurrencyTransfer/CurrencyTransferCard";
export interface CurrentRate {
  rates: {
    [key: string]: number;
  };
}
// This assures the hook below is the only way to fetch the current rate
const getCurrentRate = async (
  currencyConversion: CurrencyConversion
): Promise<CurrentRate> => {
  try {
    const response = await openExchangeApiClient.get<CurrentRate>(
      "/latest.json",
      {
        params: {
          symbols: `${currencyConversion.currencyFrom},${currencyConversion.currencyTo}`,
        },
      }
    );
    console.log("data to send", currencyConversion);
    console.log("AXIOS CALLED TO GET CURRENT RATE", response.data);
    return response.data;
  } catch (error) {
    //TODO: Handle error in a better way
    console.error("Error getting the current rate", error);
    return {
      rates: {
        AUD: 0.0,
        USD: 0.0,
      },
    };
  }
};
export function useCurrentRateQuery(currencyConversion: CurrencyConversion) {
  return useQuery({
    queryKey: ["currentRate"],
    queryFn: () => getCurrentRate(currencyConversion),
    enabled:
      currencyConversion.sourceAmount > 0 ||
      currencyConversion.targetAmount > 0,
  });
}
