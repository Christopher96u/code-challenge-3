import { useQuery } from "@tanstack/react-query";
import { baseApiClient } from "../api/baseApi";
import { cachingKeys } from "../utils/constants";

export interface TransactionResponse extends Transaction {
  id: number;
  createdAt: string;
}
export interface Transaction {
  currencyFrom: string;
  currencyTo: string;
  sourceAmount: number;
  targetAmount: number;
  fee: number;
  fxRate: number;
  marketRate: number;
}
// This assures the hook below is the only way to fetch the currencies
const getTransactions = async (): Promise<TransactionResponse[]> => {
  try {
    const response = await baseApiClient.get<TransactionResponse[]>(
      "/transactions"
    );
    return response.data;
  } catch (error) {
    console.error("Error getting the transactions", error);
    return [];
  }
};
export function useTransactionsQuery() {
  return useQuery({
    queryKey: [cachingKeys.transactions],
    queryFn: () => getTransactions(),
  });
}
