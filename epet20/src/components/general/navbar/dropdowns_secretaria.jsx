import React from "react";
import { Link } from "react-router-dom";

export const DropdownSecretaria = () => {
  return (
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
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
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
  );
};
export const DropdownOptionsSecretaria = ({ click }) => {
  return (
    <>
      <div className="border-bottom">
        <Link onClick={click} to="secretaria/anuncios" className="nav-element ">
          Anuncios
        </Link>
        <Link onClick={click} to="secretaria/docentes" className="nav-element ">
          Docentes
        </Link>
        <Link
          onClick={click}
          to="secretaria/estudiantes"
          className="nav-element "
        >
          Estudiantes
        </Link>
        <Link onClick={click} to="secretaria/general" className="nav-element">
          General
        </Link>
      </div>
    </>
  );
};
