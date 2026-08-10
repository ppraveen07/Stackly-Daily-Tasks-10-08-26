import { useMemo, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import SummaryCard from "../components/SummaryCard";
import type { Expense } from "../types/Expense";

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [selectedCategory, setSelectedCategory] =
    useState<string>("All");

  const handleAddExpense = (expense: Expense): void => {
    setExpenses((previousExpenses) => [
      expense,
      ...previousExpenses,
    ]);
  };

  const handleDeleteExpense = (id: number): void => {
    setExpenses((previousExpenses) =>
      previousExpenses.filter(
        (expense) => expense.id !== id
      )
    );
  };

  const categories: string[] = [
    "All",
    ...Array.from(
      new Set(expenses.map((expense) => expense.category))
    ),
  ];

  const filteredExpenses: Expense[] = expenses.filter(
    (expense) =>
      selectedCategory === "All" ||
      expense.category === selectedCategory
  );

  const totalExpenses: number = useMemo(() => {
    return expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
  }, [expenses]);

  const highestExpense: number = useMemo(() => {
    if (expenses.length === 0) {
      return 0;
    }

    return Math.max(
      ...expenses.map((expense) => expense.amount)
    );
  }, [expenses]);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Expense Tracker</h1>
          <p>
            Manage and track your daily expenses
          </p>
        </div>
      </div>

      <div className="summary-grid">
        <SummaryCard
          title="Total Expenses"
          value={`₹${totalExpenses.toLocaleString(
            "en-IN"
          )}`}
          icon="💰"
        />

        <SummaryCard
          title="Number of Expenses"
          value={expenses.length.toString()}
          icon="📊"
        />

        <SummaryCard
          title="Highest Expense"
          value={`₹${highestExpense.toLocaleString(
            "en-IN"
          )}`}
          icon="📈"
        />
      </div>

      <div className="expense-layout">
        <ExpenseForm
          onAddExpense={handleAddExpense}
        />

        <div className="expense-list-container">
          <div className="expense-list-header">
            <div>
              <h2>Expense List</h2>
              <p>
                {filteredExpenses.length} expenses
              </p>
            </div>

            <select
              value={selectedCategory}
              onChange={(
                event: React.ChangeEvent<HTMLSelectElement>
              ) =>
                setSelectedCategory(
                  event.target.value
                )
              }
              className="category-filter"
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category === "All"
                    ? "All Categories"
                    : category}
                </option>
              ))}
            </select>
          </div>

          <ExpenseList
            expenses={filteredExpenses}
            onDeleteExpense={handleDeleteExpense}
          />
        </div>
      </div>
    </div>
  );
};

export default Expenses;