import { useEffect, useRef, useState } from "react";
import { useBank } from "../context/BankContext.jsx";
import Message from "./Message.jsx";

export default function DepositForm() {
  const { deposit } = useBank();
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState(null);
  const inputRef = useRef(null);

  // Bonus: focus the input when the page opens.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = deposit(Number(amount));
    setMessage({ ok: result.ok, text: result.message });
    if (result.ok) setAmount("");
    inputRef.current?.focus();
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="deposit-amount">Amount to deposit</label>
      <input
        id="deposit-amount"
        ref={inputRef}
        type="number"
        inputMode="decimal"
        step="0.01"
        placeholder="0.00"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
          setMessage(null);
        }}
      />
      <button type="submit" className="btn btn--deposit">Deposit</button>
      <Message message={message} />
    </form>
  );
}
