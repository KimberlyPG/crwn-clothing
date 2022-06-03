// import { createContext,  useEffect, useReducer } from "react";
// import {createAction} from '../utils/reducer/reducer.utils';
// import { 
//     onAuthStateChangedListener,
//     createUserDocumentFromAuth 
// } from "../utils/firebase/firebase.utills";

// // as the actual value i want to access
// export const UserContext = createContext ({
//     currentUser: null,
//     setCurrentUser: () => null
// });

// const USER_ACTION_TYPES = {
//     SET_CURRENT_USER: 'SET_CURRENT_USER'
// };

// const INITIAL_STATE = {
//     currentUser: null
// };

// const userReducer = (state, action) => {
//     console.log('dispatched');
//     console.log(action);
//     const {type, payload} = action;

//     switch(type) {
//         case USER_ACTION_TYPES.SET_CURRENT_USER:
//             return{
//                 ...state,
//                 currentUser: payload
//             }
//         default: 
//         throw new Error(`unhandled type of ${type} in cartReducer`);
//     }
// };

// export const UserProvider = ( {children} ) => {
//     const [{ currentUser }, dispatch] = useReducer(userReducer,  INITIAL_STATE);
//     console.log(currentUser);

//     const setCurrentUser = (user) => {
//         dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER,user));
//     };

//     const value = { currentUser, setCurrentUser };

//     // Centralize the sign in and sign out into this callback
//     useEffect(() => {
//         const unsubcribe = onAuthStateChangedListener((user) => {
//             // console.log("userlistener", user);
//             if(user) {
//                 createUserDocumentFromAuth(user);
//             }
//             setCurrentUser(user); //if user sign in we store the object, if user sign out we store null
//         });
        
//         return unsubcribe
//     }, []);
    
//     return <UserContext.Provider value={value}>{children}</UserContext.Provider>
// }