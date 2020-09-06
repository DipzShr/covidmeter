import { types as ACTIONS } from "../actions/dateData";

const INITIAL_STATE = {
  date: '',
  data: [],
}

const dateData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.STORE:
      return {
        ...state,
        data: action.data,
      }
    case ACTIONS.CHANGE_DATE:
      return {
        ...state,
        date: action.date,
      }
    default:
    return state
  }
};

export default dateData
