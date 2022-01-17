/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { Title } from '../../text-styles/title'
import { db } from '../../../firebase/firebaseConfig';
import { Loading } from '../../admin_panel/sections/loading';
import { Link } from 'react-router-dom';
import Footer from '../../inicio/footer';
export const MainList = ({ label, admin }) => {

    const currentDate = new Date();
    useEffect(() => {
        console.log(label);
        label === 'Docentes' || label === 'General' || label === 'Estudiantes' ? getFormsFromFirebaseByLabel() : label === 'Anuncios' ? getAnunciosFromFirebase() : getStudentsFilesFromFirebaseByLabel();
        console.log(currentDate.toDateString().toLocaleString())
        console.log(currentDate.toDateString().toLocaleString() === '9/1/2022' ? true : false)


    }, [])
    const [listData, setListData] = useState([]);

    const formatDate = (date) => {
        const formatDate = date.toDate().toLocaleString().substring(0, 9);
        return formatDate

    }
    const getStudentsFilesFromFirebaseByLabel = async () => {
        const list = []

        const studentsRef = collection(db, "estudiantes");
        const q = query(studentsRef, where("label", "==", label));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
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
    const getFormsFromFirebaseByLabel = async () => {
        const list = []

        const formsRef = collection(db, "forms");

        const q = query(formsRef, where("label", "==", label));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
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
    const deleteFromFirebase = async (id) => {
        const confirm = window.confirm("¿Estás seguro de que quieres eliminar este " + (label === 'Anuncios' ? 'anuncio' : label === 'teoria' || label === 'taller' || label === 'educación física' ? 'archivo' : 'formulario') + "?");
        const bdRef = doc(db, label === 'Anuncios' ? 'anuncios' : label === 'teoria' || label === 'taller' || label === 'educación física' ? 'estudiantes' : 'forms', id);
        if (confirm) {
            await deleteDoc(bdRef).then(() => {
                window.alert((label === 'Anuncios' ? 'Anuncio' : label === 'teoria' || label === 'taller' || label === 'educación física' ? 'Archivo' : 'Formulario') + " " + " eliminado correctamente.");
                window.location.reload();
            }).catch(err => {
                window.alert("Ha ocurrido un error: " + err.code);
            });
        }

    }

    return (
        <>
            {/*Barra de navegación*/}


            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container my-shadow rounded-xl  me-auto " >

                <div className="row mt-4 mb-4">

                    <Title text={label} />

                    <hr className="mt-4" />
                    <div className="col-12 rounded-xl me-auto">
                        <div className="text-center ">
                            <Title text={label === 'Anuncios' ? "" : label === 'teoria' || label === 'taller' || label === 'educación física' ? 'Archivos subidos' : 'Formularios disponibles'} />
                        </div>
                        {

                            listData.length !== 0 ?

                                listData.map(e => (
                                    <>
                                        {
                                            e.id !== null ?
                                                <ul key={e.id ? e.id : 0}>

                                                    <li className="border p-3 m-2 rounded-xl">
                                                        <a href={e.url}>
                                                            <p className='main-color font-bold'>{e.title}</p> <p>{e.description}</p>
                                                            <p className='text-muted'>Fecha de publicación: {e.fecha}</p></a>
                                                        {
                                                            admin ?
                                                                <div>
                                                                    {label !== 'Anuncios' ? <Link to={"/dashboard/secretaria/forms" + "/" + e.id} className='btn btn-warning mr-2'>Editar</Link> : <Link to={"/dashboard/secretaria/anuncios"  + "/" + e.id} className='btn btn-warning mr-2'>Editar</Link>}

                                                                    <button onClick={() => deleteFromFirebase(e.id)} className='btn btn-danger '>Eliminar</button>

                                                                </div> : ''}
                                                    </li>

                                                </ul> : <h1 className='font-bold main-color'>{label === 'Anuncios' ? 'No hay anuncios disponibles.' : label === 'teoria' || label === 'taller' || label === 'educación física' ? 'No hay archivos subidos.' : 'No hay formularios cargados.'}</h1>

                                        }</>
                                )) : <Loading text="Cargando" />

                        }

                    </div>
                </div>

            </motion.div>


            {!admin ? <Footer /> : ''}
        </>
    )
}
