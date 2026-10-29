import { useBank } from "../context/BankContext.jsx";
import TransactionList from "../components/TransactionList.jsx";

export default function Transactions() {
  const { transactions, resetAccount } = useBank();

  const handleReset = () => {
    if (window.confirm("Reset the balance and clear all transactions?")) resetAccount();
  };

  return (
    <>
      <header className="page__head">
        <h1>Transaction history</h1>
      </header>
      <section className="panel">
        <TransactionList transactions={transactions} />
        {transactions.length > 0 && (
          <button type="button" className="btn btn--ghost reset" onClick={handleReset}>
            Reset demo data
          </button>
        )}
      </section>
    </>
  );
}
