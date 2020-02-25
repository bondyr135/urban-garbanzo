import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "./Header.css";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

// Comp' holding the name of the current month and navigating buttons
const Header = props => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // Gets the month and the year that should be presented from reducer
  //  andsetts them in the local state
  useEffect(() => {
    setMonth(props.displayedMonth.getMonth());
    setYear(props.displayedMonth.getFullYear());
  }, [props.displayedMonth]);

  return (
    <div className="calendar_header">
      <i className="month_nav prev" onClick={props.click}>
        prev
      </i>

      {`${MONTHS[month]} ${year}`}

      <i className="month_nav next" onClick={props.click}>
        next
      </i>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    displayedMonth: state.displayedMonthReducer.displayedMonth
  };
};

export default connect(mapStateToProps)(Header);
