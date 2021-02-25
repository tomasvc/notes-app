import React from 'react'

import Button from '@material-ui/core/Button';

import firebase from 'firebase/app';

const SignIn = () => {

    
    const auth = firebase.auth();

    const signIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider); 
      }

    return (
        <div>
            <Button variant="contained" color="primary" className="sign-in" onClick={signIn}>Sign In With Google</Button>
        </div>
    )
}

export default SignIn;