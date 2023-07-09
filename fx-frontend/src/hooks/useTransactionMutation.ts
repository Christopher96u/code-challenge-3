import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseApiClient } from "../api/baseApi";
import { Transaction, TransactionResponse } from "./useTransactionsQuery";
import { cachingKeys } from "../utils/constants";

// This assures the hook below is the only way to create a transaction
const createTransaction = async (
  transaction: Transaction
): Promise<TransactionResponse> => {
  try {
    const response = await baseApiClient.post<TransactionResponse>(
      "/transactions",
      transaction
    );
    return response.data;
  } catch (error) {
    console.error("Error creation a transaction", error);
    return {} as TransactionResponse;
  }
};
export function useTransactionMutation(transaction: Transaction) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => createTransaction(transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [cachingKeys.transactions] });
    },
  });
}
