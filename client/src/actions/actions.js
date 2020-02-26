import * as actions from "./action-types";

////////////// CHOSEN DAY ACTION
export const changeClickedDay = payload => {
  return {
    type: actions.CHANGE_CLICKED_DAY,
    payload
  };
};

/////////////// DISPLAYED MONTH ACTION
export const chnageDisplayedMonth = payload => {
  /////////////////////
  //   payload  in the form of Jan/29/2020
  /////////////////////
  return {
    type: actions.CHANGE_DISPLAYED_MONTH,
    payload
  };
};

///////////// TODAY ACTION
export const setTodayDate = payload => {
  return {
    type: actions.SET_TODAY_DATE,
    payload
  };
};

/////////////// APPENDING NEW EVENT TO LIST
export const appendToList = payload => {
  return {
    type: actions.APPEND_TO_LIST,
    payload
  };
};
