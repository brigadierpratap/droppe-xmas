import * as ActionTypes from "./ActionTypes";

export const addCarts = data => dispatch => {
  dispatch(addCartsToStore(data));
};
const addCartsToStore = data => ({
  type: ActionTypes.ADD_CARTS,
  payload: data,
});

export const addFinalCarts = data => dispatch => {
  dispatch(addFinalCartsToStore(data));
};
const addFinalCartsToStore = data => ({
  type: ActionTypes.ADD_FINAL_CARTS,
  payload: data,
});

export const sortFinalCart = data => dispatch => {
  dispatch(sortFinalCartFunc(data));
};
const sortFinalCartFunc = data => {
  var res = data;
  res.sort(compare);
  return {
    type: ActionTypes.SORT_FINAL_CARTS,
    payload: res,
  };
};
function compare(a, b) {
  if (a.id < b.id) {
    return -1;
  }
  if (a.id > b.id) {
    return 1;
  }
  return 0;
}
