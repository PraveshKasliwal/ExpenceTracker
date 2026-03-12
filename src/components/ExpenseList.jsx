import './ExpenseList.css';

const categoryColors = {
    Food: '#FF6B35',
    Travel: '#3B82F6',
    Marketing: '#8B5CF6',
    Utilities: '#14B8A6',
    Other: '#6B7280'
};

const categoryIcons = {
    Food: '🍔',
    Travel: '✈️',
    Marketing: '📢',
    Utilities: '⚡',
    Other: '📦'
};

const ExpenseList = ({ expenses, onDeleteExpense }) => {
    return (
        <div className="expense-list-container">
            <div className="list-header">
                <h2 className="list-title">Your Expenses</h2>
                {expenses.length > 0 && (
                    <span className="count-badge">{expenses.length}</span>
                )}
            </div>

            {expenses.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">🧾</div>
                    <p className="empty-title">No expenses yet!</p>
                    <p className="empty-subtitle">Add your first expense above</p>
                </div>
            ) : (
                <div className="expense-cards">
                    {expenses.map((expense) => (
                        <div
                            key={expense.id}
                            className="expense-card"
                            style={{ borderLeftColor: categoryColors[expense.category] }}
                        >
                            <div className="expense-card-left">
                                <h3 className="expense-name">{expense.name}</h3>
                                <span
                                    className="category-badge"
                                    style={{ backgroundColor: categoryColors[expense.category] }}
                                >
                                    {categoryIcons[expense.category]} {expense.category}
                                </span>
                                <p className="expense-date">{expense.date}</p>
                            </div>
                            <div className="expense-card-right">
                                <p className="expense-amount">₹{expense.amount}</p>
                                <button
                                    className="delete-button"
                                    onClick={() => onDeleteExpense(expense.id)}
                                    aria-label="Delete expense"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ExpenseList;
