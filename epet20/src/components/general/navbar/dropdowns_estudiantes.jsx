import React from "react";
import { Link } from "react-router-dom";

export const DropdownEstudiantes = () => {
  return (
    <div className="dropdown">
      <Link
        className="nav-element font-bold   dropdown-toggle"
        to="/"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Estudiantes
      </Link>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <Link className="dropdown-item col-sm-12" to="estudiantes/ed-fisica">
            Educación Física
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="estudiantes/taller">
            Taller
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="estudiantes/teoria">
            Teoría
          </Link>
        </li>
      </ul>
    </div>
  );
};

export const DropdownOptions = ({click}) => {
  return (
    <>
      <div className="border-bottom">
        <Link onClick={click} to="/estudiantes/ed-fisica" className="nav-element ">
          Educación Física
        </Link>
        <Link onClick={click} to="/estudiantes/taller" className="nav-element ">
          Taller
        </Link>
        <Link onClick={click} to="/estudiantes/teoria" className="nav-element">
          Teoría
        </Link>
      </div>
    </>
  );
};


export const DropdownsAdminEstudiantes = ({click}) => {
  return (
    <>
    <div className="border-bottom">
      <Link onClick={click} to="./estudiantes/admin" className="nav-element ">
        Administrar
      </Link>
      <Link onClick={click} to="./estudiantes/upload" className="nav-element ">
        Añadir un archivo
      </Link>
    </div>
  </>
  )
}