# SR Bank – React Bank Management System

A frontend-only practice project built with React, Vite and React Router DOM.
All money is simulated; there is no backend.

## Run it

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Features

- Dashboard with bank name, account holder, account number, balance, total deposited and withdrawn
- Deposit and withdraw forms with validation (empty, zero, negative, insufficient funds)
- Transaction history with deposit/withdrawal styles and an empty state
- React Router DOM navigation with `NavLink`

### Bonus tasks included
- `useRef` focuses the amount input
- Context API (`BankContext`) shares account data across pages
- `localStorage` keeps balance and transactions after refresh
- Confirmation step before a withdrawal

## Structure

```
src/
  components/  Navbar, BalanceCard, DepositForm, WithdrawForm,
               TransactionList, TransactionItem, Message
  pages/       Dashboard, Deposit, Withdraw, Transactions
  context/     BankContext.jsx
  App.jsx  main.jsx  index.css
```
