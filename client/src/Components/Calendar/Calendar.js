import React, { Component } from "react";
import { connect } from "react-redux";
import { subMonths, addMonths } from "date-fns";

import Days from "../Days/Days";
import Header from "../Header/Header";
import Cells from "../Cells/Cells";

import { chnageDisplayedMonth } from "../../actions/actions";

import "./Calendar.css";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date()
    };
  }

  // Navigating months: forward and backwards
  clickToNavMonths = direction => {
    const displayedMonth = new Date(this.props.displayedMonth);
    let newMonth;

    switch (direction) {
      case "prev":
        newMonth = subMonths(displayedMonth, 1);
        break;
      case "next":
        newMonth = addMonths(displayedMonth, 1);
        break;
      default:
        newMonth = displayedMonth;
    }
    this.props.changeMonth(newMonth);
  };

  render() {
    return (
      <div id="calendar-board">
        <Header className="calendar-header" navMonth={this.clickToNavMonths} />
        <Days />
        <Cells className="calendar-cells" />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeMonth: month => dispatch(chnageDisplayedMonth(month))
  };
};

const mapStateToProps = state => {
  return {
    displayedMonth: state.displayedMonthReducer.displayedMonth,
    today: state.todayReducer.today
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
