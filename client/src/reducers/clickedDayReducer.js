const initialState = {
  clickedDay: null
};

/////////////////////////////////////////
//
//            NOTE:
//
// date in the format of: "MMM/dd/yyyy"
//
/////////////////////////////////////////

const clickedDayReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_CLICKED_DAY":
      return {
        clickedDay: action.payload
      };

    default:
      return state;
  }
};

export default clickedDayReducer;
