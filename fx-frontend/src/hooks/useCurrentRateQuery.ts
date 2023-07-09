import { useQuery } from "@tanstack/react-query";
import { openExchangeApiClient } from "../api/openExchangeApi";
import { CurrencyConversion } from "../components/CurrencyTransfer/CurrencyTransferCard";
import { calculateCurrencyConversion } from "../utils/calculateCurrencyConversion";
export interface CurrencyConversionResult {
  marketRate: number;
  fxRate: number;
  currencyFrom: string;
  currencyTo: string;
  sourceAmount: number;
  targetAmount: number;
  fee: number;
  isTargetAmountProvided?: boolean;
}
export interface OpenExchangeApiResponse {
  rates: {
    [currency: string]: number;
  };
}

// This assures the hook below is the only way to fetch the current rate
const getCurrentRate = async (
  currencyConversion: CurrencyConversion
): Promise<CurrencyConversionResult | undefined> => {
  try {
    const response = await openExchangeApiClient.get<OpenExchangeApiResponse>(
      "/latest.json",
      {
        params: {
          symbols: `${currencyConversion.currencyFrom},${currencyConversion.currencyTo}`,
        },
      }
    );
    const openExchangeApiResponse = response.data;
    return calculateCurrencyConversion(
      currencyConversion,
      openExchangeApiResponse
    );
  } catch (error) {
    console.error("Error getting the current rate", error);
  }
};
export function useCurrentRateQuery(currencyConversion: CurrencyConversion) {
  return useQuery({
    queryKey: [
      currencyConversion.currencyFrom,
      currencyConversion.currencyTo,
      currencyConversion.sourceAmount,
      currencyConversion.targetAmount,
      currencyConversion.isTargetAmountProvided,
    ],
    cacheTime: 0,
    queryFn: () => getCurrentRate(currencyConversion),
    refetchOnWindowFocus: false,
  });
}
