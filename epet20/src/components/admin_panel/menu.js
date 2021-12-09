import React from 'react'
import { FaUserAlt, FaHome, FaNewspaper, FaFemale } from "react-icons/fa";
import { MdOutlineContactMail, MdLibraryBooks } from "react-icons/md";
import { Link } from 'react-router-dom';
import { Title } from '../text-styles/title';

export const Menu = () => {
    return (
        <div className="col-2 border-r">
            <div>

                <Title text="Administrador" />
                <div className="row p-2">
                    <Link to="/inicio" className="btn my-btn shadow-md btn-block mb-2">Volver a inicio</Link>
                    <Link to="/inicio" className="btn shadow-md my-outlined-button btn-block mb-2">Cerrar sesión</Link>
                </div>
                <hr />
                <div className="list-group">

                    <a href="https://" className=" list-group-item-action p-2 m-2 admin-item rounded-xl shadow-sm d-flex">   <FaUserAlt className="mr-2 ml-1" />  Usuarios</a>
                    <a href="https://" className=" list-group-item-action p-2 m-2 admin-item rounded-xl shadow-sm d-flex">   <FaHome className="mr-2 ml-1" />  Inicio</a>
                    <a href="https://" className=" list-group-item-action p-2 m-2 admin-item rounded-xl shadow-sm d-flex">   <FaNewspaper className="mr-2 ml-1" />  Novedades</a>
                    <a href="https://" className=" list-group-item-action p-2 m-2 admin-item rounded-xl shadow-sm d-flex">   <FaFemale className="mr-2 ml-1" />  Secretaría</a>
                    <a href="https://" className=" list-group-item-action p-2 m-2 admin-item rounded-xl shadow-sm d-flex">   <MdOutlineContactMail className="mr-2 ml-1" />  Contacto</a>
                    <a href="https://" className=" list-group-item-action p-2 m-2 admin-item rounded-xl shadow-sm d-flex">   <MdLibraryBooks className="mr-2 ml-1" />  Plan de estudios</a>

                </div>
            </div>
        </div>
    )
}
