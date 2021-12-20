import { types } from "../types/types"
import { auth, db, googleAuth } from '../firebase/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
export const signIn = (email, password) => {
    return async (dispatch) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {

                const user = userCredential.user;
                const usersRef = doc(db, 'users', user.uid,)
                await dispatch(login(user.uid, user.displayName, user.email, user.photoURL));
                console.log(user.displayName);
                await getDoc(usersRef).then(async (doc) => {
                    console.log(doc.data());
                })
            })
            .catch((error) => {
                console.log(error);
            });


    }
}
export const logOut = () => {
    return async (dispatch) => {
        auth.signOut()
            .then(() => {
                console.log("Sesión cerrada.");
            })
            .catch((error) => {
                console.log(error);
            });
    }
}


export const signUp = (email, password, nombre, apellido) => {

    return async (dispatch) => {
        try {
            createUserWithEmailAndPassword(auth, email, password).then(async ({ user }) => {
                const usersRef = doc(db, 'users', user.uid,)
                await updateProfile(user, { displayName: nombre + " " + apellido })
                console.log(user.displayName)
                dispatch(login(user.uid, user.displayName, user.email, user.photoURL))
                await setDoc(usersRef, {
                    name: nombre,
                    apellido: apellido,
                    email: email,
                    password: password,
                    photoURL: user.photoURL,
                    role: 'usuario',
                }, { merge: true }
                );
                console.log('usuario creado y escrito en la base de datos');
            }).catch(e => { console.log(e); });


        } catch (err) {
            console.log(err)
        }





    }
}



export const signInWithGoogle = () => {


    return async (dispatch) => {
        signInWithPopup(auth, googleAuth)
            .then(async (result) => {

                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                const usersRef = doc(db, 'users', user.uid,)
                console.log(token)
                console.log(user.displayName)
                dispatch(signIn(user.uid, user.displayName, user.email, user.photoURL,))
                await setDoc(usersRef, {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    role: 'usuario',
                }, { merge: true }
                );
                console.log('usuario creado y escrito en la base de datos');
            }).catch((error) => {
                console.log(error)
                return error;
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

export const register = (nombre, apellido, email, contraseña) => {
    return {
        type: types.register,
        payload: {

            nombre,
            apellido,
            email,
            contraseña,

        }
    }
}