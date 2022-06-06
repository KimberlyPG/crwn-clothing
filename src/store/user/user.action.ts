import USER_ACTION_TYPES from './user.types';
import { createAction, withMatcher, ActionWithPayload } from '../../utils/reducer/reducer.utils';
import { UserData } from '../../utils/firebase/firebase.utills';

export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, UserData>;

export const setCurrentUser = withMatcher((user: UserData): SetCurrentUser => 
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
