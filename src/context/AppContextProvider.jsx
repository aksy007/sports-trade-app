import { useState } from "react";
import { AppContext } from "./AppContext";

const dummyOrder = {
  id: 1,
  team: "CSK",
  orderType: "Limit",
  orderAction: "Buy",
  transactionDate: "2025-06-03  14:57:23",
  price: 34,
  filled: 0.0,
  amount: 0.01,
  changeInPercent: 0,
  state: "open",
};

const initialData = {
  orders: {
    openOrders: [dummyOrder],
    positionOrders: [],
    history: [],
  },
  wallet: 0,
};

export const AppContextProvider = ({ children }) => {
  const [data, setData] = useState(initialData);

  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
};
