import React from "react";
import "./OrderBook.css";

const OrderBook = () => {
  // Data for sell orders (displayed in red)
  const sellOrders = [
    { price: "38¢", shares: "14,984.00", fillWidth: "109px" },
    { price: "37¢", shares: "14,984.00", fillWidth: "99px" },
    { price: "36¢", shares: "14,984.00", fillWidth: "88px" },
    { price: "35.6¢", shares: "14,984.00", fillWidth: "68px" },
    { price: "35¢", shares: "14,984.00", fillWidth: "58px" },
  ];

  // Data for buy orders (displayed in green)
  const buyOrders = [
    { price: "34¢", shares: "14,984.00", fillWidth: "0px" },
    { price: "33.5¢", shares: "14,984.00", fillWidth: "29px" },
    { price: "33.4¢", shares: "14,984.00", fillWidth: "50px" },
    { price: "32¢", shares: "14,984.00", fillWidth: "76px" },
    { price: "30¢", shares: "14,984.00", fillWidth: "109px" },
  ];

  return (
    <div className="order-book-container">
      <div className="order-book-header">
        <div className="order-book-header-text">Price</div>
        <div className="order-book-header-text right">Shares (CSK)</div>
      </div>

      <div className="sell-orders-section">
        {sellOrders.map((order, index) => (
          <div key={`sell-${index}`} className="order-row">
            <div
              className="order-fill-background sell"
              style={{ width: order.fillWidth }}
            />
            <div className="order-content">
              <div className="order-price">{order.price}</div>
              <div className="order-shares">{order.shares}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="current-price-section">
        <div className="current-price">34.5¢</div>
        <div className="spread-text">(Spread 1%)</div>
      </div>

      <div className="buy-orders-section">
        {buyOrders.map((order, index) => (
          <div key={`buy-${index}`} className="order-row">
            {order.fillWidth !== "0px" && (
              <div
                className="order-fill-background buy"
                style={{ width: order.fillWidth }}
              />
            )}
            <div className="order-content">
              <div className="order-price">{order.price}</div>
              <div className="order-shares">{order.shares}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderBook;
