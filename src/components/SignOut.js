import React from 'react'

import Button from '@material-ui/core/Button';

import firebase from 'firebase/app';

const SignOut = () => {

    const auth = firebase.auth();

    return (
        auth.currentUser &&
            <Button variant="contained" color="primary" className="sign-out" onClick={() => auth.signOut()}>Sign Out</Button>
    )
}

export default SignOut;
