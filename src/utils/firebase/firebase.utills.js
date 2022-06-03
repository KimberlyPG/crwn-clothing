import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

// Import methods from firestore
import {
    // Istantiate firestore instance
    getFirestore,
    doc, //allows us to retrieve documents inside our firestore database
    getDoc, //gettting document data
    setDoc, //setting document data
    collection,
    writeBatch,
    query,
    getDocs
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

//  Initialize a provider 
  const provider = new GoogleAuthProvider(); //GoogleAuthProvider is a class that we get from firebase authentication
  
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  
  export const signInWithGooglePopup = () => {
    return signInWithPopup(auth, provider);
  };
  export const signInWithGoogleRedirect = () => {
    signInWithRedirect(auth, provider);
  }

  //  Instance to get or set data to our document 
  export const db = getFirestore();

  // Add collection and documents to firestore
  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db); //batch instance

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    })

    await batch.commit();
    console.log('done');
  }

  // get collection from firestore
  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
  };

  export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
    ) => {
    if(!userAuth) return; //protecting code
 
    const userDocRef = doc(db, 'user', userAuth.uid); //doc parameters are db, collection, identifier

    // check whether or not there's an intance of it that exists inside o a database
    const userSnapshot = await getDoc(userDocRef);

    // if user data does not exists
    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        // const useremail = userAuth.email
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { //setdoc to the db
                ...additionalInformation,
                displayName,
                email,
                createdAt,
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
  };

  export const signAuthInWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return signInWithEmailAndPassword(auth, email, password);
  };

  // sign out function 
  export const signOutUser = async () => await signOut(auth);

  // Function to catch when a user signs in or signs out
  export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback) //when a user sign in this listener register the new user and the callback run and console log the user instance
  }
  
  