import { React } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../assets/favicon.png';



function Navbar() {
    /*
    HEADER ES LA SECCIÓN DE 
    LA PÁGINA DONDE SE ENCUENTRA 
    EL LOGO Y EL MENÚ DE NAVEGACIÓN
    */


    return <nav class="navbar navbar-expand-lg navbar-light p-2 rounded-b-xl shadow-xl">
        <div class="container-fluid ">
            <Link to="/" className="m-2  ">  <img src={Icon} className="shadow-xl rounded-xl " alt="Logo" /> </Link>
            <Link to="/inicio" class="nav-color font-bold p-2  ">E.P.E.T N° 20</Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon "></span>
            </button>

            <div class="collapse navbar-collapse text-center " id="navbarScroll">
                <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >
                    <li class="nav-item p-2">
                        <Link to="/novedades" class="nav-color font-bold p-2  ">Novedades</Link>
                    </li>
                    <li class="nav-item p-2">
                        <Link to="/estudiantes" class="nav-color font-bold p-2  ">Estudiantes</Link>
                    </li>
                    <li class="nav-item p-2">
                        <Link to="/secretaria" class="nav-color font-bold p-2   ">Secretaria</Link>
                    </li>

                    <li class="nav-item p-2">
                        <Link to="/contacto" class="nav-color font-bold  p-2 ">Contacto</Link>
                    </li>
                    <li class="nav-item p-2">
                        <Link to="/plan-de-estudios" class="nav-color font-bold  p-2 ">Plan de estudios</Link>
                    </li>
                    <li class="nav-item p-2">
                        <a href="https://regular.neuquen.gob.ar/Inscripciones2021/servlet/com.certiregu.verificatramite" class="nav-color font-bold p-2  ">¿Estoy inscripto?</a>
                    </li>

                </ul>
                <div class="d-flex text-center">
                    <Link to="/login" class="btn nav-background text-white shadow-md font-bold   p-2  ">Iniciar sesión</Link>

                </div>
            </div>
        </div>
    </nav>;

}

export default Navbar;

