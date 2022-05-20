import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider, 
    createUserWithEmailAndPassword
} from 'firebase/auth';

// Import methods from firestore
import {
    // Istantiate firestore instance
    getFirestore,
    doc, //allows us to retrieve documents inside our firestore database
    getDoc, //gettting document data
    setDoc //setting document data
} from 'firebase/firestore'

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAiLRzpF6q_YYpc13ub9TQQGbvbZIC6lSg",
    authDomain: "crwn-clothing-db-be7da.firebaseapp.com",
    projectId: "crwn-clothing-db-be7da",
    storageBucket: "crwn-clothing-db-be7da.appspot.com",
    messagingSenderId: "1027443210242",
    appId: "1:1027443210242:web:7b9369017c04232e5b8f1b"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

//  Iniialize a provider 
  const provider = new GoogleAuthProvider(); //GoogleAuthProvider is a class that we get from firebase authentication
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => {
    return signInWithPopup(auth, provider);
  };

//  Instance to get or set data to our document 
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
    ) => {
    if(!userAuth) return; //protecting code

    const userDocRef = doc(db, 'user', userAuth.uid); //doc parameters are db, collection, identifier
    console.log(userDocRef);

    // check whether or not there's an intance of it that exists inside o a database
    const userSnapshot = await getDoc(userDocRef);

    // if user data does not exists
    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { //setdoc to the db
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        }catch (error){
            console.log('error creating user', error.message);
        }
    }

    // if user data exists
    return userDocRef;
  };

  // Create user with email
  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return createUserWithEmailAndPassword(auth, email, password);
  }