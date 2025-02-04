import { useQuery } from "@tanstack/react-query";
import { openExchangeApiClient } from "../api/openExchangeApi";
type CurrencyDictionary = {
  [key: string]: string;
};
export interface Currency {
  code: string;
  name: string;
}
// This assures the hook below is the only way to fetch the currencies
const getCurrencies = async (): Promise<Currency[]> => {
  try {
    const response = await openExchangeApiClient.get<CurrencyDictionary>(
      "/currencies.json"
    );
    // Parse dictionary into an array of objects
    const transformedCurrencies = Object.entries(response.data).map(
      ([code, name]) => ({
        code,
        name,
      })
    );
    return transformedCurrencies;
  } catch (error) {
    //TODO: Handle error in a better way
    console.error("Error getting the currencies", error);
    return [];
  }
};
export function useCurrenciesQuery() {
  return useQuery({
    queryKey: ["currencies"],
    queryFn: () => getCurrencies(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
}
