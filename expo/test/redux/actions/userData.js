export const SET_USER_DATA = "SET_USER_DATA";

export function set_user_data(data) {
    // console.log('inside set_user_data')
  return {
    type: SET_USER_DATA,
    data: data
  };
}
