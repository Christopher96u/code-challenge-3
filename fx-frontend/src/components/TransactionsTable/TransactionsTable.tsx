import {
  IconButton,
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
import { Delete } from "@mui/icons-material";
import { useTransactionRemoveMutation } from "../../hooks/useTransactionRemoveMutation";
import { useState } from "react";
import { tableHeaders } from "../../utils/constants";
const TransactionsTable = () => {
  const [selectedId, setSelectedId] = useState(0);
  const { mutate } = useTransactionRemoveMutation(selectedId);
  const StyledTableHead = styled(TableHead)(() => ({
    borderTop: "1px solid #e0e0e0",
  }));
  const { data: transations } = useTransactionsQuery();
  const handleOnRemoveTransaction = (id: number) => {
    setSelectedId(id);
    mutate();
  };
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
                  {transaction.currencyTo}
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
                <TableCell sx={{ textAlign: "center" }}>
                  {
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleOnRemoveTransaction(transaction.id)}
                      size="medium"
                      color="error"
                    >
                      <Delete fontSize="inherit" />
                    </IconButton>
                  }
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
