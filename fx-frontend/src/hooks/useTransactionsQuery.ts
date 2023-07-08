import { useQuery } from "@tanstack/react-query";
import { baseApiClient } from "../api/baseApi";

// This assures the hook below is the only way to fetch the currencies
const getTransactions = async (): Promise<any> => {
  try {
    const response = await baseApiClient.get("/transactions");
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
