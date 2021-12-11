import React from 'react'
import { Link } from 'react-router-dom';
import { NavbarBrand } from 'reactstrap';
import Icon from '../../assets/favicon.png';


export const NavbarAdmin = () => {

    return <nav className=" navbar  p-2 rounded-b-xl shadow-md ">
        <div className="d-flex">
            <Link to="/inicio"><img src={Icon} className=" shadow-xl rounded-xl " alt="Logo" /></Link></div>
        <div> <NavbarBrand className='text-center font-bold  main-color'>E.P.E.T N° 20 Dashboard</NavbarBrand></div>

        <Link to="/inicio" className="text-center font-bold  main-color">Cerrar sesión</Link>

    </nav >;
}
