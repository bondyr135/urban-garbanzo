import React from "react";
import {
  endOfMonth,
  startOfMonth,
  format,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  addDays
} from "date-fns";
import { connect } from "react-redux";

import MonthCell from "../MonthCell/MonthCell";
import * as actions from "../../actions/actions";

import "./Cells.css";

// Comp' that is the grid itself, of the current month
const Cells = props => {
  ////////////////////////
  const renderDays = () => {
    // pivot is the day from which the entire rest of the month will be rendered
    // this is actually the fiirst day of the displayed month
    const pivot = props.displayedMonth;

    const startMonth = startOfMonth(pivot); // the first day of the current month
    const endMonth = endOfMonth(startMonth); // last day of the current month
    const startDate = startOfWeek(startMonth); // first day of the current month's grid (not necessary this month)
    const endDate = endOfWeek(endMonth); // last day to be rendered in the current grid

    let rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    const dateFormat = "d";

    /// Creating the month's grid itself
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const isDisabled = !isSameMonth(day, startMonth) ? " disabled" : "";
        const isClicked =
          props.clickedDay === format(day, "MMM/dd/yyyy") ? " clicked" : "";
        const isToday =
          format(day, "MMM/dd/yyyy") === format(props.today, "MMM/dd/yyyy")
            ? " its_today"
            : "";
        formattedDate = format(day, dateFormat);
        days.push(
          <MonthCell
            key={day}
            day={formattedDate}
            isDisabled={isDisabled}
            date={format(day, "MMM/dd/yyyy")}
            isToday={isToday}
            isClicked={isClicked}
            clicked={date => clickHandler(date)}
          />
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    /////
    return <div>{rows}</div>;
  };

  /// For choosing a date
  const clickHandler = date => {
    // Checks whether to nullify the 'clickedDay': double-click === no click
    const clicked = props.clickedDay === date ? "" : date;
    props.changeClickedDay(clicked);

    // Checks whether to change 'displayedmonth'
    const clickedMonth = new Date(date).getMonth();
    if (clickedMonth !== props.displayedMonth.getMonth()) {
      props.changeDisplayedMonth(date);
    }
  };

  return <div className="calendar_cells">{renderDays()}</div>;
};

const mapStateToProps = state => {
  return {
    today: state.todayReducer.today,
    clickedDay: state.clickedDayReducer.clickedDay,
    displayedMonth: state.displayedMonthReducer.displayedMonth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeClickedDay: id => dispatch(actions.changeClickedDay(id)),
    changeDisplayedMonth: month => dispatch(actions.chnageDisplayedMonth(month))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cells);
