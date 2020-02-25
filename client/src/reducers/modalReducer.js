import { OPEN_MODAL, CLOSE_MODAL } from "../actions/action-types";

const initialState = {
  isOpened: false
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_MODAL:
      console.log("Modal reducer close " + action.type);
      return {
        isOpened: false
      };
    case OPEN_MODAL:
      console.log("Modal reducer open " + action.type);
      return {
        isOpened: true
      };
    default:
      return state;
  }
};

export default modalReducer;
