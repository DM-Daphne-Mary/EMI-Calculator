import React, { useState } from "react";
import "./App.css";

function App() {
  const [loanAmount, setLoanAmount] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [error, setError] = useState("");

  const calculateEMI = () => {
    // Validation
    if (!loanAmount || !annualRate || !tenure || loanAmount <= 0 || annualRate <= 0 || tenure <= 0) {
      setError("⚠️ Please enter valid positive values for all fields.");
      setEmi(null);
      setTotalInterest(null);
      return;
    }
    setError("");

    // EMI Formula
    const P = parseFloat(loanAmount);
    const R = parseFloat(annualRate) / 12 / 100;
    const N = parseFloat(tenure);

    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emiValue * N;
    const totalInterestPaid = totalPayment - P;

    setEmi(emiValue.toFixed(2));
    setTotalInterest(totalInterestPaid.toFixed(2));
  };

  return (
    <div className="container">
      <h1>💰 EMI Calculator</h1>
      <div className="form">
        <label>Loan Amount (₹):</label>
        <input
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          placeholder="Enter loan amount"
        />

        <label>Annual Interest Rate (%):</label>
        <input
          type="number"
          value={annualRate}
          onChange={(e) => setAnnualRate(e.target.value)}
          placeholder="Enter annual interest rate"
        />

        <label>Loan Tenure (in months):</label>
        <input
          type="number"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
          placeholder="Enter loan tenure"
        />

        <button onClick={calculateEMI}>Calculate EMI</button>
      </div>

      {error && <p className="error">{error}</p>}

      {emi && (
        <div className="results">
          <h2>Results</h2>
          <p><strong>Loan Amount:</strong> ₹{loanAmount}</p>
          <p><strong>EMI:</strong> ₹{emi}</p>
          <p><strong>Total Interest to be Paid:</strong> ₹{totalInterest}</p>
        </div>
      )}
    </div>
  );
}

export default App;
