import { 
  signInWithGooglePopup, 
  signInWithGoogleRedirect,
  createUserDocumentFromAuth 
} from '../../utils/firebase/firebase.utills'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
 
// Log in signin with google account
  const SignIn = () => {
 
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

    return ( 
      <div>
          <h1>Sign In Page</h1>
          <button onClick={logGoogleUser}>
            Sign in with Google Popup
          </button>
          <SignUpForm />
      </div>  
    );
};

//  Using firebase API

export default SignIn;