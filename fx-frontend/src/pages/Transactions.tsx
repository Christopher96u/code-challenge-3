import { Container, Typography } from "@mui/material";
import { TransactionsTable } from "../components/TransactionsTable/TransactionsTable";

export const Transactions = () => {
  return (
    <div>
      <Typography variant="h4" textAlign="center" my={6}>
        Transactions
      </Typography>
      <Container
        maxWidth={false}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <TransactionsTable />
      </Container>
    </div>
  );
};
