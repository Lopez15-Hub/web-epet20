import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { db } from '../../firebase/firebaseConfig';

export const usePlan = () => {
    const [plan, setPlan] = React.useState([]);
    const obtenerTextosDeFirebase = async () => {
        const planRef = doc(db, 'textos', 'planDeEstudios');

        await getDoc(planRef).then(doc => {
            setPlan(doc.data());
        }).catch(err => {
            console.log(err);
        });
    }
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            obtenerTextosDeFirebase();
        }
        return () => mounted = false;
    }, [plan, setPlan]);

    return { plan }
}
