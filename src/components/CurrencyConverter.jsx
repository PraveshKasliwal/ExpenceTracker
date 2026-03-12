import React from 'react';
import { useState, useEffect } from 'react';
import { MdCurrencyExchange } from "react-icons/md";
import './CurrencyConverter.css';

const currencies = [
    { code: 'USD', flag: '🇺🇸', name: 'US Dollar' },
    { code: 'EUR', flag: '🇪🇺', name: 'Euro' },
    { code: 'GBP', flag: '🇬🇧', name: 'British Pound' },
    { code: 'INR', flag: '🇮🇳', name: 'Indian Rupee' },
    { code: 'AED', flag: '🇦🇪', name: 'UAE Dirham' },
    { code: 'SGD', flag: '🇸🇬', name: 'Singapore Dollar' },
    { code: 'CAD', flag: '🇨🇦', name: 'Canadian Dollar' },
    { code: 'AUD', flag: '🇦🇺', name: 'Australian Dollar' },
    { code: 'JPY', flag: '🇯🇵', name: 'Japanese Yen' }
];

const CurrencyConverter = ({ totalAmount }) => {
    const [selectedCurrency, setSelectedCurrency] = useState('INR');
    const [rate, setRate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (selectedCurrency === 'INR') {
            setRate(1);
            setLoading(false);
            setError(false);
            return;
        }

        setLoading(true);
        setError(false);

        fetch(`https://api.frankfurter.app/latest?from=INR&to=${selectedCurrency}`)
            .then(res => res.json())
            .then(data => {
                setRate(data.rates[selectedCurrency]);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [selectedCurrency]);

    const convertedAmount = rate ? (totalAmount * rate).toFixed(2) : '0.00';

    return (
        <div className="currency-converter">
            <h2 className="converter-title"><MdCurrencyExchange /> Convert Total</h2>
            <p className="converter-subtitle">Live exchange rates</p>

            <select
                className="currency-select"
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
            >
                {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code}
                    </option>
                ))}
            </select>

            {loading && (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p className="loading-text">Fetching rates...</p>
                </div>
            )}

            {error && (
                <div className="error-state">
                    ⚠️ Rates unavailable — showing USD
                </div>
            )}

            {!loading && !error && rate && (
                <div className="result-card">
                    <p className="converted-amount">{convertedAmount} {selectedCurrency}</p>
                    <p className="exchange-rate">1 INR = {rate.toFixed(4)} {selectedCurrency}</p>
                </div>
            )}
        </div>
    );
}

export default CurrencyConverter;
