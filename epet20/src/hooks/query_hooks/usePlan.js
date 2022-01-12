import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { db } from '../../firebase/firebaseConfig';

export const usePlan = () => {
    const [plan, setPlan] = React.useState('');
    useEffect(() => {
        obtenerTextosDeFirebase();

    }, [])
    const obtenerTextosDeFirebase = async () => {
        const planRef = doc(db, 'textos', 'planDeEstudios');

        const querySnapshot = await getDoc(planRef);
        const plan = querySnapshot.data();
        setPlan(plan);
        console.log(plan);
    }
    return { plan }
}
