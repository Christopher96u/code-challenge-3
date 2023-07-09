import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseApiClient } from "../api/baseApi";
const removeTransaction = async (transactionId: number): Promise<any> => {
  try {
    const response = await baseApiClient.delete<any>(
      `/transactions/${transactionId}`
    );
    console.log("Transaction removed", response.data);
    return response.data;
  } catch (error) {
    //TODO: Handle error in a better way
    console.error("Error removing a transaction", error);
  }
};
export function useTransactionRemoveMutation(transactionId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => removeTransaction(transactionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}
