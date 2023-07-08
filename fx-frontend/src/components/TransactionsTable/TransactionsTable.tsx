import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  TransactionResponse,
  useTransactionsQuery,
} from "../../hooks/useTransactionsQuery";
const tableHeaders: string[] = [
  "Symbol",
  "Source Amount",
  "Target Amount",
  "Fee",
  "Created At",
];
const emptyRows: TransactionResponse[] = [];
const TransactionsTable = () => {
  const StyledTableHead = styled(TableHead)(() => ({
    borderTop: "1px solid #e0e0e0",
  }));
  const { data: transations } = useTransactionsQuery();
  if (!transations) {
    return <span>Something went wrong</span>;
  }
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 800, borderTop: "3px blue" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="Transactions Table">
        <StyledTableHead>
          <TableRow>
            {tableHeaders.map((header, index) => (
              <TableCell key={index} sx={{ textAlign: "center" }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {transations.length > 0 ? (
            transations.map((transaction) => (
              <TableRow
                key={transaction.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ textAlign: "center" }}
                >
                  {transaction.symbol}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {transaction.sourceAmount}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {transaction.targetAmount}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {transaction.fee}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {transaction.createdAt}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={tableHeaders.length}
                sx={{
                  textAlign: "center",
                  height: 180,
                  color: "#999999",
                }}
              >
                Not Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export { TransactionsTable };
