import { combineReducers } from "redux";

import todayReducer from "./todayReduce";
import clickedDayReducer from "./clickedDayReducer";
import displayedMonthReducer from "./displayedMonthReducer";
import appendReducer from "./appendReducer";

/////////////////////////
// today: Date
// click: String 'MM/dd/yyyy' (month as name) => => can be passed to new Date
// displayedMonth: Number
/////////////////////////

export default combineReducers({
  todayReducer,
  clickedDayReducer,
  displayedMonthReducer,
  appendReducer
});
