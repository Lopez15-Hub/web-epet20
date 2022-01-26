import React, { useEffect, useState } from "react";
import "./custom_navbar.css";
import { Link } from "react-router-dom";
import Menu from "../../../assets/menu.png";
import Icon from "../../../assets/favicon.png";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import { DropdownEstudiantes, DropdownOptions } from "./dropdowns_estudiantes";
import UserIcon from "../../../assets/user.png";
import { motion } from "framer-motion";
import {
  DropdownOptionsSecretaria,
  DropdownSecretaria,
} from "./dropdowns_secretaria";
import { HeaderNav } from "./header";
import { DropdownGeneral } from "./dropdown_general";

export const MyNavbar = () => {
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
    <>
      <HeaderNav
        click={() => showMenu()}
        disable={() => (menu ? showMenu(false) : "")}
      />
      {menu || screenWidth > 1365 ? (
        <>
          <nav className="my-navbar  me-auto ">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              
              transition={{ duration: 0.1 }}
              className="menu "
            >
              <div className="display-bar ">
                <div className="brand">
                  <div className="brand-items p-2">
                    <button onClick={() => showMenu()} className=" hide-inPc">
                      <h1 className="menu-icon font-bold">|||</h1>
                    </button>
                    <img
                      src={Icon}
                      className="hide-inMobile shadow-md rounded-xl logo"
                      alt="logo"
                    />
                    <h1 className="hide-inMobile main-color font-bold navbar-brand text-center pl-5 ml-5">
                      <Link onClick={() => setMenu(false)} to="/inicio">
                        {" "}
                        E.P.E.T. N°20
                      </Link>
                    </h1>
                    {user.displayName !== "" ? (
                      <a
                        onClick={() => setMenu(!menu)}
                        href="/dashboard"
                        className="hide-inPc"
                      >
                        <img
                          className="shadow-xl rounded-50 img-profile-nav "
                          src={user.photoUrl ? user.photoUrl : UserIcon}
                          alt={"Foto de perfil de " + user.displayName}
                        />
                      </a>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              {menu || screenWidth > 1365 ? (
                <>
                  <div id="menu" className="m-2 ">
                    <div className="items">
                      <Link
                        onClick={() => showMenu()}
                        to="novedades"
                        className=" nav-element font-bold "
                      >
                        Novedades
                      </Link>

                      {screenWidth > 1365 ? (
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
                            <DropdownOptions
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
                            className="nav-element font-bold w-100  "
                          >
                            Secretaría {showDropdown2 ? "▲" : "▼"}
                          </button>
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
                      {(screenWidth >= 1600 && screenWidth >= 1366) ||
                      screenWidth <= 900 ||
                      (screenWidth > 900 && screenWidth < 1365) ? (
                        <>
                          {" "}
                          <Link
                            onClick={() => showMenu()}
                            to="plan-de-estudios"
                            className="nav-element font-bold"
                          >
                            Plan de estudios
                          </Link>
                          <a
                            href="https://regular.neuquen.gob.ar/Inscripciones2021/servlet/com.certiregu.verificatramite"
                            className="nav-element font-bold"
                          >
                            ¿Estoy inscripto?
                          </a>
                        </>
                      ) : (
                        <DropdownGeneral />
                      )}

                      {user.displayName !== "" ? (
                       <div className="m-2">
                        <button
                          className="hide-inPc my-outlined-button  text-center font-bold rounded-md shadow-md mx-auto top-50 p-1 m-1 w-100"
                          onClick={handleSignOut}
                        >
                          Cerrar sesión
                        </button>
                       </div>
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
                        <a href="/dashboard">
                          <img
                            src={user.photoUrl ? user.photoUrl : UserIcon}
                            className="img-profile-nav"
                            alt={"Foto de perfil de " + user.displayName}
                          ></img>
                        </a>
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
        </>
      ) : (
        ""
      )}
    </>
  );
};
