import React, { useEffect, useState } from "react";
import "./custom_navbar.css";
import { Link } from "react-router-dom";
import Menu from "../../../assets/menu.png";
import Icon from "../../../assets/favicon.png";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";

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
    <nav className="my-navbar shadow-xl container-fluid rounded-b-xl navbar me-auto mb-4">
      <div className="menu rounded-b-xl ">
        <div className="display-bar ">
          <div className="brand ">
            <div className="brand-items p-2">
              <button onClick={() => showMenu()} className=" hide-inPc">
                <h1 className="menu-icon font-bold">|||</h1>
              </button>
              <img src={Icon} className="hide-inMobile shadow-md rounded-xl" />
              <h1 className="main-color font-bold navbar-brand ml-7">
                <Link to="/inicio"> E.P.E.T. N°20</Link>
              </h1>
              {user.displayName !== "" ? (
                <Link to="/admin" className="img-profile-min hide-inPc">
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
            <div id="menu" className="elements ">
              <div className="items">
                <Link to="novedades" className="nav-element font-bold ">
                  Novedades
                </Link>
                <div class="dropdown">
                  <Link
                    class="nav-element font-bold   dropdown-toggle"
                    to="/"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Estudiantes
                  </Link>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link class="dropdown-item" to="estudiantes/ed-fisica">
                        Educación Física
                      </Link>
                    </li>
                    <li>
                      <Link class="dropdown-item" to="estudiantes/taller">
                        Taller
                      </Link>
                    </li>
                    <li>
                      <Link class="dropdown-item" to="estudiantes/teoria">
                        Teoría
                      </Link>
                    </li>
                  </ul>
                </div>
                <div class="dropdown">
                  <Link
                    class="nav-element font-bold   dropdown-toggle"
                    to="/"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Secretaría
                  </Link>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link class="dropdown-item" to="secretaria/anuncios">
                        Anuncios
                      </Link>
                    </li>
                    <li>
                      <Link class="dropdown-item" to="secretaria/estudiantes">
                        Estudiantes
                      </Link>
                    </li>
                    <li>
                      <Link class="dropdown-item" to="secretaria/docentes">
                        Docentes
                      </Link>
                    </li>
                    <li>
                      <Link class="dropdown-item" to="secretaria/general">
                        General
                      </Link>
                    </li>
                  </ul>
                </div>

                <Link to="contacto" className="nav-element font-bold">
                  Contacto
                </Link>
                <Link to="plan-de-estudios" className="nav-element font-bold">
                  Plan de estudios
                </Link>
                <a
                  href="https://regular.neuquen.gob.ar/Inscripciones2021/servlet/com.certiregu.verificatramite"
                  className="nav-element font-bold"
                >
                  ¿Estoy inscripto?
                </a>
                {user.displayName != "" ? (
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
                    <img src={user.photoUrl} className=" img-profile-nav"></img>
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
