import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Title } from '../components/text-styles/title';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { Loading } from '../components/admin_panel/sections/loading';
import { Alert } from 'reactstrap';
import { handleRoute } from '../actions/handleRoute';
import { useDispatch } from 'react-redux';
import { signInWithGoogle, signUp } from '../actions/auth';
import { useForm } from '../hooks/useForm';
export const Registro = () => {
    const { userId } = useParams();
    const dispatch = useDispatch()


    const navigate = useNavigate();
    const { handleChange, values } = useForm();
    const [isLoading, setLoading] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const { password, role, apellido, email, name } = values;
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
        dispatch(signUp(email, password, name, apellido))



        // if (signUp) {
        //     await addDoc(collection(db, "users"), {
        //         name: name,
        //         apellido: apellido,
        //         email: email,
        //         password: password,
        //         role: 'usuario',
        //     }, isLoad(true));
        //     console.log('usuario creado');
        // }





        // console.log("Usuario añadido")
        // handleRoute(navigate, role)
    }

    const handleGoogle = async e => {

        e.preventDefault();
        dispatch(signInWithGoogle())

    }
    return (

        <>

            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {isSuccess ? <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Alert variant="success">Registro completo</Alert></motion.div> : null}
                <div className="container">

                    <div className="row m-6 ">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4"></div>
                        <div className="mt-4 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4  shadow-lg">
                            <div className="mt-4">
                                <Title text="Registráte y ¡Sé parte de nuestra comunidad!" />
                            </div>

                            <form className=" p-6" onSubmit={handleSubmit}>
                                <div class="mb-3 row">
                                    <div class="col-sm-6">
                                        <label for="exampleInputEmail1" className="form-label font-bold main-color">Nombre</label>
                                        <input type="text" name='name' onChange={handleChange} class="form-control shadow-md " placeholder="Juan" />
                                    </div>
                                    <div class="col-sm-6">
                                        <label for="exampleInputEmail1" className="form-label font-bold main-color">Apellido</label>
                                        <input type="text" name='apellido' onChange={handleChange} class="form-control shadow-md" placeholder="Perez" />
                                    </div>
                                </div>
                                <div className="mb-3 form-group">
                                    <label for="exampleInputEmail1" className="form-label font-bold main-color">Email</label>
                                    <input type="email" name='email' onChange={handleChange} placeholder="juanperez@gmail.com" className="form-control shadow-md" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="mb-3 form-group">
                                    <label for="exampleInputPassword1" className="form-label main-color font-bold">Contraseña</label>
                                    <input type="password" name='password' onChange={handleChange} placeholder="********" aria-invalid="true" className="form-control shadow-md" id="exampleInputPassword1" />
                                    <div id="emailHelp" className="form-text">Debe tener cómo mínimo 8 carácteres</div>
                                    <label for="exampleInputPassword1" className="form-label main-color font-bold">Repetir contraseña</label>
                                    <input type="password" placeholder="********" className="form-control shadow-md" id="exampleInputPassword1" />
                                </div>

                                <div>
                                    <button type="submit" onClick={() => isLoad(true)} className=" col-12 btn my-btn text-white text-center shadow-md font-bold btn-block">Registrarse</button>
                                    <Link to="/login" type="button" className=" col-12 my-outlined-button mt-3 text-center font-bold rounded-md shadow-md">Iniciar sesión</Link>

                                    <button type="submit" onClick={handleGoogle} className="col-12 my-outlined-button mt-3 text-center font-bold rounded-md shadow-md">Ingresar con Google</button>

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
