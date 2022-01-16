import React, { useEffect, useState } from "react";
import "./custom_navbar.css";
import { Link } from "react-router-dom";
import Menu from "../../../assets/menu.png";
import Icon from "../../../assets/favicon.png";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import { DropdownEstudiantes, DropdownOptions } from "./dropdowns_estudiantes";
import {
  DropdownOptionsSecretaria,
  DropdownSecretaria,
} from "./dropdowns_secretaria";

export const AdminNavbar = ({ currentRole }) => {
    const [user, setUser] = useState({
        photoUrl: "",
        displayName: "",
      });
      const [menu, setMenu] = useState(false);
      const [screenWidth, setWidth] = useState(window.innerWidth);
      const [showDropdown, setshowDropdown] = useState(false);
      const [showDropdown2, setshowDropdown2] = useState(false);
      useEffect(() => {
        const changeWidth = () => {
          setWidth(window.innerWidth);
        };
        window.addEventListener("resize", changeWidth);
        handleUserData();
      }, []);
      const handleUserData = () => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setUser({
              photoUrl: user.photoURL,
              displayName: user.displayName,
            });
          } else {
            setUser({
              photoUrl: Menu,
              displayName: "",
            });
            console.log("cargando...");
          }
        });
      };
    
      const showMenu = () => {
        setMenu(!menu);
      };
      const handleSignOut = () => {
        auth.signOut();
        window.location.replace("/");
      };
      const dropdown = () => {
        setshowDropdown(!showDropdown);
      };
      const dropdown2 = () => {
        setshowDropdown2(!showDropdown2);
      };
      /*
        Navbar ES LA SECCIÓN DE 
        LA PÁGINA DONDE SE ENCUENTRA 
        EL LOGO Y EL MENÚ DE NAVEGACIÓN
        */
    
      return (
        <nav className="my-navbar container-fluid rounded-b-xl  me-auto ">
          <div className="menu rounded-b-xl  ">
            <div className="display-bar full-expanded ">
              <div className="brand ">
                <div className="brand-items p-2">
                  <button onClick={() => showMenu()} className=" hide-inPc">
                    <h1 className="menu-icon font-bold">|||</h1>
                  </button>
                  <img src={Icon} className="hide-inMobile shadow-md rounded-xl logo " />
                  <h1 className="main-color navbar-brand font-bold">
                    <Link onClick={() => setMenu(false)} to="/inicio">
                      {" "}
                      {currentRole === 'administrador' ? 'Panel de administrador' : 'General'}
                    </Link>
                  </h1>
                  {user.displayName !== "" ? (
                    <Link to="/admin" className="img-profile-min  hide-inPc">
                      <img
                        className="shadow-xl rounded-50 "
                        src={user.photoUrl}
                        alt={"Foto de perfil de " + user.displayName}
                      />
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            {menu || screenWidth > 800 ? (
              <>
                {user.displayName == "" ? (
                  <div className="elements-right hide-inMobile">
                    <div className="items-right">
                      <Link
                        to="login"
                        className="session-button p-1 m-1 btn my-btn text-white nav-element font-bold"
                      >
                        Iniciar sesión
                      </Link>
                      <Link
                        to="registro"
                        className="session-button nav-element my-outlined-button font-bold p-1 m-1"
                      >
                        Registrarse
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="elements-right hide-inMobile">
                    <div className="items-right">
                      <Link to="/admin" className="">
                        <img src={user.photoUrl} className="img-profile-nav"></img>
                      </Link>
                      <button
                        className="session-button nav-element my-outlined-button font-bold p-1 m-1"
                        onClick={handleSignOut}
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              ""
            )}
          </div>
        </nav>
      );
}
