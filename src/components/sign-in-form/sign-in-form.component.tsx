import { useState, FormEvent, ChangeEvent } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { 
    signInWithGooglePopup,
    signAuthInWithEmailAndPassword
} from "../../utils/firebase/firebase.utills";

import { SignInContainer, ButtonsContainer} from './sign-in.styles';

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    
    // clean inputs
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
      };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try {
            await signAuthInWithEmailAndPassword(email, password);
            resetFormFields();
        }catch(error){
            switch(error){
                case 'auth/wrong-password':
                    alert('incorrect password or email')
                    break
                case 'auth/user-not-found':
                    alert('no user associater with this email')
                    break
                default:
                    console.log(error);
            }
        }
    };
    
    // function that takes the input event whenever the text changes
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target; //event.target give us the input
        // ... spread all the fields 
        setFormFields({...formFields, [name]: value });
    }

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={ handleSubmit }>
                <FormInput 
                    label="Email"
                    type="email" 
                    required onChange={handleChange} 
                    name="email" 
                    value={email}
                />

                <FormInput 
                    label="Password"
                    type="password" 
                    required onChange={handleChange} 
                    name="password" value={password}
                />
                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button 
                    buttonType={BUTTON_TYPE_CLASSES.google} 
                    type='button' onClick={signInWithGoogle}
                    >
                        Google sign in
                    </Button> 
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;