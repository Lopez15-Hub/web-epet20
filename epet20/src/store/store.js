// Este archivo crea el store de redux
import { createStore, combineReducers } from 'redux';

import { authReducer } from '../reducers/authReducer';



/*
Reducers es utilizado para definir 
varios reducers en un solo archivo
*/
const reducers = combineReducers({
    auth: authReducer
});

//Exportamos el store de redux que contiene los reducers
export const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());