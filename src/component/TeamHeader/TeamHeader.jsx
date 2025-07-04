import React from "react";
import BarChart from "../../assets/BarChart.svg";
import "./TeamHeader.css";

const TeamHeader = ({
  teamName,
  teamIcon,
  volume,
  currentPrice,
  changeInPrice,
}) => {
  return (
    <div className="teamHeader">
      <div>
        <img src={teamIcon} alt="team-icon" className="teamIcon" />
        <div className="teamInfo">
          <span>{teamName}</span>
          <span>${volume}M Vol.</span>
        </div>
      </div>
      <div className="priceInfo">
        <div className="price">
          <span>{currentPrice}¢</span>
          <span className={changeInPrice >= 0 ? "green" : "red"}>
            {changeInPrice}%
          </span>
        </div>
        <img src={BarChart} alt="chart" width="36px" height="36px" />
      </div>
    </div>
  );
};

export default TeamHeader;
