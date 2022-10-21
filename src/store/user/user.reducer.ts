import { AnyAction } from 'redux';
import { setCurrentUser } from './user.action';
import { UserData } from '../../utils/firebase/firebase.utills';

export type UserState = {
    currentUser: UserData | null;
}

const INITIAL_STATE: UserState = {
    currentUser: null
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {

    if(setCurrentUser.match(action)){
        return{
            ...state, //spread operator
            currentUser: action.payload
        }
    }
    return state;
}