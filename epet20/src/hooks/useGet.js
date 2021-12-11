import { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import db from '../firebase/firebaseConfig';

export const useGet = (initialValue = []) => {
    const [users, setUsers] = useState(initialValue)
    useEffect(() => {


        obtenerDatos();
    }, [])

    const obtenerDatos = async () => {
        const querySnapshot = await getDocs(collection(db, "user"));
        const usersDocs = [];

        querySnapshot.forEach(doc => {

            usersDocs.push({ ...doc.data(), id: doc.id })


        });
        setUsers(usersDocs);
    }
    return { users}
}
