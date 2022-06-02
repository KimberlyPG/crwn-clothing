import { combineReducers } from "redux";
import { userReducer } from './user/user.reducer'
import { categoriesReducer } from "./categories/category.reducer";

export const rootReducer = combineReducers({
    user: userReducer, //state of userReducer
    categories: categoriesReducer,
});