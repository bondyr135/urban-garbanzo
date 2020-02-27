import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { appendToList } from "../../actions/actions";

import "./EventInput.css";

// Comp' that holds input fields for a new Event
const EventInput = props => {
  // state
  const [text, setText] = useState("");
  const [time, setTime] = useState("");

  // Clearing any input may be held
  const clickToClear = e => {
    if (e) e.preventDefault();
    setText("");
    setTime("");
  };

  // Change hendlers for any input element
  const clientWriting = ({ target: { value } }) => {
    setText(value);
  };
  const choosingTime = ({ target: { value } }) => {
    setTime(value);
  };

  ///// Writing new event into server.  MODEL:
  ///// title: String
  ///// date: String
  ///// month: Number
  ///// year: Number
  const submittingEvent = () => {
    const chosenDate = new Date("" + props.clickedDay + " " + time);
    const data = {
      title: text,
      date: chosenDate,
      month: chosenDate.getMonth(),
      year: chosenDate.getFullYear()
    };

    axios
      .post("/api/save", data)
      .then(res => {
        // CHANGING STATE IN REDUCER:
        // MOTIVATION: not calling again for the entire list, since all items but one are in local state.
        // INSTEAD: changing list in both server And in local state => appendToList()
        props.appendToList(res.data);
        clickToClear();
      })
      .catch(err => {
        console.log(err.message);
        alert(
          "Something went wrong while trying to save the event to the server. \n Make sure your internet connection is good."
        );
      });
  };

  return (
    <div className="event_input_container">
      <h3 className="list_header">
        Add an event {props.clickedDay ? props.clickedDay : "for..."}
      </h3>
      <textarea
        className="event_input"
        placeholder="What do you need to remember?"
        onChange={clientWriting}
        value={text}
        maxLength="55"
      ></textarea>
      <div className="time_div">
        <label htmlFor="event_hour">Select event's time:</label>
        <input
          type="time"
          id="event_hour"
          name="event_hour"
          step="900"
          value={time}
          onChange={choosingTime}
        ></input>
      </div>
      <div className="both_btns">
        <button
          className="event_input_btn"
          disabled={!props.clickedDay || !text || !time}
          onClick={submittingEvent}
        >
          Add Event
        </button>
        <button
          onClick={clickToClear}
          className="clear_input"
          disabled={!text && !time}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    clickedDay: state.clickedDayReducer.clickedDay
  };
};

const mapDispatchToProps = dispatch => {
  return {
    appendToList: data => dispatch(appendToList(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventInput);
