import React, { useEffect, useState } from "react";
import "./custom_navbar.css";
import { Link } from "react-router-dom";
import Menu from "../../../assets/menu.png";
import Icon from "../../../assets/favicon.png";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import { DropdownEstudiantes, DropdownOptions } from "./dropdowns_estudiantes";
import UserIcon from "../../../assets/user.png";
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

  const [showDropdown, setshowDropdown] = useState(false);
  const [showDropdown2, setshowDropdown2] = useState(false);
  const [screenWidth, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const changeWidth = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);
    handleUserData();
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
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
        <div className="display-bar ">
          <div className="brand ">
            <div className="brand-items p-2">
              <button onClick={() => showMenu()} className=" hide-inPc">
                <h1 className="menu-icon font-bold">|||</h1>
              </button>
              <img
                src={Icon}
                className="hide-inMobile shadow-md rounded-xl logo "
                alt="logo"
              />
              <h1 className="main-color text-center ml-7 pl-2 hide-inMobile mx-auto  navbar-brand font-bold">
                <Link onClick={() => setMenu(false)} to="/inicio">
                  {" "}
                  {currentRole === "administrador"
                    ? "Panel de administrador"
                    : "General"}
                </Link>
              </h1>
              {user.displayName !== "" ? (
                <Link
                  to="/dashboard/perfil"
                  className="  hide-inPc"
                >
                  <img
                    className="shadow-xl rounded-50 "
                    src={user.photoUrl ? user.photoUrl : UserIcon}
                    alt={"Foto de perfil de " + user.displayName}
                  />
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {menu ? (
          <>
            <div id="menu" className="elements ">
              <div className="items">
                <Link
                  onClick={() => showMenu()}
                  to="perfil"
                  className=" nav-element font-bold "
                >
                  Mi Perfil
                </Link>
                <Link
                  onClick={() => showMenu()}
                  to="usuarios"
                  className=" nav-element font-bold "
                >
                  Usuarios
                </Link>
                <Link
                  onClick={() => showMenu()}
                  to="inicio"
                  className=" nav-element font-bold "
                >
                  Inicio
                </Link>
                <Link
                  onClick={() => showMenu()}
                  to="novedades"
                  className=" nav-element font-bold "
                >
                  Novedades
                </Link>
                {screenWidth < 800 ? (
                  <>
                    <DropdownEstudiantes />
                    <DropdownSecretaria />
                  </>
                ) : (
                  <>
                    <a
                      onClick={() => {
                        dropdown();
                      }}
                      href="..."
                      className="nav-element font-bold "
                    >
                      Estudiantes {showDropdown ? "▲" : "▼"}
                    </a>
                    {showDropdown ? (
                      <DropdownOptions
                        click={() => {
                          showMenu();
                          dropdown();
                        }}
                      />
                    ) : (
                      ""
                    )}
                    <a
                      onClick={() => {
                        dropdown2();
                      }}
                      href="..."
                      className="nav-element font-bold "
                    >
                      Secretaría {showDropdown2 ? "▲" : "▼"}
                    </a>
                    {showDropdown2 ? (
                      <DropdownOptionsSecretaria
                        click={() => {
                          showMenu();
                          dropdown2();
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </>
                )}

                <Link
                  onClick={() => showMenu()}
                  to="contacto"
                  className="nav-element font-bold"
                >
                  Contacto
                </Link>
                <Link
                  onClick={() => showMenu()}
                  to="plan-de-estudios"
                  className="nav-element font-bold"
                >
                  Plan de estudios
                </Link>
                {user.displayName !== "" ? (
                  <button
                    className="hide-inPc my-outlined-button  text-center font-bold rounded-md shadow-md mx-auto top-50 p-1 m-1"
                    onClick={handleSignOut}
                  >
                    Cerrar sesión
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="btn btn-primary btn-md m-4 font-bold hide-inPc"
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      to="registro"
                      className="btn btn-outline-primary m-4 font-bold hide-inPc"
                    >
                      Registrarse
                    </Link>
                  </>
                )}
              </div>
            </div>
            {user.displayName === "" ? (
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
                  <Link to="/dashboard" className="">
                    <img  
                      src={user.photoUrl ? user.photoUrl : UserIcon}
                      className="img-profile-nav"
                      alt={"Foto de perfil de " + user.displayName}
                    ></img>
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
};
