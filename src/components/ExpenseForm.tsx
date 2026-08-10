import { useState } from "react";
import type { Expense } from "../types/Expense";

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
}

interface ExpenseFormData {
  description: string;
  category: string;
  amount: string;
  date: string;
}

const ExpenseForm = ({
  onAddExpense,
}: ExpenseFormProps) => {
  const [formData, setFormData] =
    useState<ExpenseFormData>({
      description: "",
      category: "",
      amount: "",
      date: "",
    });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ): void => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();

    if (
      !formData.description ||
      !formData.category ||
      !formData.amount ||
      !formData.date
    ) {
      alert("Please fill all fields.");
      return;
    }

    const newExpense: Expense = {
      id: Date.now(),
      description: formData.description,
      category: formData.category,
      amount: Number(formData.amount),
      date: formData.date,
    };

    onAddExpense(newExpense);

    setFormData({
      description: "",
      category: "",
      amount: "",
      date: "",
    });
  };

  return (
    <div className="expense-form-card">
      <h2>Add New Expense</h2>
      <p>Enter your expense details below</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Description</label>

          <input
            type="text"
            name="description"
            placeholder="e.g. Grocery shopping"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Category</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">
              Entertainment
            </option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Amount</label>

          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            min="0"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Date</label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="add-expense-btn">
          + Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;