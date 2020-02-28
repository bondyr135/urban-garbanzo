import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { format, isBefore } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import "./EventList.css";

// Comp' which is the list of events of occuring
// on this displayedMonth, retrieved from server
const EventList = props => {
  /////////////  STATE
  const [listOfEvents, setListOfEvents] = useState([]);
  const [todayAsDate] = useState(props.today);

  // Aux sorting function
  const sortingFunc = toSort => {
    return toSort
      .map(el => {
        return { ...el, date: new Date(el.date) };
      })
      .sort((a, b) => a.date - b.date);
  };

  // Calling the API for this month's Events
  const renderList = () => {
    const month = props.displayedMonth.getMonth();
    const year = props.displayedMonth.getFullYear();
    axios
      .get(`/api/get_events_by_month/${year}/${month}`)
      .then(({ data }) => sortingFunc([...data]))
      .then(sorted => {
        setListOfEvents(sorted);
      })
      .catch(err => {
        alert(
          "We couldn't fetch the Events for the current month. This is usually a network error, make sure your connection is working."
        );
      });
  };

  // Func for deleteing a chosen Event, from local list IF deleting from server was succesfull
  // Motivation: avoiding a redundant call to server for retrieving an already-held list
  const deleteEvent = ({ target }) => {
    const id = target.parentElement.parentElement.parentElement.id;
    const ans = window.confirm("Are you sure you want to delete this event?");
    if (ans) {
      axios
        .delete(`/api/delete/${id}`)
        .then(res => {
          // Deleting locally only is deleteing from server was success
          const filteredList = listOfEvents.filter(e => e._id !== id);
          setListOfEvents(filteredList);
        })
        .catch(err => {
          alert(
            "For some reason the Event you tried to delete was missing from the server. Refresh your browser and try agian."
          );
        });
    }
  };

  // For every change in the displayed month- a new call for list of Events
  useEffect(renderList, [props.displayedMonth]);

  // For when a new event is written, to avoid another call to server
  // Motivation: avoiding a redundant call to server for retrieving an already-held list
  // IMSTEAD: deleting in server, AND locally
  useEffect(() => {
    if (Object.keys(props.appendable).length === 0) return;
    const aux = [...listOfEvents, { ...props.appendable }];
    const sorted = sortingFunc(aux);
    setListOfEvents(sorted);
  }, [props.appendable]);

  // Returns the actual list that will be rendered
  const actualList = () => {
    const eventsAsList = listOfEvents.map(el => {
      const elAsDate = new Date(el.date);
      const isElBefore = isBefore(elAsDate, todayAsDate);
      const elID = el._id;
      let hour = `${elAsDate.getHours()}`;
      hour = hour.padStart(2, "0");
      let minute = `${elAsDate.getMinutes()}`;
      minute = minute.padStart(2, "0");
      return (
        <li key={elAsDate.toISOString()} id={elID} className="list-item">
          <div className="item-date">{format(elAsDate, "MMM/dd/yyyy")}</div>
          <div className="item-time">
            <span className="time">{`${hour} : ${minute}`}</span>
            <FontAwesomeIcon
              className="trash-icon"
              icon={faTrashAlt}
              onClick={deleteEvent}
            />
          </div>
          <div className="item-title">
            {isElBefore && <span className="isOutdated">OUTDATED: </span>}
            {el.title}
          </div>
        </li>
      );
    });
    return eventsAsList;
  };

  return (
    <div className="event-list">
      <div className="presentation">This month's events:</div>
      <div className="retrieved-list-container">
        <ul className="retrieved-list">{actualList()}</ul>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    displayedMonth: state.displayedMonthReducer.displayedMonth,
    today: state.todayReducer.today,
    appendable: state.listReducer.appendable
  };
};

export default connect(mapStateToProps)(EventList);
