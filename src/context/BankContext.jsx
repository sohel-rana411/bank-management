import { createContext, useContext, useEffect, useState } from "react";

const BankContext = createContext(null);

const BANK_NAME = "SR Bank";
const APP_TITLE = "Bank Management System";
const OPENING_BALANCE = 10000;
const ACCOUNT = {
  holder: "Sohel Rana",
  number: "4021 7788 3095",
};

// Read from localStorage safely (falls back if empty or corrupted).
function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function BankProvider({ children }) {
  const [balance, setBalance] = useState(() => load("bank:balance", OPENING_BALANCE));
  const [transactions, setTransactions] = useState(() => load("bank:transactions", []));

  // Bonus: persist data so it survives a page refresh.
  useEffect(() => {
    localStorage.setItem("bank:balance", JSON.stringify(balance));
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("bank:transactions", JSON.stringify(transactions));
  }, [transactions]);

  const totalDeposited = transactions
    .filter((t) => t.type === "Deposit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawn = transactions
    .filter((t) => t.type === "Withdrawal")
    .reduce((sum, t) => sum + t.amount, 0);

  const addTransaction = (type, amount) => {
    const entry = {
      id: Date.now() + Math.random(),
      type,
      amount,
      date: new Date().toISOString(),
    };
    // Newest first
    setTransactions((prev) => [entry, ...prev]);
  };

  // Each action returns { ok, message } so the page can show feedback.
  const deposit = (amount) => {
    if (!Number.isFinite(amount) || amount <= 0) {
      return { ok: false, message: "Enter an amount greater than zero." };
    }
    setBalance((prev) => prev + amount);
    addTransaction("Deposit", amount);
    return { ok: true, message: `${formatCurrency(amount)} deposited successfully.` };
  };

  const withdraw = (amount) => {
    if (!Number.isFinite(amount) || amount <= 0) {
      return { ok: false, message: "Enter an amount greater than zero." };
    }
    if (amount > balance) {
      return {
        ok: false,
        message: `Insufficient funds. Your available balance is ${formatCurrency(balance)}.`,
      };
    }
    setBalance((prev) => prev - amount);
    addTransaction("Withdrawal", amount);
    return { ok: true, message: `${formatCurrency(amount)} withdrawn successfully.` };
  };

  const resetAccount = () => {
    setBalance(OPENING_BALANCE);
    setTransactions([]);
  };

  const value = {
    bankName: BANK_NAME,
    appTitle: APP_TITLE,
    account: ACCOUNT,
    balance,
    transactions,
    totalDeposited,
    totalWithdrawn,
    deposit,
    withdraw,
    resetAccount,
  };

  return <BankContext.Provider value={value}>{children}</BankContext.Provider>;
}

export function useBank() {
  const ctx = useContext(BankContext);
  if (!ctx) throw new Error("useBank must be used inside <BankProvider>");
  return ctx;
}

export function formatCurrency(n) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}
