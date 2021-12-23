import React from 'react'
import { FaUserAlt, FaHome, FaNewspaper, FaFemale,  FaUsers } from "react-icons/fa";
import { MdOutlineContactMail, MdLibraryBooks } from "react-icons/md";
import { Link } from 'react-router-dom';
import { Title } from '../text-styles/title';

export const Menu = () => {
    return (
        <div className=''>
            <div>

                <Title text="Menu" />

                <div className="list-group">
                    <Link to="perfil" className=" list-group-item-action p-2 m-2 admin-item rounded-xl shadow-sm d-flex">   <FaUserAlt className="mr-2 ml-1" /> Mi Perfil</Link>
                    <Link to="usuarios" className=" list-group-item-action p-2 m-2 admin-item rounded-xl shadow-sm d-flex">   <FaUsers className="mr-2 ml-1" />  Usuarios</Link>
                    <Link to="inicio" className=" list-group-item-action p-2 m-2 admin-item rounded-xl shadow-sm d-flex">   <FaHome className="mr-2 ml-1" />  Inicio</Link>
                    <Link to="novedades" className=" list-group-item-action p-2 m-2 admin-item rounded-xl shadow-sm d-flex">   <FaNewspaper className="mr-2 ml-1" />  Novedades</Link>
                    <Link to="secretaria" className=" list-group-item-action p-2 m-2 admin-item rounded-xl shadow-sm d-flex">   <FaFemale className="mr-2 ml-1" />  Secretaría</Link>
                    <Link to="contacto" className=" list-group-item-action p-2 m-2 admin-item rounded-xl shadow-sm d-flex">   <MdOutlineContactMail className="mr-2 ml-1" />  Contacto</Link>
                    <Link to="plan-de-estudios" className=" list-group-item-action p-2 m-2 admin-item rounded-xl shadow-sm d-flex">   <MdLibraryBooks className="mr-2 ml-1" />  Plan de estudios</Link>

                </div>
            </div>
        </div>
    )
}
