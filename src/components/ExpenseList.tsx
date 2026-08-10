import type { Expense } from "../types/Expense";

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: number) => void;
}

const ExpenseList = ({
  expenses,
  onDeleteExpense,
}: ExpenseListProps) => {
  if (expenses.length === 0) {
    return (
      <div className="empty-container">
        <div className="empty-icon">💸</div>
        <h2>No Expenses Found</h2>
        <p>Add an expense to see it here.</p>
      </div>
    );
  }

  return (
    <div className="expense-list">
      {expenses.map((expense: Expense) => (
        <div className="expense-item" key={expense.id}>
          <div className="expense-main">
            <div className="expense-icon">
              {expense.category === "Food"
                ? "🍔"
                : expense.category === "Travel"
                ? "✈️"
                : expense.category === "Shopping"
                ? "🛍️"
                : expense.category === "Bills"
                ? "🧾"
                : "💰"}
            </div>

            <div>
              <h3>{expense.description}</h3>

              <span className="category-badge">
                {expense.category}
              </span>
            </div>
          </div>

          <div className="expense-details">
            <strong>
              ₹{expense.amount.toLocaleString("en-IN")}
            </strong>

            <span>{expense.date}</span>

            <button
              className="delete-btn"
              onClick={() =>
                onDeleteExpense(expense.id)
              }
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;