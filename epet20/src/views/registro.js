import React from 'react'
import { motion } from 'framer-motion'
import { Title } from '../components/text-styles/title';
import { Link, useNavigate } from 'react-router-dom';

import { LoadingSpinner } from '../components/general/loading';


import { useForm } from '../hooks/useForm';
import { AlertNotification } from '../components/general/alertNotification';
import { useLoading } from '../hooks/useLoading';
import { auth, db, googleAuth } from '../firebase/firebaseConfig';

import { GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { useEffect } from 'react';
export const handleProfile = (name, apellido) => {
    updateProfile(auth.currentUser, {
        displayName: name + " " + apellido,
    }).then(() => {
        console.log(auth.currentUser.photoURL)
    }).catch((error) => {

        console.log(error)
    });
}
export const addToFirestore = async (loginType, name, apellido, email, role) => {
    const usersRef = doc(db, 'users', auth.currentUser.uid)
    await setDoc(usersRef, {
        "name": name !== "" ? name : auth.currentUser.displayName,
        "apellido": apellido !== "" ? apellido : "",
        "email": email !== "" ? email : auth.currentUser.email,
        "role": role ? role : "Usuario",
        "loginType": loginType,


    }).then(() => {
        console.log("Usuario creado correctamente en la base de datos.");
        handleProfile(name, apellido);

    }).catch(err => {
        console.log("Ha ocurrido un error al guardar en la bd: ", err.code)
    });

}
export const Registro = () => {
    const { handleChange, values } = useForm();
    const { loading, success, error, warning, alertMessage, setLoading, setSuccess, setError, setWarning, setAlertMessage, restartAlertsState } = useLoading();

    const { password, apellido, email, name, passwordConfirm } = values;
    const navigate = useNavigate();

    const signUp = async () => {
        setLoading(true);
        await auth.createUserWithEmailAndPassword(email, password).then((user) => {
            if (user) {
                addToFirestore("FirebaseAuth", name, apellido, email);

                setLoading(false);
                setAlertMessage("Usuario registrado exitosamente.")
                setSuccess(true);

            } else {
                console.log("No se pudo crear el usuario");
            }
        }).catch(err => {
            if (err.code === "auth/email-already-in-use") {
                setAlertMessage("El correo ya está en uso.")
                setLoading(false);
                setWarning(true);
                restartAlertsState();
            } else {
                setAlertMessage("Ha ocurrido un error: ", err.code)
                setLoading(false);
                setError(true);
                restartAlertsState();
            }
        })
    }
    const signUpWithGoogle = async () => {
        setLoading(true);
        signInWithPopup(auth, googleAuth)
            .then(async (result) => {

                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                if (credential) {
                    addToFirestore("GoogleAuth");
                    console.log("Usuario registrado con Google exitosamente");
                    setLoading(false);
                    setAlertMessage("Usuario registrado con Google exitosamente.")
                    setSuccess(true);

                }

            }).catch((error) => {
                if (error.code === "auth/popup-closed-by-user") {
                    console.log("El usuario ha cerrado la ventana de autenticación.");
                    setLoading(false);
                    setAlertMessage("Registro con google cancelado.");
                    setWarning(true);
                    restartAlertsState();

                } else {
                    console.log(error);
                    setLoading(false);
                }
            });

    }
    const handleSubmit = async e => {
        e.preventDefault();
        if (!email || !password || !name || !apellido || !passwordConfirm) {
            setAlertMessage("Todos los campos son obligatorios.")
            setLoading(false);
            setWarning(true);
            restartAlertsState();
        } else if (name !== "" && apellido !== "" && email !== "" && password !== passwordConfirm && password.length > 8 && passwordConfirm.length > 8) {

            setAlertMessage("Las contraseñas no coinciden.")
            setLoading(false);
            setWarning(true);
            restartAlertsState();
        } else if (name !== "" && apellido !== "" && email !== "" && password.length < 8 && passwordConfirm.length < 8) {
            setAlertMessage("La contraseña debe tener al menos 8 caracteres.")
            setLoading(false);
            setWarning(true);
            restartAlertsState();
        } else {
            signUp(email, password, name, apellido);
        }
    }
    const handleGoogle = async e => {
        e.preventDefault();
        setLoading(true);
        signUpWithGoogle();
    }

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            document.title = "Registro";
            auth.onAuthStateChanged(user => {
                if (user) {
                    navigate("/");
                }
            })
        }
        return () => mounted = false;
    }, [navigate]);


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
                                        <input type="text" name='name' value={name || ''} onChange={handleChange} className="form-control shadow-md " placeholder="Juan" />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="exampleInputEmail1" className="form-label font-bold main-color">Apellido</label>
                                        <input type="text" name='apellido' value={apellido || ''} onChange={handleChange} className="form-control shadow-md" placeholder="Perez" />
                                    </div>
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="exampleInputEmail1" className="form-label font-bold main-color">Email</label>
                                    <input type="email" name='email' value={email || ''} onChange={handleChange} placeholder="juanperez@gmail.com" className="form-control shadow-md" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="exampleInputPassword2" className="form-label main-color font-bold">Contraseña</label>
                                    <input type="password" name='password' value={password || ''} onChange={handleChange} placeholder="********" aria-invalid="true" className="form-control shadow-md" id="exampleInputPassword2" />
                                    <div id="emailHelp" className="form-text">Debe tener cómo mínimo 8 carácteres</div>
                                    <label htmlFor="exampleInputPassword1" className="form-label main-color font-bold">Repetir contraseña</label>
                                    <input name="passwordConfirm" value={passwordConfirm || ''} onChange={handleChange} type="password" placeholder="********" className="form-control shadow-md" id="exampleInputPassword1" />
                                </div>

                                <div>
                                    <button type="submit" className=" col-12 btn my-btn text-white text-center shadow-md font-bold btn-block">Registrarse</button>
                                    <Link to="/login" type="button" className=" col-12 my-outlined-button mt-3 text-center font-bold rounded-md shadow-md">Iniciar sesión</Link>

                                    <button type="submit" onClick={handleGoogle} className="col-12 my-outlined-button mt-3 text-center font-bold rounded-md shadow-md">Ingresar con Google</button>

                                </div>

                            </form>
                        </div>
                        {loading ? <LoadingSpinner text={"Completando el registro..."} /> : null}
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"></div>
                    </div>

                </div>
            </motion.div>
        </>
    )
}
