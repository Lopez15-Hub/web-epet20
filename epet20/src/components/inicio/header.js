import { React } from 'react';
import Icon from '../../assets/favicon.png';
function Header() {
    return <nav className=" navbar header m-4 shadow-xl rounded-b-lg ">

        <div className="row" >

            <div className="d-flex ">

                <div><button className="btn main-color button-menu shadow-md p-2 m-2">|||</button></div>
                <div className="m-2 ">  <img src={Icon} className="shadow-xl rounded-xl hidden-title" alt="Logo" /> </div>
                <div className="m-3">
              
                <a href="https://www.facebook.com" class="nav-color menu-item  p-2 mb-4">Novedades</a>
                <a href="https://www.facebook.com" class="nav-color menu-item  p-2 mb-4">Estudiantes</a>
                <a href="https://www.facebook.com" class="nav-color menu-item  p-2  mb-4">Secretaria</a>
                <a href="https://www.facebook.com" class="nav-color menu-item  p-2 mb-4">Contacto</a>
                <a href="https://www.facebook.com" class="nav-color menu-item p-2 mb-4">Plan de estudios</a>
                </div>
            </div>

        </div>
    </nav>;

}

export default Header;

