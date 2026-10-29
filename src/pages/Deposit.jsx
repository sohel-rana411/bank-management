import { useBank } from "../context/BankContext.jsx";
import BalanceCard from "../components/BalanceCard.jsx";
import DepositForm from "../components/DepositForm.jsx";

export default function Deposit() {
  const { balance } = useBank();
  return (
    <>
      <header className="page__head">
        <h1>Deposit money</h1>
      </header>
      <div className="two-col">
        <section className="panel">
          <DepositForm />
        </section>
        <BalanceCard label="Current balance" amount={balance} tone="main" />
      </div>
    </>
  );
}
