import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Title } from '../../text-styles/title'
import { addDoc, collection } from "firebase/firestore";
import db from '../../../firebase/firebaseConfig';
import { useParams } from 'react-router-dom';
import { Loading } from './loading';
import { Alert } from 'reactstrap';
export const Form = () => {
    const { userId } = useParams();
    console.log(userId);
    const initialState = {
        name: '',
        apellido: '',
        email: '',
        password: '',
        role: '',
    }


    const [user, setUser] = useState(initialState)

    const [isLoading, setLoading] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const isLoad = (loading) => {
        setLoading(loading);
        setTimeout(() => {

            setLoading(false);
            Success(true);

        }, 3000);

    }
    const Success = (success) => {
        setSuccess(success);
        setTimeout(() => {

            setSuccess(false);


        }, 3000);

    }


    const handleSubmit = async e => {
        e.preventDefault();
        console.log(user)
        await addDoc(collection(db, "users"), {
            name: user.name + ' ' + user.apellido,
            email: user.email,
            phone: user.phone,
            password: user.password,
            role: user.role,

        });
        console.log("Usuario añadido")
        window.location.reload();
    }
    const handleChange = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    return (
        <>

            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

                <div className="container">
                    {isSuccess ? <Alert variant="success">Usuario añadido exitosamente</Alert> : null}
                    <div className="row m-6 ">
                        <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3"></div>
                        <div className="mt-4 col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="mt-4">
                                <Title text="Añadir un usuario" />
                            </div>

                            <form className=" p-6" onSubmit={handleSubmit} >
                                <div class="mb-3 row">
                                    <div class="col-sm-6">
                                        <label for="exampleInputEmail1" className="form-label font-bold main-color">Nombre</label>
                                        <input onChange={handleChange} type="text" class="form-control shadow-md " placeholder="Juan" name='name' />
                                    </div>
                                    <div className="col-sm-6">
                                        <label for="exampleInputEmail1" className="form-label font-bold main-color">Apellido</label>
                                        <input onChange={handleChange} type="text" class="form-control shadow-md" placeholder="Perez" name='apellido' />
                                    </div>
                                </div>
                                <div className="mb-3 form-group">
                                    <label for="exampleInputEmail1" className="form-label font-bold main-color">Email</label>
                                    <input onChange={handleChange} type="email" placeholder="juanperez@gmail.com" className="form-control shadow-md" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' />

                                </div>
                                <div className="mb-3 form-group">
                                    <label for="exampleInputEmail1" className="form-label font-bold main-color">Teléfono</label>
                                    <input onChange={handleChange} type="text" className="form-control shadow-md" name='phone' />

                                </div>
                                <div className="mb-3 form-group">
                                    <label for="exampleInputPassword1" className="form-label main-color font-bold">Contraseña</label>
                                    <input onChange={handleChange} type="password" placeholder="********" aria-invalid="true" minLength={8} className="form-control shadow-md" id="exampleInputPassword1" name='password' />
                                    <div id="emailHelp" className="form-text">Debe tener cómo mínimo 8 carácteres</div>
                                    <label for="exampleInputPassword2" className="form-label main-color font-bold">Repetir contraseña</label>
                                    <input onChange={handleChange} type="password" placeholder="********" className="form-control shadow-md" minLength={8} id="exampleInputPassword1" />

                                </div>


                                <div>
                                    <label for="exampleInputPassword1" className="form-label main-color font-bold">Rol de usuario</label>
                                    <select onChange={handleChange} class="form-select mb-4 shadow-md" aria-label="Default select example" name='role'>
                                        <option selected>Seleccione un rol</option>
                                        <option value="administrador">Administrador</option>
                                        <option value="direccion">Dirección</option>
                                        <option value="preceptoria">Preceptoría</option>
                                        <option value="secretaria">Secretaría</option>
                                    </select>
                                    <button type="submit" className=" col-12 btn my-btn text-white text-center shadow-md font-bold btn-block" onClick={() => isLoad(true)} >Añadir</button>
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
