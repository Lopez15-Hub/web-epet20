import React from "react";
import { Link } from "react-router-dom";

export const DropdownGeneral = ({ showMenu }) => {
  return (
    <div class="dropdown">
      <Link
        class="nav-element font-bold   dropdown-toggle"
        to="/"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Más
      </Link>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <Link
            onClick={() => showMenu}
            to="plan-de-estudios"
            className="nav-element font-bold"
          >
            Plan de estudios
          </Link>
        </li>
        <li>
          <a
            href="https://regular.neuquen.gob.ar/Inscripciones2021/servlet/com.certiregu.verificatramite"
            className="nav-element font-bold"
          >
            ¿Estoy inscripto?
          </a>
        </li>
      </ul>
    </div>
  );
};
