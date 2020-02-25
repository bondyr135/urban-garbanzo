import { SET_TODAY_DATE } from "../actions/action-types";

const initialState = {
  today: new Date()
};

const todayReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODAY_DATE:
      return {
        today: action.payload
      };
    default:
      return state;
  }
};

export default todayReducer;
