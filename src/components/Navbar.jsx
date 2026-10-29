import { NavLink } from "react-router-dom";
import { useBank } from "../context/BankContext.jsx";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/deposit", label: "Deposit" },
  { to: "/withdraw", label: "Withdraw" },
  { to: "/transactions", label: "Transaction History" },
];

export default function Navbar() {
  const { bankName } = useBank();

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <span className="navbar__brand">{bankName}</span>
        <nav className="navbar__links" aria-label="Main">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) => (isActive ? "navlink navlink--active" : "navlink")}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
