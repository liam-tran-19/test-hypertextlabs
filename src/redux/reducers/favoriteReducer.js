import { ADD_FAVORITE, REMOVE_FAVORITE } from "../actions/types";

const initialState = {
  favorite: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        favorite: [...state.favorite, action.payload],
      };

    case REMOVE_FAVORITE:
      return {
        ...state,
        favorite: state.favorite.filter(
          (item) => item.photo !== action.payload.photo
        ),
      };
    default:
      return state;
  }
}
