import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from '../../firebase/firebaseConfig';


export const useGet = (initialValue = []) => {
    const [users, setUsers] = useState(initialValue)
    const getRealTimeData = async (querySnapshot) => {
        const users = await querySnapshot.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            }

        });
        setUsers(users);
    }
    useEffect(() => {
        const q = query(collection(db, "users"), orderBy("name", "asc"));
        const unsubscribe = onSnapshot(q, (qs) => getRealTimeData(qs));

        return () => unsubscribe();
    }, []);


    return { users }
}
