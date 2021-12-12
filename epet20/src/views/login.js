import React from 'react'
import { motion } from 'framer-motion'
import { Title } from '../components/text-styles/title';
import { Link, useNavigate } from 'react-router-dom';
import { useGet } from '../hooks/query_hooks/useGet';
import { handleRoute } from '../actions/handleRoute';
import { useForm } from '../hooks/useForm';
import { useDispatch } from 'react-redux';
import { signInWithGoogle, signIn } from '../actions/auth';

export const Login = () => {
    const dispatch = useDispatch();
    const { users } = useGet();
    const { values, handleChange } = useForm(

    );
    const { email, password } = values;
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        dispatch(signIn(email, password));
    }
    const handleGoogle = async e => {
        e.preventDefault();
        dispatch(signInWithGoogle());
    }


    return (

        <>

            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

                <div className="container">

                    <div className="row m-6 ">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4"></div>
                        <div className="mt-4 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4  shadow-lg">
                            <div className="mt-4">
                                <Title text="Iniciar sesión" />
                            </div>

                            <form className=" p-6 " onSubmit={handleSubmit}>
                                <div className=" form-group">
                                    <label for="exampleInputEmail1" className="form-label font-bold main-color">Email</label>
                                    <input type="email" name='email' onChange={handleChange} value={email} className="form-control shadow-md" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <div id="emailHelp" className="form-text">Ingresa tu email</div>
                                </div>
                                <div className="mb-3 form-group">
                                    <label for="exampleInputPassword1" className="form-label main-color font-bold">Contraseña</label>
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
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"></div>
                    </div>

                </div>
            </motion.div>
        </>
    )
}
