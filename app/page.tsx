"use client"
import { use, useState } from 'react';

const MortgageCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [error, setError] = useState('');

  const calculateMonthlyPayment = () => {
     // Reset error message
     setError('');

     // Input validation
     if (principal === '' || interestRate === '' || loanTerm === '') {
       setError('All fields are required');
       return;
     }
 
     if (parseFloat(principal) <= 0 || parseFloat(interestRate) <= 0 || parseFloat(loanTerm) <= 0) {
       setError('Input must be greater than zero');
       return;
     }
     
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
    const monthlyPayment = (principal * monthlyInterestRate) / denominator * (1 + monthlyInterestRate);
    setMonthlyPayment(monthlyPayment.toFixed(2));
  };

  return (
    <div>
      <h1>Mortgage Calculator</h1>
      <div>
        <label htmlFor="principal">Principal Amount ($):</label>
        <input type="number" id="principal" value={principal} onChange={e => setPrincipal(e.target.value)} />
      </div>
      <div>
        <label htmlFor="interestRate">Interest Rate (%):</label>
        <input type="number" id="interestRate" value={interestRate} onChange={e => setInterestRate(e.target.value)} />
      </div>
      <div>
        <label htmlFor="loanTerm">Loan Term (years):</label>
        <input type="number" id="loanTerm" value={loanTerm} onChange={e => setLoanTerm(e.target.value)} />
      </div>
      <button onClick={calculateMonthlyPayment}>Calculate</button>
      {error && <div className="error">{error}</div>}
      <div>
        <h2>Monthly Payment: ${monthlyPayment}</h2>
      </div>
    </div>
  );
};

export default MortgageCalculator;

