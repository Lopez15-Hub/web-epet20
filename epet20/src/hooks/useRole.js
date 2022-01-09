
import { useState, useEffect } from 'react'
import { auth, db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
export const useRole = () => {
    useEffect(() => {
        handleRole();
    })
    const [role, setRole] = useState();
    const handleRole = async () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, "users", auth.currentUser.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("ROLE: " + docSnap.data().role)
                    setRole(docSnap.data().role.toLowerCase());
                } else {
                    auth.signOut();
                    window.location.replace("/");
                    console.log("No such document!");
                }
            } else {
                console.log("Error: No user logged in")
            }

        })


    }
    return { role }
}
