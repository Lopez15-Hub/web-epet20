import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from "firebase/firestore";
import { Title } from '../../text-styles/title'
import { db } from '../../../firebase/firebaseConfig';
import { Loading } from '../../admin_panel/sections/loading';
export const MainList = ({ label }) => {
    const currentDate = new Date();
    useEffect(() => {
        label !== 'Anuncios' ? getFormsFromFirebase() : getAnunciosFromFirebase()
        console.log(currentDate.toDateString().toLocaleString())
        console.log(currentDate.toDateString().toLocaleString() === '9/1/2022' ? true : false)


    })
    const [listData, setListData] = useState([]);
    const getFormsFromFirebase = async () => {
        const list = []

        const formsRef = collection(db, "forms");
        const q = query(formsRef, where("label", "==", label));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            list.push({ message: 'empty', id: null })

            console.log(listData[0])
        } else {
            querySnapshot.forEach(doc => {

                list.push({ ...doc.data(), id: doc.id,fecha: formatDate(doc.data().submitAt )})
            })
        }
        setListData(list)
    }
    const formatDate = (date) => {
        const formatDate = date.toDate().toLocaleString().substring(0, 8);
        return formatDate

    }
    const getAnunciosFromFirebase = async () => {
        const list = []

        const querySnapshot = await getDocs(collection(db, "anuncios"));
        if (querySnapshot.empty) {
            list.push({ message: 'empty', id: null })

            console.log(listData[0])
        } else {
            querySnapshot.forEach(doc => {

                list.push({ ...doc.data(), id: doc.id, fecha: formatDate(doc.data().submitAt) })
            })
        }
        setListData(list)
    }
    return (
        <>
            {/*Barra de navegación*/}


            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container shadow-xl bg-white rounded-xl mt-7 " >

                <div className="row ">
                    <Title text={label} />


                    <hr className="mt-4" />
                    <div className="col-12 rounded-xl">
                        <div className="text-center ">
                            <Title text={label === 'Anuncios' ? "" : 'Formularios disponibles'} />
                        </div>
                        {
                   
                            listData.length !== 0 ?

                                listData.map(e => (
                                    <>
                                        {
                                            e.id !== null ?
                                                <ul key={e.id ? e.id : 0}>
                                                    <a href={e.url}>
                                                        <li class="border p-4 m-2 shadow-md rounded-xl">
                                                            <p className='main-color font-bold'>{e.title}</p> <p>{e.description}</p>
                                                            <p className='text-muted'>Fecha de publicación: {e.fecha}</p>
                                                        </li> </a>
                                                </ul> : <h1 className='font-bold main-color'>{label === 'Anuncios' ? 'No hay anuncios disponibles.' : 'No hay formularios cargados.'}</h1>

                                        }</>
                                )) : <Loading text="Cargando" />

                        }

                    </div>
                </div>


            </motion.div>


        </>
    )
}
