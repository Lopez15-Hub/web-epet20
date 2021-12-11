import { types } from "../types/types"
import { auth, googleAuth } from '../firebase/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
export const start = (email, password) => {
    return async (dispatch) => {

        dispatch(login(email, password))

    }
}

export const signInWithGoogle = () => {


    return async (dispatch) => {
        signInWithPopup(auth, googleAuth)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(token)
                console.log(user.displayName)
                dispatch(login(user.uid, user.displayName, user.email, user.photoURL,))
            }).catch((error) => {
                console.log(error)
            });


    }
}

export const login = (uid, displayName, email, photoURL) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName,
            email,
            photoURL

        }
    }
}