import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
        email: action.payload.email,
        photoURL: action.payload.photoURL,
      };
    case types.logout:
      return {};
    default:
      return state;
  }
}

export const regReducer = (state = {}, action) => {
  switch (action.type) {
    case types.register:
      return {
        nombre: action.payload.nombre,
        apellido: action.payload.apellido,
        email: action.payload.email,
        contraseña: action.payload.contraseña,
      }
    default:
      return state;
  }
}