import { useState } from 'react'
import { auth, db } from '../../firebase/firebaseConfig'

export const useAuth = (email,password) => {
    const [user, setUser] = useState();
    setUser(auth.currentUser);
    const signIn = (email, password) => {
        auth.signInWithEmailAndPassword(email, password).then(user => {
            if (user) {
                var response = searchUserInFirestore(email);
                if (response === true) {
                    console.log("Usuario encontrado");
                } else {
                    console.log("Usuario no encontrado");
                    auth.currentUser.delete().then(function () {
                        deleteUserInFirestore(email);
                        console.log("Usuario eliminado");
                    }).catch(function (error) { console.log(error); })
                }
            }
        });
    }
    const searchUserInFirestore = async (email) => {
        const userRef = db.collection('users').where('email', '==', email);
        return userRef.get().then(querySnapshot => {
            if (querySnapshot.empty) {
                return false;
            } else {
                return true;
            }
        })
    }
    const deleteUserInFirestore = async (email) => {
        const userRef = db.collection('users').where('email', '==', email);
        return userRef.get().then(querySnapshot => {
            if (querySnapshot.empty) {
                return false;
            } else {
                return true;
            }
        })
    }
    return {
        user,
    }
}
