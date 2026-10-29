import { useBank } from "../context/BankContext.jsx";
import BalanceCard from "../components/BalanceCard.jsx";
import WithdrawForm from "../components/WithdrawForm.jsx";

export default function Withdraw() {
  const { balance } = useBank();
  return (
    <>
      <header className="page__head">
        <h1>Withdraw money</h1>
      </header>
      <div className="two-col">
        <section className="panel">
          <WithdrawForm />
        </section>
        <BalanceCard label="Available to withdraw" amount={balance} tone="main" />
      </div>
    </>
  );
}
