import React from "react";
import CSK from "../../assets/CSK-Logo.svg";
import TeamHeader from "../TeamHeader/TeamHeader";
import "./TradeInfo.css";
import OrderPad from "../OrderPad/OrderPad";
import OrderBook from "../OrderBook/OrderBook";

const TradeInfo = () => {
  return (
    <div className="tradeInfo">
      <TeamHeader
        teamName="Chennai Super Kings"
        teamIcon={CSK}
        volume="65.2"
        currentPrice="34"
        changeInPrice="+0.84"
      />
      <div className="tradeData">
        <OrderPad />
        <OrderBook />
      </div>
    </div>
  );
};

export default TradeInfo;
