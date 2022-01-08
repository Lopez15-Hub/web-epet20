import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from "firebase/firestore";
import Footer from '../../inicio/footer'
import { Title } from '../../text-styles/title'
import { db } from '../../../firebase/firebaseConfig';
import { Loading } from '../../admin_panel/sections/loading';
import { isEmpty } from '@firebase/util';
export const MainList = ({ label }) => {

    useEffect(() => {
        getFormsFromFirebase();

    }, [])
    const [listForm, setListForm] = useState([]);
    const getFormsFromFirebase = async () => {
        const list = []

        const formsRef = collection(db, "forms");
        const q = query(formsRef, where("label", "==", label));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            list.push({ message: 'empty', id: null })

            console.log(listForm[0])
        } else {
            querySnapshot.forEach(doc => {

                list.push({ ...doc.data(), id: doc.id })
            })
        }
        setListForm(list)
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
                            <Title text="Formularios disponibles" />
                        </div>
                        {
                            console.log(listForm[0]),
                            listForm.length != 0 ?

                                listForm.map(e => (
                                    <>
                                        {
                                            e.id != null ?
                                                <ul key={e.id ? e.id : 0}>
                                                    <a href={e.url}>
                                                        <li class="border p-4 m-2 shadow-md rounded-xl">
                                                            <p className='main-color font-bold'>{e.title}</p> <p>{e.description}</p>
                                                        </li> </a>
                                                </ul> : <h1 className='font-bold main-color'>No hay formularios cargados.</h1>

                                        }</>
                                )) : <Loading text="Cargando" />

                        }

                    </div>
                </div>


            </motion.div>


        </>
    )
}
