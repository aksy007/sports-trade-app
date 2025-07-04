import React from "react";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import TradeInfo from "../../component/TradeInfo/TradeInfo";
import Orders from "../../component/Orders/Orders";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <div style={{ overflowY: "scroll" }}>
        <TradeInfo />
        <Orders />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
