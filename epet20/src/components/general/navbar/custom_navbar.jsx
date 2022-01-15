import React, { useEffect, useState } from "react";
import "./custom_navbar.css";
import { Link } from "react-router-dom";
import Icon from "../../../assets/favicon.png";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
export const MyNavbar = () => {
  const [user, setUser] = useState({
    photoUrl: "",
    displayName: "",
  });
  const [menu, setMenu] = useState(true);
  const [screenWidth, setWidth] = useState(window.innerWidth);
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
          photoUrl: Icon,
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
  /*
    Navbar ES LA SECCIÓN DE 
    LA PÁGINA DONDE SE ENCUENTRA 
    EL LOGO Y EL MENÚ DE NAVEGACIÓN
    */

  return (
    <nav className="my-navbar shadow-xl container-fluid rounded-xl navbar">
      <div className="menu rounded-md">
        <div className="display-bar ">
          <div className="brand ">
            <div className="brand-items">
              <img
                src={Icon}
                className="shadow-xl rounded-xl logo "
                alt="Logo"
              />

              <h1 className="main-color font-bold navbar-brand ml-7">
                <Link to="/inicio"> E.P.E.T. N°20</Link>
              </h1>
              <button
                onClick={() => showMenu()}
                className=" hide-inPc img-profile-min"
              >
                <img
                  className="shadow-xl rounded-xl "
                  src={user.photoUrl}
                  alt={"Foto de perfil de " + user.displayName}
                />
              </button>
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
                <Link to="estudiantes" className="nav-element font-bold">
                  Estudiantes
                </Link>
                <Link to="secretaria" className="nav-element font-bold">
                  Secretaría
                </Link>
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
                      className="btn btn-block btn-primary mt-2 font-bold hide-inPc"
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      to="registro"
                      className="btn btn-outline-primary mt-2 btn-block font-bold hide-inPc"
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
