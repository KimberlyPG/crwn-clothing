import { createSelector } from "reselect";
import { RootState } from "../store";
import { UserState } from './user.reducer';

// select state and return the value of currentuser
export const selectUserReducer = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
    selectUserReducer,
    (user) => user.currentUser
);