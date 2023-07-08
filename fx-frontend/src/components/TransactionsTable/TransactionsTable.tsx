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
import { useTransactionsQuery } from "../../hooks/useTransactionsQuery";
const tableHeaders: string[] = [
  "Symbol",
  "Source Amount",
  "Target Amount",
  "Fee",
  "Created At",
];
const emptyRows: TableItem[] = [];
const rows: TableItem[] = [
  {
    symbol: "USD",
    sourceAmount: 159,
    targetAmount: 6.0,
    fee: 24,
    createdAt: 4.0,
  },
  {
    symbol: "AUD",
    sourceAmount: 237,
    targetAmount: 9.0,
    fee: 37,
    createdAt: 4.3,
  },
  {
    symbol: "EUR",
    sourceAmount: 262,
    targetAmount: 16.0,
    fee: 24,
    createdAt: 6.0,
  },
  {
    symbol: "PEN",
    sourceAmount: 305,
    targetAmount: 3.7,
    fee: 67,
    createdAt: 4.3,
  },
  {
    symbol: "COP",
    sourceAmount: 356,
    targetAmount: 16.0,
    fee: 49,
    createdAt: 3.9,
  },
];
interface TableItem {
  symbol: string;
  sourceAmount: number;
  targetAmount: number;
  fee: number;
  createdAt: number;
}

const TransactionsTable = () => {
  const StyledTableHead = styled(TableHead)(() => ({
    borderTop: "1px solid #e0e0e0",
  }));
  const { data } = useTransactionsQuery();
  if (data) {
    console.log(data);
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
          {emptyRows.length > 0 ? (
            rows.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ textAlign: "center" }}
                >
                  {row.symbol}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {row.sourceAmount}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {row.targetAmount}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>{row.fee}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {row.createdAt}
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
