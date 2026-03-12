import { useState } from 'react';
import './ExpenseForm.css';

const ExpenseForm = ({ onAddExpense }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');
    const [errors, setErrors] = useState({ name: false, amount: false });
    const [shake, setShake] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {
            name: !name.trim(),
            amount: !amount || parseFloat(amount) <= 0
        };

        setErrors(newErrors);

        if (newErrors.name || newErrors.amount) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
            return;
        }

        onAddExpense({
            name: name.trim(),
            amount: parseFloat(amount).toFixed(2),
            category
        });

        setName('');
        setAmount('');
        setCategory('Food');
        setErrors({ name: false, amount: false });
    };

    return (
        <div className={`expense-form-container ${shake ? 'shake' : ''}`}>
            <h2 className="form-title">
                Add New Expense
                <span className="title-underline"></span>
            </h2>

            <form onSubmit={handleSubmit} className="expense-form">
                <div className="form-group">
                    <label htmlFor="expense-name">Expense Name</label>
                    <input
                        id="expense-name"
                        type="text"
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Team lunch"
                    />
                    {errors.name && <span className="error-text">Expense name is required</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="expense-amount">Amount (INR)</label>
                    <div className="amount-input-wrapper">
                        <span className="dollar-sign">₹ </span>
                        <input
                            id="expense-amount"
                            type="number"
                            step="0.01"
                            className={`form-input amount-input ${errors.amount ? 'error' : ''}`}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                        />
                    </div>
                    {errors.amount && <span className="error-text">Valid amount is required</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="expense-category">Category</label>
                    <select
                        id="expense-category"
                        className="form-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="Food">🍔 Food</option>
                        <option value="Travel">✈️ Travel</option>
                        <option value="Marketing">📢 Marketing</option>
                        <option value="Utilities">⚡ Utilities</option>
                        <option value="Other">📦 Other</option>
                    </select>
                </div>

                <button type="submit" className="submit-button">
                    Add Expense
                </button>
            </form>
        </div>
    );
}

export default ExpenseForm;
