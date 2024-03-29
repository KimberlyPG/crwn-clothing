import { useState, FormEvent, ChangeEvent } from "react";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { createAuthUserWithEmailAndPassword
    , createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utills";

import { SignUpContainer } from './sign-up.styles';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};


const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields;

    
    // clean inputs
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if(password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        try {
            const usuario  = await createAuthUserWithEmailAndPassword(
                email, 
                password
            );
        const userAuth = usuario?.user;
  
        await createUserDocumentFromAuth(userAuth!, {displayName});
        resetFormFields();
        }catch(error){
            if((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert('Cannot create user, email already in use');
            }
            console.log('user creation encountered an error', error);
        }
    };
    
    // function that takes the input event whenever the text changes
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target; //event.target give us the input
        
        // ... spread all the fields 
        setFormFields({...formFields, [name]: value });
    };

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={ handleSubmit }>
                <FormInput 
                    label="Display Name"
                    type="text" 
                    required onChange={handleChange} 
                    name="displayName" 
                    value={displayName}
                />

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

                <FormInput 
                    label="Confirm Password"
                    type="password" 
                    required onChange={handleChange} 
                    name="confirmPassword"
                    value={confirmPassword}
                />
                <Button type='submit'>Sign Up</Button>
            </form>
        </SignUpContainer>
    );
};

export default SignUpForm;