import { React, } from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavbarBrand, NavItem } from 'reactstrap';
import Icon from '../../assets/favicon.png';


function Navbar() {

    /*
    Navbar ES LA SECCIÓN DE 
    LA PÁGINA DONDE SE ENCUENTRA 
    EL LOGO Y EL MENÚ DE NAVEGACIÓN
    */


    return <nav className="navbar bg-light navbar-expand-lg  navbar-light p-2 rounded-b-xl shadow-md ">
        <div className="container-fluid text-center ">
            <Link to="/" className="p-2"> <img src={Icon} className="shadow-xl rounded-xl " alt="Logo" /> </Link>
            <NavbarBrand><Link to="/inicio" className=" font-bold p-2 main-color ">E.P.E.T N° 20</Link></NavbarBrand>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon "></span>
            </button>

            <div className="collapse navbar-collapse text-center" id="navbarScroll">
                <Nav className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >
                    <NavItem className="nav-item p-2">
                        <Link to="/novedades" className=" font-bold p-2 nav-color ">Novedades</Link>
                    </NavItem>
                    <NavItem className="nav-item p-2">
                        <Link to="/estudiantes" className=" font-bold p-2 nav-color   ">Estudiantes</Link>
                    </NavItem>
                    <NavItem className="nav-item p-2">
                        <Link to="/secretaria" className=" font-bold p-2  nav-color  ">Secretaria</Link>
                    </NavItem>

                    <NavItem className="nav-item p-2">
                        <Link to="/contacto" className=" font-bold  p-2  nav-color ">Contacto</Link>
                    </NavItem>
                    <NavItem className="nav-item p-2">
                        <Link to="/plan-de-estudios" className=" font-bold  p-2  nav-color ">Plan de estudios</Link>
                    </NavItem>
                    <NavItem className="nav-item p-2">
                        <a href="https://regular.neuquen.gob.ar/Inscripciones2021/servlet/com.certiregu.verificatramite" className="nav-color font-bold p-2  ">¿Estoy inscripto?</a>
                    </NavItem>

                </Nav>
                <div className="d-flex text-center">
                    <Link to="/login" className="  btn my-btn text-white text-center shadow-md font-bold p-1 m-1">Iniciar sesión</Link>
                    <div>
                        <Link to="/registro" type="submit" className=" my-outlined-button  text-center font-bold rounded-md shadow-md p-1 m-1">Registrarse</Link>
                    </div>
                </div>
            </div>
        </div>
    </nav >;

}

export default Navbar;

