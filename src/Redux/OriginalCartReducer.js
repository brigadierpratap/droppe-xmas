import * as ActionTypes from "./ActionTypes";

export const OriginalCartsReducer = (
  state = {
    info: [],
  },
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.ADD_CARTS:
      return { info: payload };
    default:
      return state;
  }
};
