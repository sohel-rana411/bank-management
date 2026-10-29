import { formatCurrency } from "../context/BankContext.jsx";

// Reusable card. `tone` picks the color treatment, `children` allows composition.
export default function BalanceCard({ label, amount, text, tone = "plain", children }) {
  return (
    <section className={`card card--${tone}`}>
      <h3 className="card__label">{label}</h3>
      <p className="card__value">{text ?? formatCurrency(amount)}</p>
      {children}
    </section>
  );
}
