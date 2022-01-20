import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { db } from '../../firebase/firebaseConfig';

export const usePlan = () => {
    const [plan, setPlan] = React.useState([]);
    useEffect(() => {
        const obtenerTextosDeFirebase = async () => {
            const planRef = doc(db, 'textos', 'planDeEstudios');

            await getDoc(planRef).then(doc => {
                setPlan(doc.data());
            }).catch(err => {
                console.log(err);
            });
        }
        obtenerTextosDeFirebase();
    }, [])

    return { plan }
}
