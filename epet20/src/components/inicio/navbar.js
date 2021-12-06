import { React } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../assets/favicon.png';



function Navbar() {
    /*
    HEADER ES LA SECCIÓN DE 
    LA PÁGINA DONDE SE ENCUENTRA 
    EL LOGO Y EL MENÚ DE NAVEGACIÓN
    */


    return <nav className="navbar navbar-expand-lg navbar-light p-2 rounded-b-xl shadow-md">
        <div className="container-fluid ">
            <Link to="/" className="m-2  ">  <img src={Icon} className="shadow-xl rounded-xl " alt="Logo" /> </Link>
            <Link to="/inicio" className=" font-bold p-2 main-color ">E.P.E.T N° 20</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon "></span>
            </button>

            <div className="collapse navbar-collapse text-center " id="navbarScroll">
                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >
                    <li className="nav-item p-2">
                        <Link to="/novedades" className="nav-color font-bold p-2  ">Novedades</Link>
                    </li>
                    <li className="nav-item p-2">
                        <Link to="/estudiantes" className="nav-color font-bold p-2  ">Estudiantes</Link>
                    </li>
                    <li className="nav-item p-2">
                        <Link to="/secretaria" className="nav-color font-bold p-2   ">Secretaria</Link>
                    </li>

                    <li className="nav-item p-2">
                        <Link to="/contacto" className="nav-color font-bold  p-2 ">Contacto</Link>
                    </li>
                    <li className="nav-item p-2">
                        <Link to="/plan-de-estudios" className="nav-color font-bold  p-2 ">Plan de estudios</Link>
                    </li>
                    <li className="nav-item p-2">
                        <a href="https://regular.neuquen.gob.ar/Inscripciones2021/servlet/com.certiregu.verificatramite" className="nav-color font-bold p-2  ">¿Estoy inscripto?</a>
                    </li>

                </ul>
                <div className="d-flex text-center">
                    <Link to="/login" className="  btn my-btn text-white text-center shadow-md font-bold p-1 m-1">Iniciar sesión</Link>
                   <div>
                   <Link to="/registro" type="submit" className=" my-outlined-button  text-center font-bold rounded-md shadow-md p-1 m-1">Registrarse</Link>
                   </div>
                </div>
            </div>
        </div>
    </nav>;

}

export default Navbar;

