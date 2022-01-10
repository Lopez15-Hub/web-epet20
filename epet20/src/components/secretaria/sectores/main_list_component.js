import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { Title } from '../../text-styles/title'
import { db } from '../../../firebase/firebaseConfig';
import { Loading } from '../../admin_panel/sections/loading';
import { Link } from 'react-router-dom';
export const MainList = ({ label, admin }) => {

    const currentDate = new Date();
    useEffect(() => {
        label !== 'Anuncios' ? getFormsFromFirebase() : getAnunciosFromFirebase()
        console.log(currentDate.toDateString().toLocaleString())
        console.log(currentDate.toDateString().toLocaleString() === '9/1/2022' ? true : false)


    }, [])
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

                list.push({ ...doc.data(), id: doc.id, fecha: formatDate(doc.data().submitAt) })
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
    const deleteFromFirebase = () => async (id, bdRef) => {
        const confirm = window.confirm("¿Estás seguro de que quieres eliminar este " + (label === 'Anuncios' ? 'Anuncio' : 'Formulario') + "?");
        if (confirm) {
            const ref = doc(db, bdRef, id);
            await deleteDoc(ref).then(() => {
                window.alert("Formulario eliminado correctamente.");
                window.location.reload();
            }).catch(err => {
                console.log(err);
            });
        }
    }
    return (
        <>
            {/*Barra de navegación*/}


            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container shadow-xl bg-white rounded-xl mt-7 " >

                <div className="row ">

                    <Title text={label} />
                    {/* <img className='portada' src={label.toLowerCase() === 'docentes' ? docentes : label.toLowerCase() === 'estudiantes' ? estudiantes : general} /> */}

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

                                                    <li class="border p-4 m-2 shadow-md rounded-xl">
                                                        <a href={e.url}>
                                                            <p className='main-color font-bold'>{e.title}</p> <p>{e.description}</p>
                                                            <p className='text-muted'>Fecha de publicación: {e.fecha}</p></a>
                                                        {
                                                            admin ?
                                                                <div>
                                                                    {label !== 'Anuncios' ? <Link to={"/admin/secretaria/forms" + "/edit/"} className='btn btn-warning mr-2'>Editar</Link> : <Link to={"/admin/secretaria/anuncios" + "/edit/"} className='btn btn-warning mr-2'>Editar</Link>}

                                                                    <button onClick={deleteFromFirebase(e.id, label !== 'Anuncios' ? 'forms' : 'anuncios')} className='btn btn-danger '>Eliminar</button>

                                                                </div> : ''}
                                                    </li>

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
