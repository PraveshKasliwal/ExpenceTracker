import './SummaryPanel.css';

const categoryColors = {
    Food: '#FF6B35',
    Travel: '#3B82F6',
    Marketing: '#8B5CF6',
    Utilities: '#14B8A6',
    Other: '#6B7280'
};

const SummaryPanel = ({ expenses, totalAmount }) => {
    const categoryTotals = expenses.reduce((acc, expense) => {
        const category = expense.category;
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += parseFloat(expense.amount);
        return acc;
    }, {});

    const categories = Object.keys(categoryTotals).sort(
        (a, b) => categoryTotals[b] - categoryTotals[a]
    );

    return (
        <div className="summary-panel">
            <h2 className="summary-title">
                <span className="green-dot"></span>
                SUMMARY
            </h2>

            <div className="total-card">
                <p className="total-label">Total Spent</p>
                <p className="total-amount">₹{totalAmount.toFixed(2)}</p>
                <p className="total-count">{expenses.length} expense{expenses.length !== 1 ? 's' : ''}</p>
            </div>

            {categories.length > 0 && (
                <div className="category-breakdown">
                    <h3 className="breakdown-title">BY CATEGORY</h3>
                    <div className="category-list">
                        {categories.map((category) => {
                            const amount = categoryTotals[category];
                            const percentage = totalAmount > 0 ? (amount / totalAmount) * 100 : 0;
                            return (
                                <div key={category} className="category-item">
                                    <div className="category-row">
                                        <div className="category-info">
                                            <span
                                                className="category-dot"
                                                style={{ backgroundColor: categoryColors[category] }}
                                            ></span>
                                            <span className="category-name">{category}</span>
                                        </div>
                                        <span className="category-amount">₹{amount.toFixed(2)}</span>
                                    </div>
                                    <div className="category-bar">
                                        <div
                                            className="category-bar-fill"
                                            style={{
                                                width: `${percentage}%`,
                                                backgroundColor: categoryColors[category]
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SummaryPanel;
