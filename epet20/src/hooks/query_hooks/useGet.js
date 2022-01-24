import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from '../../firebase/firebaseConfig';


export const useGet = (initialValue = []) => {
    const [users, setUsers] = useState(initialValue)
    useEffect(() => {
        const q = query(collection(db, "users"), orderBy("name", "asc"));
        const users = [];
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                users.push({ ...doc.data(), id: doc.id });

            });
            setUsers(users);
        });

        return () => unsubscribe();
    }, [users]);


    return { users }
}
