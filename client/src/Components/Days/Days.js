import React from "react";

import "./Days.css";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

// Comp' holding the names of the days of the week
const Days = props => {
  return (
    <div className="calendar_days">
      {DAYS.map(day => {
        return (
          <div className="day_of_the_week" key={day}>
            {day}
          </div>
        );
      })}
    </div>
  );
};

export default Days;
