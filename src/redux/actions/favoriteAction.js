import { ADD_FAVORITE, REMOVE_FAVORITE } from "./types";

export const addFavorite = (photo, date) => (dispatch) => {
  dispatch({
    type: ADD_FAVORITE,
    payload: { photo: photo, date: date },
  });
};

export const removeFavorite = (photo, date) => (dispatch) => {
  dispatch({
    type: REMOVE_FAVORITE,
    payload: { photo: photo, date: date },
  });
};
