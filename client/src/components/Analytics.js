import React from "react";
import { Progress } from "antd";

//total transactions:

const Analytics = ({ allTransaction }) => {
  //category
  const categories = [
    "salary",
    "bills",
    "project",
    "food",
    "leisure",
    "medicine",
    "shopping",
    "groceries",
  ];
  const totalTransaction = allTransaction.length;
  const totalIncomeTransactions = allTransaction.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = allTransaction.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransactions.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransactions.length / totalTransaction) * 100;

  //total turnover
  const totalTurnover = allTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransaction
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = allTransaction
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <>
      <div className="row m-3">
  {/* Total Transactions */}
  <div className="col-md-3 mb-3">
    <div className="card">
      <div className="card-header">
        Total Transactions: {totalTransaction}
      </div>
      <div className="card-body">
        <h5 className="text-success">
          Income: {totalIncomeTransactions.length}
        </h5>
        <h5 className="text-danger">
          Expense: {totalExpenseTransactions.length}
        </h5>
        <div>
          <Progress
            type="circle"
            strokeColor={"green"}
            className="mx-2"
            percent={totalIncomePercent.toFixed(0)}
          />
          <Progress
            type="circle"
            strokeColor={"red"}
            className="mx-2"
            percent={totalExpensePercent.toFixed(0)}
          />
        </div>
      </div>
    </div>
  </div>

  {/* Total Turnover */}
  <div className="col-md-3 mb-3">
    <div className="card">
      <div className="card-header">Total Turnover: {totalTurnover}</div>
      <div className="card-body">
        <h5 className="text-success">Income: {totalIncomeTurnover}</h5>
        <h5 className="text-danger">Expense: {totalExpenseTurnover}</h5>
        <div>
          <Progress
            type="circle"
            strokeColor={"green"}
            className="mx-2"
            percent={totalIncomeTurnoverPercent.toFixed(0)}
          />
          <Progress
            type="circle"
            strokeColor={"red"}
            className="mx-2"
            percent={totalExpenseTurnoverPercent.toFixed(0)}
          />
        </div>
      </div>
    </div>
  </div>

  {/* Category Wise Income */}
  <div className="col-md-3 mb-3">
   
    <h5 className="text-center p-2 rounded bg-info">Category Wise Income</h5>
    {categories.map((category) => {
      const amount = allTransaction
        .filter(
          (transaction) =>
            transaction.type === "income" &&
            transaction.category === category
        )
        .reduce((acc, transaction) => acc + transaction.amount, 0);
      return (
        amount > 0 && (
          <div className="card mb-2" key={category}>
            <div className="card-body">
              <h6>{category}</h6>
              <Progress
                percent={((amount / totalIncomeTurnover) * 100).toFixed(0)}
              />
            </div>
          </div>
        )
      );
    })}
  
  </div>

  {/* Category Wise Expense */}
  <div className="col-md-3 mb-3">
   
    <h5 className="text-center p-2 rounded bg-warning">Category Wise Expense</h5>
    {categories.map((category) => {
      const amount = allTransaction
        .filter(
          (transaction) =>
            transaction.type === "expense" &&
            transaction.category === category
        )
        .reduce((acc, transaction) => acc + transaction.amount, 0);
      return (
        amount > 0 && (
          <div className="card mb-2" key={category}>
            <div className="card-body">
              <h6>{category}</h6>
              <Progress
                percent={((amount / totalExpenseTurnover) * 100).toFixed(0)}
              />
            </div>
          </div>
        )
      );
    })}
  </div>

</div>
    </>
  );
};

export default Analytics;
