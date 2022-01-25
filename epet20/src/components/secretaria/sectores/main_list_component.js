
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { Title } from '../../text-styles/title'
import { app, db } from '../../../firebase/firebaseConfig';
import { Loading } from '../../admin_panel/sections/loading';
import { Link } from 'react-router-dom';
import Footer from '../../inicio/footer';
import { useDate } from '../../../hooks/useDate';
export const MainList = ({ label, admin }) => {
    const [listData, setListData] = useState([]);
    const { formatDate } = useDate();
    useEffect(() => {
        let mounted = true;
        console.log("Mounted")
        const getStudentsFilesFromFirebaseByLabel = async () => {
            const list = []

            const studentsRef = collection(db, "estudiantes");
            const q = query(studentsRef, where("label", "==", label));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                list.push({ message: 'empty', id: null })

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
            if (querySnapshot.empty) {
                list.push({ message: 'empty', id: null })
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
            } else {
                querySnapshot.forEach(doc => {
                    list.push({ ...doc.data(), id: doc.id, fecha: formatDate(doc.data().submitAt) })
                })
            }
            setListData(list)
        }

        if (mounted) {
            if (label === 'Docentes' || label === 'General' || label === 'Estudiantes') {
                getFormsFromFirebaseByLabel()
            } else if (label === 'Anuncios') {
                getAnunciosFromFirebase()
            } else {
                getStudentsFilesFromFirebaseByLabel();
            }
        }

        return () => mounted = false;

    }, [formatDate, label])




    const deleteFromFirebase = async (id, fileName) => {
        const confirm = window.confirm("¿Estás seguro de que quieres eliminar este " + (label === 'Anuncios' ? 'anuncio' : label === 'teoria' || label === 'taller' || label === 'educación física' ? 'archivo' : 'formulario') + "?");
        const bdRef = doc(db, label === 'Anuncios' ? 'anuncios' : label === 'teoria' || label === 'taller' || label === 'educación física' ? 'estudiantes' : 'forms', id);
        if (confirm) {
            await deleteDoc(bdRef).then(async () => {
                if ((label === 'teoria' || label === 'taller' || label === 'educación física') && fileName) {
                    const storageRef = app.storage().ref('/estudiantes-files/' + fileName);
                    await storageRef.delete().then(() => {
                        console.log("Archivo eliminado exitosamente de storage.");
                        window.alert("Imágen eliminada correctamente de la base de datos y de storage.");
                        window.location.reload();
                    }).catch((err) => {
                        console.log("Ha ocurrido un error al eliminar el archivo. Error:", err.code);
                    });
                } else {
                    window.alert((label === 'Anuncios' ? 'Anuncio ' : label === 'teoria' || label === 'taller' || label === 'educación física' ? 'Archivo ' : 'Formulario ') + " eliminado correctamente.");
                    window.location.reload();
                }


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
                                                        <p className='text-muted'>{admin && e.updatedBy ? 'Editado por: ' + e.updatedBy : ''}</p>
                                                        <p className='text-muted'>{admin && e.updatedAt ? "Fecha de edición: " + formatDate(e.updatedAt) : ''} </p>
                                                        {
                                                            admin ?
                                                                <div>
                                                                    {label !== 'Anuncios' ? <Link to={"/dashboard/secretaria/forms/" + e.id} className='btn btn-warning mr-2'>Editar</Link> : <Link to={"/dashboard/secretaria/anuncios/" + e.id} className='btn btn-warning mr-2'>Editar</Link>}

                                                                    {label === 'teoria' || label === 'taller' || label === 'educación física' ? <button onClick={() => deleteFromFirebase(e.id, e.title)} className='btn btn-danger '>Eliminar</button> : <button onClick={() => deleteFromFirebase(e.id)} className='btn btn-danger '>Eliminar</button>}

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
