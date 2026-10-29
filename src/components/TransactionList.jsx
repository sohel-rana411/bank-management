import TransactionItem from "./TransactionItem.jsx";

// `limit` lets the dashboard show only the latest few items.
export default function TransactionList({ transactions, limit }) {
  if (transactions.length === 0) {
    return (
      <p className="empty">
        No transactions yet. Make a deposit or withdrawal and it will show up here.
      </p>
    );
  }

  const items = limit ? transactions.slice(0, limit) : transactions;

  return (
    <ul className="tx-list">
      {items.map((t) => (
        <TransactionItem key={t.id} transaction={t} />
      ))}
    </ul>
  );
}
