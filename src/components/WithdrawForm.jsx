import { useEffect, useRef, useState } from "react";
import { useBank, formatCurrency } from "../context/BankContext.jsx";
import Message from "./Message.jsx";

export default function WithdrawForm() {
  const { withdraw } = useBank();
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState(null);
  const [pending, setPending] = useState(null); // amount waiting for confirmation
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = Number(amount);

    // Validate first so errors show immediately; only valid amounts get confirmed.
    if (amount === "" || !Number.isFinite(value) || value <= 0) {
      setMessage({ ok: false, text: "Enter an amount greater than zero." });
      return;
    }
    setMessage(null);
    setPending(value); // Bonus: ask for confirmation
  };

  const confirm = () => {
    const result = withdraw(pending);
    setMessage({ ok: result.ok, text: result.message });
    if (result.ok) setAmount("");
    setPending(null);
    inputRef.current?.focus();
  };

  const cancel = () => {
    setPending(null);
    inputRef.current?.focus();
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="withdraw-amount">Amount to withdraw</label>
      <input
        id="withdraw-amount"
        ref={inputRef}
        type="number"
        inputMode="decimal"
        step="0.01"
        placeholder="0.00"
        value={amount}
        disabled={pending !== null}
        onChange={(e) => {
          setAmount(e.target.value);
          setMessage(null);
        }}
      />

      {pending === null ? (
        <button type="submit" className="btn btn--withdraw">Withdraw</button>
      ) : (
        <div className="confirm" role="alertdialog" aria-label="Confirm withdrawal">
          <p>Withdraw <strong>{formatCurrency(pending)}</strong> from your account?</p>
          <div className="confirm__actions">
            <button type="button" className="btn btn--withdraw" onClick={confirm}>
              Yes, withdraw
            </button>
            <button type="button" className="btn btn--ghost" onClick={cancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
      <Message message={message} />
    </form>
  );
}
