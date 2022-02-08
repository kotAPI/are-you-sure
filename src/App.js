import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [netIncome, setIncome] = useState(0);
  const [incomeExists, setIncomeExists] = useState(false);
  const [incomeInput, setIncomeInput] = useState(0);

  // page 2
  const [itemPrice, setItemPrice] = useState(0);

  //
  useEffect(() => {
    let income = localStorage.income || 0;

    if (income) {
      setIncome(income);
      setIncomeExists(true);
    }
  });

  function updateIncome() {
    if (incomeInput < 1) {
      return;
    }
    setIncome(incomeInput);
    setIncomeExists(true);
    localStorage.income = incomeInput;
  }

  function resetState() {
    localStorage.income = 0;
    localStorage.clear();
    setIncome(0);
    setIncomeExists(false);
    setIncomeInput(0);
    setItemPrice(0);
  }

  return (
    <div className="app">
      {incomeExists ? (
        <div className="page">
          <div>
            <div>
              {itemPrice ? getStats(netIncome, itemPrice) : ""}
              <div>
                {itemPrice ? (
                  ""
                ) : (
                  <p>
                    Enter the value of the thing you want to spend your money on
                  </p>
                )}
                <input
                  value={itemPrice}
                  onChange={(evt) => setItemPrice(evt.target.value)}
                  type="number"
                ></input>
              </div>
            </div>
          </div>
          <div className="footer" onClick={resetState}>
            Reset?
          </div>
        </div>
      ) : (
        EnterIncomePage(setIncomeInput, incomeInput, updateIncome)
      )}
    </div>
  );
}

function getStats(totalSalary, itemPrice) {
  let salaryPerDay = totalSalary / 30;
  let salaryPerHour = salaryPerDay / 24;
  let numberOfHoursToBreathe = itemPrice / salaryPerHour;
  return (
    <>
      <div>
        You have to spend {numberOfHoursToBreathe.toFixed(2)} hours aimlessly
        breathing to buy it
      </div>
      <h1 className="">Are you sure?</h1>
    </>
  );
}

function EnterIncomePage(setIncomeInput, incomeInput, updateIncome) {
  return (
    <>
      <div className="page">
        <h1>
          What's your Income? <i>(In any currency)</i>
        </h1>
        <p>
          <input
            value={incomeInput}
            onChange={(evt) => setIncomeInput(evt.target.value)}
            type="number"
          ></input>
        </p>
        <div>
          <button onClick={updateIncome}>Confirm</button>
        </div>
      </div>
    </>
  );
}

export default App;
