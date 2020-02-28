import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";

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

  // onClick={props.click}

  const navMonthForward = e => {
    e.preventDefault();
    props.navMonth("next");
  };

  const navMonthBackward = e => {
    e.preventDefault();
    props.navMonth("prev");
  };

  return (
    <div className="calendar_header">
      <div className="month_nav prev" onClick={navMonthBackward}>
        <span>prev</span>
        <FontAwesomeIcon className="icon prev" icon={faAngleDoubleLeft} />
      </div>

      {`${MONTHS[month]} ${year}`}

      <div className="month_nav next" onClick={navMonthForward}>
        <span>next</span>
        <FontAwesomeIcon className="icon next" icon={faAngleDoubleRight} />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    displayedMonth: state.displayedMonthReducer.displayedMonth
  };
};

export default connect(mapStateToProps)(Header);
