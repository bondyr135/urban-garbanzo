import { APPEND_TO_LIST } from "../actions/action-types";

const initialState = {
  appendable: []
};

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
