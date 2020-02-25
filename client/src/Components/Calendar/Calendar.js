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
    this.clickToNavMonths = this.clickToNavMonths.bind(this);
  }

  // Navigating months: forward and backwards
  clickToNavMonths({ target: { className } }) {
    const classAsArray = className.split(" ")[1];
    const displayedMonth = new Date(this.props.displayedMonth);
    let newMonth;

    switch (classAsArray) {
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
  }

  render() {
    return (
      <div id="calendar_board">
        <Header className="calendar_header" click={this.clickToNavMonths} />
        <Days />
        <Cells className="calendar_cells" />
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
