import React from "react";

import "./MonthCell.css";

// Comp' which is a singular square inside of the calendar
const MonthCell = props => {
  // For clicking a certain day of the month.
  const clickHandler = ({ target }) => {
    props.clicked(props.date);
  };
  //  ${props.isClicked}
  return (
    <div
      className={`day${props.isDisabled}${props.isToday}`}
      onClick={clickHandler}
      id={props.date}
    >
      <span className="date-container">
        <div className={`date-background${props.isClicked}`}>{props.day}</div>
      </span>
    </div>
  );
};

export default MonthCell;
