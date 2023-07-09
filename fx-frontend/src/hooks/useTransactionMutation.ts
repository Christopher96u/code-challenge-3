import { useMutation } from "@tanstack/react-query";
import { baseApiClient } from "../api/baseApi";
import { Transaction, TransactionResponse } from "./useTransactionsQuery";

// This assures the hook below is the only way to create a transaction
const createTransaction = async (
  transaction: Transaction
): Promise<TransactionResponse> => {
  try {
    const response = await baseApiClient.post<TransactionResponse>(
      "/transactions",
      transaction
    );
    console.log("Transaction created", response.data);
    return response.data;
  } catch (error) {
    //TODO: Handle error in a better way
    console.error("Error creation a transaction", error);
    return {} as TransactionResponse;
  }
};
export function useTransactionMutation(transaction: Transaction) {
  return useMutation({
    mutationFn: () => createTransaction(transaction),
  });
}
