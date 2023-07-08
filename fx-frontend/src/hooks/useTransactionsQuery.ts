import { useQuery } from "@tanstack/react-query";
import { baseApiClient } from "../api/baseApi";

export interface TransactionResponse {
  id: number;
  createdAt: string;
  fee: number;
  sourceAmount: number;
  symbol: string;
  targetAmount: number;
}
// This assures the hook below is the only way to fetch the currencies
const getTransactions = async (): Promise<TransactionResponse[]> => {
  try {
    const response = await baseApiClient.get<TransactionResponse[]>(
      "/transactions"
    );
    return response.data;
  } catch (error) {
    //TODO: Handle error in a better way
    console.error("Error getting the transactions", error);
    return [];
  }
};
export function useTransactionsQuery() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(),
  });
}
