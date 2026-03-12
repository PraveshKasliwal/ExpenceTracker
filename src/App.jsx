import React from 'react';
import { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import SummaryPanel from './components/SummaryPanel';
import CurrencyConverter from './components/CurrencyConverter';
import './App.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    const newExpense = {
      id: Date.now(),
      ...expense,
      date: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    };
    setExpenses([newExpense, ...expenses]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const totalAmount = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <h1 className="app-title">💰 SpendWise</h1>
        </div>
      </header>

      <div className="app-body">
        <aside className="sidebar">
          <SummaryPanel expenses={expenses} totalAmount={totalAmount} />
          <CurrencyConverter totalAmount={totalAmount} />
        </aside>

        <main className="main-content">
          <ExpenseForm onAddExpense={addExpense} />
          <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
        </main>
      </div>
    </div>
  );
}

export default App;
