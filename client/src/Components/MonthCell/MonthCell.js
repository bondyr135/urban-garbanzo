import React from "react";

import "./MonthCell.css";

// Comp' which is a singular square inside of the calendar
const MonthCell = props => {
  // For clicking a certain day of the month.
  const clickHandler = ({ target }) => {
    props.clicked(props.date);
  };
  return (
    <div
      className={`day${props.isDisabled} ${props.clicked}${props.isToday}`}
      onClick={clickHandler}
      id={props.date}
    >
      <span className="date_container" onClick={props.onClick}>
        <div
          className={`date_background${props.isClicked}`}
          onClick={props.onClick}
        >
          {props.day}
        </div>
      </span>
    </div>
  );
};

export default MonthCell;
