/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./custom_navbar.css";
import { Link } from "react-router-dom";
import Icon from "../../../assets/favicon.png";
import "./custom_navbar.css";
import Menu from "../../../assets/menu.png";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
export const HeaderNav = ({ click, disable }) => {
  return (
    <>
      <nav className="my-navbar hide-inPc">
        <div className=" full-width">
          <div className="display-bar ">
            <div className="brand">
              <div className="brand-items p-2">
                <button onClick={click} className=" hide-inPc">
                  <h1 className="menu-icon font-bold">|||</h1>
                </button>
                <img
                  src={Icon}
                  className="hide-inMobile shadow-md rounded-xl logo"
                  alt="logo"
                />
                <h1 className=" main-color font-bold navbar-brand text-center pl-5 ml-5">
                  <Link onClick={disable} to="/inicio">
                    {" "}
                    E.P.E.T. N°20
                  </Link>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export const HeaderNavAdmin = ({ click, disable, currentRole }) => {
  /* eslint-disable jsx-a11y/anchor-is-valid */

  const [user, setUser] = useState({
    photoUrl: "",
    displayName: "",
  });
  useEffect(() => {
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
  return (
    <>
      <nav className="my-navbar hide-inPc">
        <div className=" full-width">
          <div className="display-bar ">
            <div className="brand ">
              <div className="brand-items p-2">
                <button onClick={click} className=" hide-inPc">
                  <h1 className="menu-icon font-bold">|||</h1>
                </button>
                <img
                  src={Icon}
                  className="hide-inMobile shadow-md rounded-xl logo "
                  alt="logo"
                />
                <h1 className=" main-color font-bold text-center pl-5 ml-5">
                  <Link onClick={disable} to="/inicio">
                    {" "}
                    Volver a inicio
                  </Link>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
