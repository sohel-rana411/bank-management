import { formatCurrency } from "../context/BankContext.jsx";

export default function TransactionItem({ transaction }) {
  const { type, amount, date } = transaction;
  const isDeposit = type === "Deposit";

  return (
    <li className={`tx ${isDeposit ? "tx--deposit" : "tx--withdrawal"}`}>
      <div className="tx__info">
        <span className="tx__type">{type}</span>
        <time className="tx__date" dateTime={date}>
          {new Date(date).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
        </time>
      </div>
      <span className="tx__amount">
        {isDeposit ? "+" : "−"}
        {formatCurrency(amount)}
      </span>
    </li>
  );
}
