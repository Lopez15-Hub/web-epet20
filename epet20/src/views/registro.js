import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Title } from '../components/text-styles/title';
import { Link, useNavigate } from 'react-router-dom';

import { LoadingSpinner } from '../components/general/loading';

import { useDispatch } from 'react-redux';
import { getErrorMessage, signInWithGoogle, signUp } from '../actions/auth';
import { useForm } from '../hooks/useForm';
import { AlertNotification } from '../components/general/alertNotification';
import { UseLoading } from '../hooks/useLoading';
import { auth } from '../firebase/firebaseConfig';
import { handleRoute } from '../actions/handleRoute';
import { onAuthStateChanged } from 'firebase/auth';
export const Registro = () => {
    const dispatch = useDispatch();
    const { handleChange, values } = useForm();
    const { loading, success, error, warning, alertMessage, setLoading, setSuccess, setError, setWarning, setAlertMessage } = UseLoading();

    const { password, apellido, email, name } = values;
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(dispatch(signUp(email, password, name, apellido)))
    }
    const handleGoogle = async e => {
        e.preventDefault();
        setLoading(true);
        dispatch(signInWithGoogle());

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setAlertMessage("Sesión iniciada correctamente.");
                setLoading(false);
                setSuccess(true);

                setTimeout(() => {
                    console.log("Sesión iniciada");
                    setSuccess(false);
                    handleRoute(navigate, 'usuario');
                }, 2000)

            } else {
                console.log(alertMessage)

            }

        })







    }

    return (

        <>

            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="container">

                    <div className="row m-6 ">
                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4"></div>
                        <div className="mt-4 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4  shadow-lg">
                            <div className="mt-4">
                                <Title text="Registráte y ¡Sé parte de nuestra comunidad!" />
                            </div>
                            <div>
                                {success ?
                                    <AlertNotification variant="success" dimiss={() => setSuccess(false)} message={alertMessage} /> :
                                    error ? <AlertNotification color="danger" dimiss={() => setError(false)} message={alertMessage} /> : warning ?
                                        <AlertNotification color="warning" dimiss={() => setWarning(false)} message={alertMessage} /> : ''
                                }
                            </div>
                            <form className=" p-6" onSubmit={handleSubmit}>
                                <div className="mb-3 row">
                                    <div className="col-sm-6">
                                        <label htmlFor="exampleInputEmail1" className="form-label font-bold main-color">Nombre</label>
                                        <input type="text" name='name' onChange={handleChange} className="form-control shadow-md " placeholder="Juan" />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="exampleInputEmail1" className="form-label font-bold main-color">Apellido</label>
                                        <input type="text" name='apellido' onChange={handleChange} className="form-control shadow-md" placeholder="Perez" />
                                    </div>
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="exampleInputEmail1" className="form-label font-bold main-color">Email</label>
                                    <input type="email" name='email' onChange={handleChange} placeholder="juanperez@gmail.com" className="form-control shadow-md" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="exampleInputPassword1" className="form-label main-color font-bold">Contraseña</label>
                                    <input type="password" name='password' onChange={handleChange} placeholder="********" aria-invalid="true" className="form-control shadow-md" id="exampleInputPassword1" />
                                    <div id="emailHelp" className="form-text">Debe tener cómo mínimo 8 carácteres</div>
                                    <label htmlFor="exampleInputPassword1" className="form-label main-color font-bold">Repetir contraseña</label>
                                    <input type="password" placeholder="********" className="form-control shadow-md" id="exampleInputPassword1" />
                                </div>

                                <div>
                                    <button type="submit" className=" col-12 btn my-btn text-white text-center shadow-md font-bold btn-block">Registrarse</button>
                                    <Link to="/login" type="button" className=" col-12 my-outlined-button mt-3 text-center font-bold rounded-md shadow-md">Iniciar sesión</Link>

                                    <button type="submit" onClick={handleGoogle} className="col-12 my-outlined-button mt-3 text-center font-bold rounded-md shadow-md">Ingresar con Google</button>

                                </div>

                            </form>
                        </div>
                        {loading ? <LoadingSpinner text={handleGoogle ? 'Ingresando con google' : "Creando el usuario.."} /> : null}
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"></div>
                    </div>

                </div>
            </motion.div>
        </>
    )
}
