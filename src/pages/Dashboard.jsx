import { Link } from "react-router-dom";
import { useBank } from "../context/BankContext.jsx";
import BalanceCard from "../components/BalanceCard.jsx";
import TransactionList from "../components/TransactionList.jsx";

export default function Dashboard() {
  const { bankName, appTitle, account, balance, totalDeposited, totalWithdrawn, transactions } =
    useBank();

  return (
    <>
      <header className="page__head">
        <p className="page__kicker">{bankName}</p>
        <h1>{appTitle}</h1>
      </header>

      <section className="account">
        <div>
          <span className="account__label">Account holder</span>
          <span className="account__value">{account.holder}</span>
        </div>
        <div>
          <span className="account__label">Account number</span>
          <span className="account__value account__value--mono">{account.number}</span>
        </div>
      </section>

      <div className="grid">
        <BalanceCard label="Current balance" amount={balance} tone="main" />
        <BalanceCard label="Total deposited" amount={totalDeposited} tone="deposit" />
        <BalanceCard label="Total withdrawn" amount={totalWithdrawn} tone="withdraw" />
      </div>

      <section className="panel">
        <div className="panel__head">
          <h2>Recent activity</h2>
          <Link to="/transactions">View all</Link>
        </div>
        <TransactionList transactions={transactions} limit={3} />
      </section>
    </>
  );
}
