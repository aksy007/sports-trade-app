import React, { act, useContext, useEffect, useState } from "react";
import "./Orders.css";
import { AppContext } from "../../context/AppContext";

const OrderNavList = [
  {
    id: 1,
    name: "OPEN ORDERS",
    value: "open",
  },
  {
    id: 2,
    name: "POSITIONS",
    value: "positions",
  },
  {
    id: 3,
    name: "TRADE HISTORY",
    value: "history",
  },
];

// Return order List for provided active nav
const getOrdersByNav = (orders, activeOrderNav) => {
  if (activeOrderNav === 1) return orders?.openOrders || [];
  if (activeOrderNav === 2) return orders?.positionOrders || [];
  if (activeOrderNav === 3) return orders?.history || [];
  return [];
};

const OrderNav = ({ activeOrderNav, setActiveOrderNav }) => {
  return (
    <div className="order-nav">
      {OrderNavList?.map((nav) => (
        <div
          key={nav.id}
          className={activeOrderNav === nav.id ? "active-nav" : ""}
          onClick={() => setActiveOrderNav(nav.id)}
        >
          {nav.name}
        </div>
      ))}
    </div>
  );
};

const Order = ({ order, orders, setData, activeOrderNav }) => {
  const cancelOrder = (orderId) => {
    const orderList = getOrdersByNav(orders, activeOrderNav);

    // Find the order to cancel
    const orderToCancel = orderList.find((order) => order.id === orderId);
    if (!orderToCancel) return; // If not found, exit

    // Create new lists immutably
    const updatedOrderList = orderList.filter((order) => order.id !== orderId);
    const updatedHistory = [...orders.history, orderToCancel];

    // Update context based on activeOrderNav
    setData((prevData) => ({
      ...prevData,
      orders: {
        ...prevData.orders,
        openOrders:
          activeOrderNav === 1 ? updatedOrderList : prevData.orders.openOrders,
        positionOrders:
          activeOrderNav === 2
            ? updatedOrderList
            : prevData.orders.positionOrders,
        history: updatedHistory,
      },
    }));
  };

  return (
    <div key={order.id}>
      <div className="order-heading">
        <div>
          <span className="team-name">{order.team}</span>
          <div className="order-txn-data">
            <span
              className={
                order?.orderAction === "Buy"
                  ? "order-action"
                  : "sell-order order-action"
              }
            >
              {order.orderType} / {order.orderAction}
            </span>
            <span className="order-date">{order.transactionDate}</span>
          </div>
        </div>
        <div className="order-action-info">
          <div>
            <span className="order-percentage">{order.changeInPercent}%</span>
            <span className="percentage-slider" />
          </div>
          {activeOrderNav !== 3 && (
            <div className="cancel-order" onClick={() => cancelOrder(order.id)}>
              Cancel
            </div>
          )}
        </div>
      </div>
      <div className="order-price-data">
        <div>
          <span>Filled / Amount</span>
          <span>
            {order.filled} / {order.amount}
          </span>
        </div>
        <div>
          <span>Price</span>
          <span>{order.price}¢</span>
        </div>
      </div>
    </div>
  );
};

const OrdersList = ({ activeOrderNav }) => {
  const {
    data: { orders },
    setData,
  } = useContext(AppContext);

  const orderList = getOrdersByNav(orders, activeOrderNav);

  if (!orderList.length) return null;

  if (!orderList?.length) {
    return "";
  }

  return (
    <div>
      {orderList.map((order) => {
        return (
          <Order
            key={order.id}
            order={order}
            orders={orders}
            setData={setData}
            activeOrderNav={activeOrderNav}
          />
        );
      })}
    </div>
  );
};

const Orders = () => {
  const [activeOrderNav, setActiveOrderNav] = useState(OrderNavList[0].id);
  const {
    data: { orders },
    setData,
  } = useContext(AppContext);

  const handleCancelAllOrders = () => {
    const updatedOrders = orders.openOrders || [];
    setData((prevData) => ({
      ...prevData,
      orders: {
        ...prevData.orders,
        openOrders: [],
        history: [...prevData.orders.history, ...updatedOrders],
      },
    }));
  };

  return (
    <div className="orders">
      <OrderNav
        activeOrderNav={activeOrderNav}
        setActiveOrderNav={setActiveOrderNav}
      />

      <div className="hide-pairs">
        <div>
          <input type="checkbox" className="chekbox" name="hide-pairs" />
          <label htmlFor="hide-pairs" className="checkbox-label">
            Hide Other Pairs
          </label>
        </div>
        <div className="cancel-all" onClick={handleCancelAllOrders}>
          Cancel All
        </div>
      </div>

      <OrdersList activeOrderNav={activeOrderNav} />
    </div>
  );
};

export default Orders;
