import React, { useContext, useState } from "react";
import DropdownIcon from "../../assets/dropdown.svg";
import InfoIcon from "../../assets/info_icon.svg";
import "./OrderPad.css";
import { AppContext } from "../../context/AppContext";
import { getFormattedDate } from "../../utils/utils";

const OrderAction = ({ orderAction, handleChangeOrderAction }) => {
  return (
    <div className="order-type">
      <div
        className={orderAction === "buy" ? "active-button" : null}
        onClick={() => handleChangeOrderAction("buy")}
      >
        BUY/LONG
      </div>

      <div
        className={orderAction === "sell" ? "active-button" : null}
        onClick={() => handleChangeOrderAction("sell")}
      >
        SELL/SHORT
      </div>
    </div>
  );
};

const Dropdown = ({ orderType, handleChangeOrderType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const OrderTypeList = [
    {
      id: "market",
      name: "Market",
    },
    {
      id: "limit",
      name: "Limit",
    },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="dropdown-container">
      <div className="dropdown-header" onClick={toggleDropdown}>
        <img src={InfoIcon} alt="info" className="info-icon" />
        <span className="order-type-label">{orderType}</span>
        <img src={DropdownIcon} alt="dropdown" className="dropdown-icon" />
      </div>

      {isOpen && (
        <div className="dropdown-list">
          {OrderTypeList.map((type) => (
            <div
              key={type.id}
              className={`dropdown-item ${
                orderType === type.name ? "selected" : ""
              }`}
              onClick={() => {
                handleChangeOrderType(type.name);
                setIsOpen(false);
              }}
            >
              {type.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Slider = () => {
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    setValue(Number(e.target.value));
  };

  return (
    <div className="info-block">
      <div className="slider-container">
        <input
          type="range"
          min="0"
          max="100"
          step="25"
          value={value}
          onChange={handleChange}
          className="slider"
        />
        <div className="slider-labels">
          {[1, 2, 3, 4, 5].map((point) => (
            <span key={point} className={value === point ? "active" : ""}>
              <span className="breakline" />
            </span>
          ))}
        </div>
      </div>
      <span className="slider-value">{value} %</span>
    </div>
  );
};

const OrderPad = () => {
  const [orderAction, setOrderAction] = useState("buy");
  const [orderType, setOrderType] = useState("Limit");
  const [price, setPrice] = useState(34.5);
  const [shares, setShares] = useState(1);
  const { setData } = useContext(AppContext);

  const handleChangeOrderAction = (newOrderAction) => {
    setOrderAction(newOrderAction);
  };

  const handleChangeOrderType = (newOrderType) => {
    setOrderType(newOrderType);
  };

  const placeOrder = () => {
    const newOrder = {
      id: Math.floor(Math.random() * 100) + 1,
      team: "CSK",
      orderType: orderType,
      orderAction: orderAction,
      transactionDate: getFormattedDate(new Date()),
      price: price * shares,
      filled: 0.0,
      amount: price,
      changeInPercent: 0,
      state: "open",
    };

    setShares(1);

    setData((prevData) => ({
      ...prevData,
      orders: {
        ...prevData.orders,
        openOrders: [...prevData.orders.openOrders, newOrder], // new array reference
      },
    }));
  };

  return (
    <div className="order-pad">
      <OrderAction
        orderAction={orderAction}
        handleChangeOrderAction={handleChangeOrderAction}
      />
      <Dropdown
        orderType={orderType}
        handleChangeOrderType={handleChangeOrderType}
      />

      <div className="trade-info">
        <div className="info-block">
          <span style={{ textDecoration: "underline" }}>
            Available to Trade
          </span>
          <span>0.00 USDC</span>
        </div>
        <div className="info-block-box">
          <span>Price (USD)</span>
          <span className="value">
            <input
              value={price}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              onChange={(e) => {
                if (orderType === "Market") return;
                setPrice(e.target.value);
              }}
              className="price-input"
            />
            <span className="mid">MID</span>
          </span>
        </div>
        <div className="info-block-box">
          <span>Shares</span>
          <input
            value={shares || 0}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={(e) => setShares(e.target.value)}
            className="price-input"
          />
        </div>

        <Slider />

        <div className="separator" />
        <div className="info-block">
          <span>Order Total</span>
          <span>${price * shares || 0}</span>
        </div>
        <div className="info-block">
          <span>To Win 💵</span>
          <span>$0</span>
        </div>
      </div>

      <div className="orderBtn" onClick={placeOrder}>
        {orderAction === "buy" ? "BUY/LONG CSK" : "SELL/SHORT CSK"}
      </div>
    </div>
  );
};

export default OrderPad;
