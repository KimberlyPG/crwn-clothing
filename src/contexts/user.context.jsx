import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener,createUserDocumentFromAuth } from "../utils/firebase/firebase.utills";

// as the actual value i want to access
export const UserContext = createContext ({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserProvider = ( {children} ) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    // Centralize the sign in and sign out into this callback
    useEffect(() => {
        const unsubcribe = onAuthStateChangedListener((user) => {
            // console.log("userlistener", user);
            if(user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user); //if user sign in we store the object, if user sign out we store null
        });
        
        return unsubcribe
    }, []);
    
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}