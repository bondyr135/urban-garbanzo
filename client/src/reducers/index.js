import { combineReducers } from "redux";

import todayReducer from "./todayReduce";
import clickedDayReducer from "./clickedDayReducer";
import displayedMonthReducer from "./displayedMonthReducer";
import listReducer from "./listReducer";
import modalReducer from "./modalReducer";

/////////////////////////
// today: Date
// click: String 'MM/dd/yyyy' (month as name) => => can be passed to new Date
// displayedMonth: Number
/////////////////////////

export default combineReducers({
  todayReducer,
  clickedDayReducer,
  displayedMonthReducer,
  listReducer,
  modalReducer
});
