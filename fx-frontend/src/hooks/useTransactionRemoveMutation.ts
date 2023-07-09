import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseApiClient } from "../api/baseApi";
import { cachingKeys } from "../utils/constants";
export interface DeleteResponse {
  raw: any[];
  affected: number;
}
const removeTransaction = async (
  transactionId: number
): Promise<DeleteResponse | undefined> => {
  try {
    const response = await baseApiClient.delete<DeleteResponse>(
      `/transactions/${transactionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error removing a transaction", error);
  }
};
export function useTransactionRemoveMutation(transactionId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => removeTransaction(transactionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [cachingKeys.transactions] });
    },
  });
}
