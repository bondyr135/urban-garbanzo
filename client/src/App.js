import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Calendar from "./Components/Calendar/Calendar";
import EventInput from "./Components/EventInput/EventInput";
import EventList from "./Components/EventList/EventList";
import ModalComponent from "./Components/ModalComponent/ModalComponent";

import "./App.css";

class App extends Component {
  // This function is for slowly, randomly, delete events from the DB
  componentDidMount() {
    const randomMonthToDelete = Math.floor(Math.random() * 36);

    axios
      .delete(`/api/delete_whole_month/${randomMonthToDelete}`)
      .then(res => {
        console.log(`The month of ${randomMonthToDelete} was deleted`);
      })
      .catch(err => {
        alert("You database may full-up soon.");
      });
  }

  render() {
    return (
      <div id="App">
        <main className="main_part">
          <Calendar />
        </main>
        <ModalComponent />
        <div className="side_part">
          <EventInput append={this.appendToList} />
          <EventList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    displayedMonth: state.displayedMonthReducer.displayedMonth
  };
};

export default connect(mapStateToProps)(App);
