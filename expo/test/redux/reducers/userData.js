import { SET_USER_DATA } from "../actions/userData";

export default function userData(state = {}, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return action.data;
    default:
      return state;
  }
}
