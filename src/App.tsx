import { useState } from "react";
import Users from "./pages/Users";
import Expenses from "./pages/Expenses";
import "./App.css";

type Page = "users" | "expenses";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("users");

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span>UE</span>
          <h2>Users & Expenses</h2>
        </div>

        <div className="nav-links">
          <button
            className={
              currentPage === "users"
                ? "nav-btn active"
                : "nav-btn"
            }
            onClick={() => setCurrentPage("users")}
          >
            👥 Users
          </button>

          <button
            className={
              currentPage === "expenses"
                ? "nav-btn active"
                : "nav-btn"
            }
            onClick={() => setCurrentPage("expenses")}
          >
            💰 Expenses
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <main>
        {currentPage === "users" && <Users />}

        {currentPage === "expenses" && <Expenses />}
      </main>
    </div>
  );
}

export default App;
