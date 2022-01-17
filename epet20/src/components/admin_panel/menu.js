
import { motion } from 'framer-motion';
import React, { useState } from 'react'
import { FaUserAlt, FaHome, FaNewspaper, FaFemale, FaUsers, FaArrowDown, FaArrowRight } from "react-icons/fa";
import { MdOutlineContactMail, MdLibraryBooks, MdSchool } from "react-icons/md";
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebaseConfig';
import { Title } from '../text-styles/title';

export const Menu = ({ role }) => {

    const [visible, setVisible] = useState(false);
    const [show, setShow] = useState(false);

    const showEstudiantes = () => {
        visible ? setVisible(false) : setVisible(true);
    }
    const showSecretaria = () => {
        show ? setShow(false) : setShow(true);
    }
    const logOut = () => {
        auth.signOut();
        window.location.replace("/inicio");
    }











    return (
        <div>
            <div>

                <Title text="Menu" />

                <div className="list-group">
                    {
                        role === "usuario" || role === undefined || role === null ? <>
                            <Link to="perfil" className=" list-group-item-action p-2 mt-2 admin-item rounded-xl shadow-sm d-flex">   <FaUserAlt className="mr-2 ml-1" /> Mi Perfil</Link>
                            <button className='btn btn-danger mt-2' onClick={() => logOut()}>Cerrar sesión</button>
                            <Link to="/" className='btn btn-primary mt-2'>Volver a inicio</Link >
                        </> : ''
                    }
                    {
                        role === "secretaria" ? <>
                            <Link to="perfil" className=" list-group-item-action p-2 mt-2 admin-item rounded-xl shadow-sm d-flex">   <FaUserAlt className="mr-2 ml-1" /> Mi Perfil</Link>
                            <div>
                                <button onClick={(e) => showEstudiantes(e)} className=" list-group-item-action p-2 mt-2 admin-item rounded-xl shadow-sm d-flex">
                                    <FaFemale className="mr-2 ml-1" />  Secretaría <div className='mx-auto'></div> {
                                        visible ? <FaArrowDown className="mt-1 d-flex   mx-auto" /> : <FaArrowRight className="mt-1 d-flex   mx-auto" />}</button>
                                {
                                    visible ?
                                        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <Link to="secretaria/admin" className="list-group-item-action p-2 mt-2 d-flex">Administrar</Link>
                                            <Link to="secretaria/anuncios" className="list-group-item-action p-2 mt-2 d-flex">Anuncios</Link>
                                            <Link to="secretaria/forms" className="list-group-item-action p-2 mt-2 d-flex">Formularios</Link>

                                        </motion.div> : ''
                                }

                            </div>
                            <button className='btn btn-danger btn-block mt-2' onClick={() => logOut()}>Cerrar sesión</button>
                        </> : ''
                    }

                    {
                        role === "administrador" ? <>
                            <Link to="perfil" className=" list-group-item-action p-2 mt-2 admin-item rounded-xl shadow-sm d-flex">   <FaUserAlt className="mr-2 ml-1" /> Mi Perfil</Link>
                            <Link to="usuarios" className=" list-group-item-action p-2 mt-2 admin-item rounded-xl shadow-sm d-flex">   <FaUsers className="mr-2 ml-1" />  Usuarios</Link>
                            <Link to="inicio" className=" list-group-item-action p-2 mt-2 admin-item rounded-xl shadow-sm d-flex">   <FaHome className="mr-2 ml-1" />  Inicio</Link>
                            <Link to="novedades" className=" list-group-item-action p-2 mt-2 admin-item rounded-xl shadow-sm d-flex">   <FaNewspaper className="mr-2 ml-1" />  Novedades</Link>
                            <div>
                                <button onClick={() => showEstudiantes()} className=" list-group-item-action p-2 mt-2 admin-item rounded-xl shadow-sm d-flex">
                                    <MdSchool className="mr-2 ml-1" />  Estudiantes <div className='mx-auto'></div> {
                                        visible ? <FaArrowDown className="mt-1 d-flex   mx-auto" /> : <FaArrowRight className="mt-1 d-flex   mx-auto" />}</button>
                                {
                                    visible ?
                                        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <Link to="estudiantes/admin" className="list-group-item-action p-2 mt-2 d-flex">Administrar</Link>
                                            <Link to="estudiantes/upload" className="list-group-item-action p-2 mt-2 d-flex">Añadir un archivo</Link>

                                        </motion.div> : ''
                                }
                            </div>
                            <div>
                                <button onClick={() => showSecretaria()} className=" list-group-item-action p-2 mt-2 admin-item rounded-xl shadow-sm d-flex">
                                    <FaFemale className="mr-2 ml-1" />  Secretaría <div className='mx-auto'></div> {
                                        show ? <FaArrowDown className="mt-1 d-flex   mx-auto" /> : <FaArrowRight className="mt-1 d-flex   mx-auto" />}</button>
                                {
                                    show ?
                                        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <Link to="secretaria/admin" className="list-group-item-action p-2 mt-2 d-flex">Administrar</Link>
                                            <Link to="secretaria/anuncios" className="list-group-item-action p-2 mt-2 d-flex">Añadir un anuncio</Link>
                                            <Link to="secretaria/forms" className="list-group-item-action p-2 mt-2 d-flex">Añadir un formulario</Link>

                                        </motion.div> : ''
                                }
                            </div>
                            <Link to="contacto" className=" list-group-item-action p-2 mt-2 admin-item rounded-xl shadow-sm d-flex">   <MdOutlineContactMail className="mr-2 ml-1" />  Contacto</Link>
                            <Link to="plan-de-estudios" className=" list-group-item-action p-2 mt-2 admin-item rounded-xl shadow-sm d-flex">   <MdLibraryBooks className="mr-2 ml-1" />  Plan de estudios</Link>
                            <button className='btn btn-danger 
                             mt-2' onClick={() => logOut()}>Cerrar sesión</button>
                        </> : ''
                    }

                </div>
            </div>
        </div>
    )
}
