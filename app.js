import React, { useState, useEffect } from 'react';
import { countryList } from './codes';
import './style.css';

const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurr, setFromCurr] = useState("USD");
  const [toCurr, setToCurr] = useState("INR");
  const [msg, setMsg] = useState("Fetching exchange rate...");

  // Fetch exchange rate logic
  const updateExchangeRate = async () => {
    let amtVal = amount < 1 ? 1 : amount;
    try {
      const URL = `${BASE_URL}/${fromCurr.toLowerCase()}.json`;
      const response = await fetch(URL);
      const data = await response.json();
      const rate = data[fromCurr.toLowerCase()][toCurr.toLowerCase()];
      const finalAmount = (amtVal * rate).toFixed(2);
      setMsg(`${amtVal} ${fromCurr} = ${finalAmount} ${toCurr}`);
    } catch (error) {
      setMsg("Error fetching exchange rate!");
      console.error("Error:", error);
    }
  };

  // Initial load
  useEffect(() => {
    updateExchangeRate();
  }, []);

  const handleSwap = () => {
    setFromCurr(toCurr);
    setToCurr(fromCurr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateExchangeRate();
  };

  return (
    <div className="container">
      <a href="../Hous-list.html#tableinfo" id="close">&times;</a>
      <h2>Currency Converter</h2>
      <form onSubmit={handleSubmit}>
        <div className="amount">
          <p>Enter Amount</p>
          <input 
            className="box" 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            min="1" 
          />
        </div>

        <div className="dropdown">
          <div className="from">
            <p>From</p>
            <div className="select-container">
              {/* Flag updates automatically based on fromCurr */}
              <img src={`https://flagsapi.com/${countryList[fromCurr]}/flat/64.png`} alt="flag" />
              <select name="from" value={fromCurr} onChange={(e) => setFromCurr(e.target.value)}>
                {Object.keys(countryList).map((code) => (
                  <option key={code} value={code}>{code}</option>
                ))}
              </select>
            </div>
            {/* 🌐 New Dynamic Link for Country Details */}
            <a 
              href={`https://www.iban.com/currency-codes`} 
              target="_blank" 
              rel="noreferrer" 
              className="details-link"
            >
              View {fromCurr} Details
            </a>
          </div>

          <i className="fa-solid fa-arrow-right-arrow-left" id="swap-btn" onClick={handleSwap}></i>

          <div className="to">
            <p>To</p>
            <div className="select-container">
              <img src={`https://flagsapi.com/${countryList[toCurr]}/flat/64.png`} alt="flag" />
              <select name="to" value={toCurr} onChange={(e) => setToCurr(e.target.value)}>
                {Object.keys(countryList).map((code) => (
                  <option key={code} value={code}>{code}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="msg">{msg}</div>
        <button type="submit">Get Exchange Rate</button>
      </form>
    </div>
  );
}

export default App;
