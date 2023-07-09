export interface Route {
  path: string;
  displayName: string;
}
export const routes: Route[] = [
  {
    path: "/currency-converter",
    displayName: "Currency Converter",
  },
  {
    path: "/transactions",
    displayName: "Transactions",
  },
];
export const tableHeaders: string[] = [
  "Symbol",
  "Source Amount",
  "Target Amount",
  "Fee",
  "Created At",
  "Remove",
];
export const cachingKeys = {
  currencies: "currencies",
  transactions: "transactions",
};
