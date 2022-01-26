import { motion } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import { Title } from '../../text-styles/title'
import { addDoc, collection, getDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from '../../../firebase/firebaseConfig';
import { useParams } from 'react-router-dom';
import { Loading } from './loading';

import { useForm } from '../../../hooks/useForm';
import { AlertNotification } from '../../general/alertNotification';

import { useLoading } from '../../../hooks/useLoading';
export const Form = ({ currentRole }) => {
    const { userId } = useParams();
    const [user, setUser] = useState({});


    useEffect(() => {
        let mounted = true;
        const getUser = async () => {
            if (userId) {
                const usersRef = doc(db, "users", userId);
                const docSnap = await getDoc(usersRef);
                try {
                    if (docSnap.exists()) {

                        const initialState = {
                            name: docSnap.data().name || "",
                            apellido: docSnap.data().apellido || "",
                            email: docSnap.data().email || "",
                            password: docSnap.data().password || "",
                            phone: docSnap.data().phone || "",
                            role: docSnap.data().role || "",

                        }
                        setUser(initialState)
                        console.log(initialState.role)
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                } catch (e) { console.log(e) }

            } else {
            }

        }
        if (mounted) {
            getUser();
        }
        return () => mounted = false;
    }, [userId, user, setUser]);

    const { handleChange, values } = useForm(
        user
    );
    const { name, apellido, email, password, phone, role } = values;
    const { loading, success, error, warning, alertMessage, setLoading, setSuccess, setError, setWarning, setAlertMessage, restartAlertsState } = useLoading();

    const handleSubmit = async e => {
        e.preventDefault();
        if (userId) {
            const usersRef = doc(db, "users", userId);
            if (name || apellido || email || password || phone || role) {
                setDoc(usersRef, {

                    name: name ? name : user.name,
                    apellido: apellido ? apellido : user.apellido,
                    email: email ? email : user.email,
                    phone: phone ? phone : user.phone,
                    password: password ? password : user.password,
                    role: role ? role : user.role,



                }, { merge: true }).then(() => {

                    setAlertMessage("Usuario actualizado exitosamente.")
                    console.log("Usuario actualizado")
                    setLoading(false);
                    setSuccess(true);
                    restartAlertsState();


                }).catch(err => {
                    setAlertMessage("Ha ocurrido un error: ", err.code)
                    setLoading(false);
                    setError(true);
                    restartAlertsState();
                });

            } else {
                setAlertMessage("Debe editar al menos un campo.")
                setLoading(false);
                setWarning(true);
                restartAlertsState();
            }

        } else {
            if (!email || !password || !name || !apellido || !phone || !role) {
                setAlertMessage("Todos los campos son obligatorios.")
                setLoading(false);
                setWarning(true);
                restartAlertsState();
            } else {
                await addDoc(collection(db, "users"), {
                    name: name,
                    apellido: apellido,
                    email: email,
                    phone: phone,
                    password: password,
                    role: role,

                }).then(() => {
                    auth.createUserWithEmailAndPassword(email, password).then(() => {
                        setAlertMessage("Usuario creado exitosamente.")
                        setLoading(false);
                        setSuccess(true);
                        restartAlertsState();
                    }).catch(err => {
                        setAlertMessage("Ha ocurrido un error: ", err.code)
                        setLoading(false);
                        setError(true);
                        restartAlertsState();
                    })
                    setAlertMessage("Usuario creado exitosamente.")
                    setLoading(false);
                    setSuccess(true);

                }).catch(err => {
                    setAlertMessage("Ha ocurrido un error: ", err.code)
                    setLoading(false);
                    setError(true);
                    restartAlertsState();
                });
            }



        }
    }



    return (
        <>

            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

                <div className="container">
                    {success ?
                        <AlertNotification variant="success" dimiss={() => setSuccess(false)} message={alertMessage} /> :
                        error ? <AlertNotification color="danger" dimiss={() => setError(false)} message={alertMessage} /> : warning ?
                            <AlertNotification color="warning" dimiss={() => setWarning(false)} message={alertMessage} /> : ''
                    }
                    <div className="row m-6 ">
                        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3"></div>
                        <div className="mt-4 col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="mt-4">
                                <Title text={userId ? "Editar usuario" : "Añadir un usuario"} />
                            </div>

                            <form className=" p-6" onSubmit={handleSubmit} >
                                <div className="mb-3 row">
                                    <div className="col-sm-6">
                                        <label htmlFor="exampleInputEmail1" className="form-label font-bold main-color">Nombre</label>
                                        <input onChange={handleChange} value={name} type="text" className="form-control shadow-md " placeholder={user.name ? user.name : ' '} name='name' />
                                    </div>
                                    <div className="col-sm-6">
                                        <label htmlFor="exampleInputEmail1" className="form-label font-bold main-color">Apellido</label>
                                        <input onChange={handleChange} value={apellido} type="text" className="form-control shadow-md" placeholder={user.name ? user.apellido : ' '} name='apellido' />
                                    </div>
                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="exampleInputEmail1" className="form-label font-bold main-color">Email</label>
                                    <input onChange={handleChange} value={email} type="email" placeholder={user.email ? user.email : " "} className="form-control shadow-md" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' />

                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="exampleInputEmail1" className="form-label font-bold main-color">Teléfono</label>
                                    <input onChange={handleChange} value={phone} placeholder={user.phone ? user.phone : "29955511444"} type="text" className="form-control shadow-md" name='phone' />

                                </div>
                                <div className="mb-3 form-group">
                                    <label htmlFor="exampleInputPassword1" className="form-label main-color font-bold">Contraseña</label>
                                    <input onChange={handleChange} type="password" placeholder={user.password ? "Nueva contraseña" : "********"} aria-invalid="true" minLength={8} className="form-control shadow-md" name='password' />
                                    <div className="form-text">Debe tener cómo mínimo 8 carácteres</div>
                                    <label htmlFor="exampleInputPassword2" className="form-label main-color font-bold">Repetir contraseña</label>
                                    <input onChange={handleChange} type="password" placeholder={user.password ? " " : "********"} className="form-control shadow-md" minLength={8} />

                                </div>


                                <div>
                                    <label htmlFor="exampleInputPassword1" className="form-label main-color font-bold">Rol de usuario</label>
                                    <select onChange={handleChange} value={role} className="form-select mb-4 shadow-md" aria-label="Default select example" name='role'>
                                        <option selected>{user.role ? user.role.toString().charAt(0).toUpperCase() + user.role.slice(1) + " (Rol actual)" : "Seleccione un rol"}</option>
                                        <option value="administrador">Administrador</option>
                                        <option value="direccion">Dirección</option>
                                        <option value="preceptoria">Preceptoría</option>
                                        <option value="secretaria">Secretaría</option>
                                        <option value="usuario">Usuario</option>
                                    </select>
                                    <button type="submit" className=" col-12 btn my-btn text-white text-center shadow-md font-bold btn-block" onClick={() => setLoading(true)} >{userId ? "Guardar cambios" : "Añadir"} </button>
                                    {loading ? <Loading text="Guardando usuario..." /> : null}

                                </div>

                            </form>

                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"></div>
                    </div>

                </div>

            </motion.div>
        </>
    )
}
