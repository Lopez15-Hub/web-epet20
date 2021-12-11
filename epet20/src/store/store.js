// Este archivo crea el store de redux
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducers/authReducer';
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;



/*
Reducers es utilizado para definir 
varios reducers en un solo archivo
*/
const reducers = combineReducers({
    auth: authReducer
});

//Exportamos el store de redux que contiene los reducers
export const store = createStore(reducers,composeEnhancers(applyMiddleware(thunk)));