import { React } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../assets/favicon.png';



function Navbar() {
/*
HEADER ES LA SECCIÓN DE 
LA PÁGINA DONDE SE ENCUENTRA 
EL LOGO Y EL MENÚ DE NAVEGACIÓN
*/


    return <nav className=" navbar header m-4 shadow-xl rounded-b-lg ">
        <div className="row" >

            <div className="d-flex ">

                <div><button className="btn main-color button-menu shadow-md p-2 m-2">|||</button></div>
                <Link to="/" className="m-2 ">  <img src={Icon} className="shadow-xl rounded-xl hidden-title" alt="Logo" /> </Link>
                <div className="m-3">
              
                <Link to="/novedades" class="nav-color menu-item  p-2 mb-4">Novedades</Link>
                <Link to="/estudiantes" class="nav-color menu-item  p-2 mb-4">Estudiantes</Link>
                <Link to="/secretaria" class="nav-color menu-item  p-2  mb-4">Secretaria</Link>
                <Link to="/contacto" class="nav-color menu-item  p-2 mb-4">Contacto</Link>
                <Link to="/plan-de-estudios" class="nav-color menu-item p-2 mb-4">Plan de estudios</Link>
                <a href="https://regular.neuquen.gob.ar/Inscripciones2021/servlet/com.certiregu.verificatramite" class="nav-color menu-item p-2 mb-4">¿Estoy inscripto?</a>
                </div>
            </div>

        </div>
    </nav>;

}

export default Navbar;

