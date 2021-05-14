import { combineReducers } from "redux";
import favoriteReducer from "./favoriteReducer";

const RootReducer = combineReducers({
  favorite: favoriteReducer
});

export default RootReducer
