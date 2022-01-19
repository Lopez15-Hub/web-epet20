
import React, { useEffect, useState } from "react";
import "./custom_navbar.css";
import { Link } from "react-router-dom";
import Menu from "../../../assets/menu.png";
import Icon from "../../../assets/favicon.png";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import {
  DropdownEstudiantes,
  DropdownsAdminEstudiantes,
} from "./dropdowns_estudiantes";
import UserIcon from "../../../assets/user.png";
import {
  DropdownAdminSecretaria,
  DropdownSecretaria,
} from "./dropdowns_secretaria";
import { motion } from "framer-motion";
import { HeaderNavAdmin } from "./header";

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
    if (screenWidth >= 1366) {
      setMenu(false);
    }
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, [screenWidth]);
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
    <>
      <HeaderNavAdmin
        click={() => showMenu()}
        disable={() => (menu ? showMenu(false) : "")}
        currentRole={currentRole}
      />
      {menu || screenWidth >= 1365 ? (
        <nav className="my-navbar  me-auto">
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="menu "
          >
            <div className="display-bar ">
              <div className="brand ">
                <div className="brand-items p-2">
                  <button onClick={() => showMenu()} className="hide-inPc">
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
                      onClick={() => setMenu(!menu)}
                      to="./perfil"
                      className="hide-inPc"
                    >
                      <img
                        className="shadow-xl img-profile-nav rounded-50 "
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
            {menu || screenWidth < 1365 ? (
              <>
                <div id="menu" className="elements ">
                  <div className="items">
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
                    {screenWidth > 1366 ? (
                      <>
                        <DropdownEstudiantes />
                        <DropdownSecretaria />
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            dropdown();
                          }}
                          href="#"
                          className="nav-element font-bold w-100 "
                        >
                          Estudiantes {showDropdown ? "▲" : "▼"}
                        </button>
                        {showDropdown ? (
                          <DropdownsAdminEstudiantes
                            click={() => {
                              showMenu();
                              dropdown();
                            }}
                          />
                        ) : (
                          ""
                        )}
                        <button
                          onClick={() => {
                            dropdown2();
                          }}
                          href="#"
                          className="nav-element font-bold w-100"
                        >
                          Secretaría {showDropdown2 ? "▲" : "▼"}
                        </button>
                        {showDropdown2 ? (
                          <DropdownAdminSecretaria
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
                          onClick={() => showMenu()}
                          to="/login"
                          className="btn btn-primary btn-md m-4 font-bold hide-inPc"
                        >
                          Iniciar sesión
                        </Link>
                        <Link
                          onClick={() => showMenu()}
                          to="registro"
                          className="btn btn-outline-primary m-4 font-bold hide-inPc"
                        >
                          Registrarse
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </motion.div>
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="blackShadow hide-inPc"
            onClick={() => showMenu(false)}
          ></motion.div>
        </nav>
      ) : (
        ""
      )}
    </>
  );
};
