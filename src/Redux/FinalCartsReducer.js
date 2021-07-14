import * as ActionTypes from "./ActionTypes";

export const FinalCartsReducer = (
  state = {
    info: [],
  },
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.ADD_FINAL_CARTS:
      return { info: payload };
    case ActionTypes.SORT_FINAL_CARTS:
      return { info: payload };
    default:
      return state;
  }
};
