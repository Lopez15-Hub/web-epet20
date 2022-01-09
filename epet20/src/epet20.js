
import './App.css';
import React, { useEffect } from "react";
import { AppRouter } from './routers/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { auth } from './firebase/firebaseConfig';
export const Epet20 = () => {
  const getAuthState = () => {
    auth.onAuthStateChanged(async (user) => {
      setTimeout(() => {
        user.reload();
      }, 10000);
      if (user) {

      }

    });
  }
  useEffect(() => {
    if (auth.currentUser) {
      getAuthState();
    }




  });
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>

  );

}


