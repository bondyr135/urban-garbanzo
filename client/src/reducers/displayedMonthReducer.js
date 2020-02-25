// Making state to hold a Date instead of a Number
const initialState = {
  displayedMonth: new Date(new Date().setDate(1))
};

const displayedMonthReducer = (state = initialState, action) => {
  // payload in the form of 'MMM/dd/yyyy' || 'Jan/31/2020'

  switch (action.type) {
    case "CHANGE_DISPLAYED_MONTH":
      const month = new Date(action.payload);
      state.displayedMonth.setMonth(month);

      return {
        displayedMonth: month
      };
    default:
      return state;
  }
};

export default displayedMonthReducer;
