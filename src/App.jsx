import { useReducer, useState } from "react";

const initialState = {
  isAccountOpen: false,
  balance: 0,
  loan: 0,
  isLoanActive: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "openAccount":
      return { ...state, isAccountOpen: true };
    case "closeAccount":
      return { ...initialState };
    case "deposit":
      return { ...state, balance: state.balance + action.payload };
    case "withdrawal":
      return { ...state, balance: state.balance - action.payload };
  }
};

function App() {
  const [{ isAccountOpen, balance, loan, isLoanActive }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const [deposit, setDeposit] = useState(0);
  const [withdrawal, setWithdrawal] = useState(0);

  const closeAccount = () => {
    setDeposit(0);
    setWithdrawal(0);
    dispatch({ type: "closeAccount" });
  };

  return (
    <>
      {isAccountOpen && (
        <>
          <div>
            <p>Balance: {balance}</p>
            <p>Loan: {loan}</p>
          </div>
          <div>
            <input
              type="text"
              value={deposit}
              onChange={(e) => setDeposit(Number(e.target.value))}
            />
            <button
              onClick={() => dispatch({ type: "deposit", payload: deposit })}
            >
              Deposit $
            </button>
          </div>
          <div>
            <input
              type="text"
              value={withdrawal}
              onChange={(e) => setWithdrawal(Number(e.target.value))}
            />
            <button
              onClick={() =>
                dispatch({ type: "withdrawal", payload: withdrawal })
              }
            >
              Withdraw $
            </button>
          </div>
        </>
      )}

      <button onClick={() => dispatch({ type: "openAccount" })}>
        Open Account
      </button>

      <button onClick={closeAccount}>Close Account</button>
    </>
  );
}

export default App;
