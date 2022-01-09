import { motion } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import { Title } from '../../text-styles/title'
import { addDoc, collection, getDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from '../../../firebase/firebaseConfig';
import { useParams } from 'react-router-dom';
import { Loading } from './loading';
import { Alert } from 'reactstrap';
import { useForm } from '../../../hooks/useForm';
import { AlertNotification } from '../../general/alertNotification';
import { signInWithEmailAndPassword, updateCurrentUser, updateProfile } from 'firebase/auth';
export const Form = ({ currentRole }) => {
    const { userId } = useParams();
    const [user, setUser] = useState({});


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
            console.log("No userId");
        }

    }
    useEffect(() => {
        getUser()
        return () => {
        }
    }, [])

    const { handleChange, values } = useForm(
        user
    );
    const { name, apellido, email, password, phone, role } = values;
    const [isLoading, setLoading] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const isLoad = (loading) => {
        setLoading(loading);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 3000)
        }, 3000);

    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (userId) {
            const usersRef = doc(db, "users", userId);
            setDoc(usersRef, {

                name: name ? name : user.name,
                apellido: apellido ? apellido : user.apellido,
                email: email ? email : user.email,
                phone: phone ? phone : user.phone,
                password: password ? password : user.password,
                role: role ? role : user.role,



            }, { merge: true });
            updateProfile(userId, {
                displayName: name + ' ' + apellido,
                phoneNumber: phone,
                email: email,
            })

            console.log("Usuario actualizado")
            setTimeout(() => {
                window.location.replace("./");
            }, 3000)
        } else {
            await addDoc(collection(db, "users"), {
                name: name,
                apellido: apellido,
                email: email,
                phone: phone,
                password: password,
                role: role,

            });

            console.log("Usuario añadido")
        }
    }



    return (
        <>

            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

                <div className="container">
                    {isSuccess ? <AlertNotification variant="success" dimiss={() => setSuccess(false)} message={userId ? "Usuario editado correctamente" : "Usuario añadido"} /> : null}
                    <div className="row m-6 ">
                        <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3"></div>
                        <div className="mt-4 col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="mt-4">
                                <Title text={userId ? "Editar usuario" : "Añadir un usuario"} />
                            </div>

                            <form className=" p-6" onSubmit={handleSubmit} >
                                <div class="mb-3 row">
                                    <div class="col-sm-6">
                                        <label for="exampleInputEmail1" className="form-label font-bold main-color">Nombre</label>
                                        <textarea onChange={handleChange} value={name} type="text" class="form-control shadow-md " placeholder={user.name ? user.name : ' '} name='name' />
                                    </div>
                                    <div className="col-sm-6">
                                        <label for="exampleInputEmail1" className="form-label font-bold main-color">Apellido</label>
                                        <textarea onChange={handleChange} value={apellido} type="text" class="form-control shadow-md" placeholder={user.name ? user.apellido : ' '} name='apellido' />
                                    </div>
                                </div>
                                <div className="mb-3 form-group">
                                    <label for="exampleInputEmail1" className="form-label font-bold main-color">Email</label>
                                    <textarea onChange={handleChange} value={email} type="email" placeholder={user.email ? user.email : " "} className="form-control shadow-md" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' />

                                </div>
                                <div className="mb-3 form-group">
                                    <label for="exampleInputEmail1" className="form-label font-bold main-color">Teléfono</label>
                                    <textarea onChange={handleChange} value={phone} placeholder={user.phone ? user.phone : "29955511444"} type="text" className="form-control shadow-md" name='phone' />

                                </div>
                                <div className="mb-3 form-group">
                                    <label for="exampleInputPassword1" className="form-label main-color font-bold">Contraseña</label>
                                    <textarea onChange={handleChange} type="password" placeholder={user.password ? "Nueva contraseña" : "********"} aria-invalid="true" minLength={8} className="form-control shadow-md" id="exampleInputPassword1" name='password' />
                                    <div id="emailHelp" className="form-text">Debe tener cómo mínimo 8 carácteres</div>
                                    <label for="exampleInputPassword2" className="form-label main-color font-bold">Repetir contraseña</label>
                                    <textarea onChange={handleChange} type="password" placeholder={user.password ? " " : "********"} className="form-control shadow-md" minLength={8} id="exampleInputPassword1" />

                                </div>


                                <div>
                                    <label for="exampleInputPassword1" className="form-label main-color font-bold">Rol de usuario</label>
                                    <select onChange={handleChange} value={role} class="form-select mb-4 shadow-md" aria-label="Default select example" name='role'>
                                        <option selected>{user.role ? user.role.toString().charAt(0).toUpperCase() + user.role.slice(1) + " (Rol actual)" : "Seleccione un rol"}</option>
                                        <option value="administrador">Administrador</option>
                                        <option value="direccion">Dirección</option>
                                        <option value="preceptoria">Preceptoría</option>
                                        <option value="secretaria">Secretaría</option>
                                        <option value="usuario">Usuario</option>
                                    </select>
                                    <button type="submit" className=" col-12 btn my-btn text-white text-center shadow-md font-bold btn-block" onClick={() => isLoad(true)} >{userId ? "Guardar cambios" : "Añadir"} </button>
                                    {isLoading ? <Loading /> : null}

                                </div>

                            </form>

                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"></div>
                    </div>

                </div>

            </motion.div>
        </>
    )
}
