import { React } from 'react';
import Icon from '../../assets/icon.png';
function Header() {
    return <nav className=" p-2 m-4 header shadow-xl rounded-b-lg ">

        <div className="flex" >
            <button className="btn main-color d-flex button-menu" onClick={console.log("print")}>|||</button>
            <h1 className="text-xl font-bold text-center p-2 hidden-title">E.P.E.T N° 20</h1>
            <a href="https://www.facebook.com" class="nav-color  p-2 ">Novedades</a>
            <a href="https://www.facebook.com" class="nav-color  p-2">Estudiantes</a>
            <a href="https://www.facebook.com" class="nav-color  p-2">Secretaria</a>
            <a href="https://www.facebook.com" class="nav-color  p-2">Contacto</a>
            <a href="https://www.facebook.com" class="nav-color p-2">Plan de estudios</a>

        </div>
    </nav>;

}

export default Header;

