import { types as ACTIONS } from "../actions/countryData";

const INITIAL_STATE = []

const countryData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.STORE:
      return action.data
    default:
    return state
  }
};

export default countryData
