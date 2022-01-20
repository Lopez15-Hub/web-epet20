import React from 'react'
import { motion } from 'framer-motion'
import { Title } from '../components/text-styles/title';
import { Link, useNavigate } from 'react-router-dom';
import { handleRoute } from '../actions/handleRoute';
import { useForm } from '../hooks/useForm';
import { useDispatch } from 'react-redux';
import { signInWithGoogle } from '../actions/auth';
import { Loading } from '../components/admin_panel/sections/loading';
import { auth, db } from '../firebase/firebaseConfig';
import { AlertNotification } from '../components/general/alertNotification';
import { onAuthStateChanged } from 'firebase/auth';
import { UseLoading } from '../hooks/useLoading';
import { deleteDoc, doc, getDoc } from "firebase/firestore";



export const deleteUser = async (id) => {

    const userRef = doc(db, 'users', id);
    await deleteDoc(userRef).then(() => {
        window.alert("Usuario eliminado correctamente.");


        window.location.reload();
    }).catch(err => {
        console.log(err);
    });



}


export const Login = () => {
    const dispatch = useDispatch();
    const { values, handleChange } = useForm(

    );
    const searchUserInFirestore = async (id) => {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Usuario encontrado");
            navigate('/');
        } else {


            console.log("Usuario no encontrado");
            deleteUser(auth.currentUser.uid);
            auth.currentUser.delete().then(function () {
                console.log("Usuario eliminado");
                setLoading(false);
                setAlertMessage("Ha ocurrido un error: El usuario no existe.");
                setError(true);
                restartAlertsState();
            }).catch(function (error) { console.log(error); })


        }
    }

    const { loading, success, error, warning, alertMessage, setLoading, setSuccess, setError, setWarning, setAlertMessage, restartAlertsState } = UseLoading();


    const { email, password } = values;
    const navigate = useNavigate();
    const signIn = (email, password) => {
        auth.signInWithEmailAndPassword(email, password).then(user => {
            if (user) {
                searchUserInFirestore(auth.currentUser.uid);

            }
        }).catch(function (error) {
            if (error.code === 'auth/user-not-found') {
                setLoading(false);
                setAlertMessage("Ha ocurrido un error: El usuario no existe.");
                setError(true);
                restartAlertsState();

            } else if (error.code === 'auth/wrong-password') {
                setLoading(false);
                setAlertMessage("Ha ocurrido un error: La contraseña es incorrecta.");
                setError(true);
                restartAlertsState();
            } else {
                setLoading(false);
                setAlertMessage("Ha ocurrido un error: " + error.message);
                setError(true);
                restartAlertsState()
            }
        });
    }
    const handleSubmit = async e => {
        e.preventDefault();
        if (email && password) {
            setLoading(true);
            signIn(email, password);

            // setTimeout(() => {
            //     if (auth.currentUser != null) {
            //         setLoading(false);
            //         setSuccess(true);
            //         setAlertMessage("Sesión iniciada correctamente.");
            //         setTimeout(() => {

            //             console.log("Sesión iniciada");
            //             setSuccess(false);
            //             handleRoute(navigate, 'usuario');
            //         }, 2000)
            //     } else {
            //         setAlertMessage("Error:Usuario o contraseña incorrectos.");
            //         setLoading(false);
            //         setError(true);
            //         restartAlertsState();

            //     }
            // }, 3000)
        } else {
            setAlertMessage("Debe ingresar un usuario y contraseña");
            setLoading(false);
            setWarning(true);
            restartAlertsState();

        }

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
                                <Title text="Iniciar sesión" />
                            </div>
                            <div>
                                {success ?
                                    <AlertNotification variant="success" dimiss={() => setSuccess(false)} message={alertMessage} /> :
                                    error ? <AlertNotification color="danger" dimiss={() => setError(false)} message={alertMessage} /> : warning ?
                                        <AlertNotification color="warning" dimiss={() => setWarning(false)} message={alertMessage} /> : ''
                                }
                            </div>
                            <form className=" p-6 " onSubmit={handleSubmit}>
                                <div className=" form-group">
                                    <label htmlFor="exampleInputEmail1" className="form-label font-bold main-color">Email</label>
                                    <input type="email" name='email' onChange={handleChange} value={email} className="form-control shadow-md" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <div id="emailHelp" className="form-text">Ingresa tu email</div>
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="exampleInputPassword1" className="form-label main-color font-bold">Contraseña</label>
                                    <input type="password" name='password' value={password} onChange={handleChange} aria-invalid="true" className="form-control shadow-md" id="exampleInputPassword1" />
                                    <div id="emailHelp" className="form-text">ej: 12345678</div>
                                    <div className="row">
                                        <div className="col-6"></div>
                                        <div className="col-6">
                                            <a href="https://..." className="main-color  col-12 btn-block">¿Olvidaste tu contraseña?</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" for="exampleCheck1">Mantener inicado</label>
                                </div>
                                <div>
                                    <button onClick={handleSubmit} type="submit" className=" col-12 btn my-btn text-white text-center shadow-md font-bold btn-block">Iniciar sesión</button>
                                    <Link to="/registro" type="submit" className=" col-12 my-outlined-button mt-3 text-center font-bold rounded-md shadow-md">Registrarse</Link>


                                    <button onClick={handleGoogle} type='submit' className="col-12 my-outlined-button mt-3 text-center font-bold rounded-md shadow-md">Ingresar con Google</button>


                                </div>

                            </form>

                        </div>
                        {loading ? <Loading text="Iniciando sesión..." /> : null}
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"></div>
                    </div>

                </div>
            </motion.div>
        </>
    )
}
