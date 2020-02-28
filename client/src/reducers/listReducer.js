import { APPEND_TO_LIST } from "../actions/action-types";

const initialState = {
  appendable: []
};

// Hold a single event, the newest:
// if the event was saved to server- holds it here instead of making another call to the server;
// appending it LOCALLY to the list

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPEND_TO_LIST:
      return {
        appendable: action.payload
      };
    default:
      return state;
  }
};

export default listReducer;
