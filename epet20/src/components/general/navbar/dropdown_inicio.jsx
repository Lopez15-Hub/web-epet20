import React from "react";
import { Link } from "react-router-dom";

export const DropdownInicio = ({ click }) => {
  return (
    <>
      <div className="border-bottom">
        <Link onClick={click} to="./inicio" className="nav-element ">
          Editar datos generales
        </Link>
        <Link onClick={click} to="./inicio/images" className="nav-element ">
          Editar imágenes del slider
        </Link>
      </div>
    </>
  );
};
