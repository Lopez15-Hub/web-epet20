import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/inicio/navbar'
import { Title } from '../components/text-styles/title';
import { Link } from 'react-router-dom';
export const Registro = () => {
    return (
        <>
            <Navbar />
            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

                <div className="container">

                    <div className="row m-6 ">
                        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4"></div>
                        <div className="mt-4 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4  shadow-lg">
                            <div className="mt-4">
                                <Title text="Registráte y ¡Sé parte de nuestra comunidad!" />
                            </div>

                            <form className=" p-6">
                                <div class="mb-3 row">
                                <div class ="col-sm-6">
                                <label for="exampleInputEmail1" className="form-label font-bold main-color">Nombre</label>
                                <input type ="text"  class ="form-control shadow-md " placeholder="Juan"/>
                                </div>
                                <div class ="col-sm-6">
                                <label for="exampleInputEmail1" className="form-label font-bold main-color">Apellido</label>
                                <input type ="text"  class ="form-control shadow-md" placeholder="Perez"/>
                                </div>
                                </div>
                                <div className="mb-3 form-group">
                                <label for="exampleInputEmail1" className="form-label font-bold main-color">Email</label>
                                <input type ="email" placeholder="juanperez@gmail.com" className="form-control shadow-md" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                </div>
                                <div className="mb-3 form-group">
                                <label for="exampleInputPassword1" className="form-label main-color font-bold">Contraseña</label>
                                <input type ="password" placeholder="********" aria-invalid="true" className="form-control shadow-md" id="exampleInputPassword1" />
                                <div id="emailHelp" className="form-text">Debe tener cómo mínimo 8 carácteres</div>
                                <label for="exampleInputPassword1"  className="form-label main-color font-bold">Repetir contraseña</label>
                                <input type ="password" placeholder="********"  className="form-control shadow-md" id="exampleInputPassword1" />
                                </div>

                                <div>
                                <button type ="submit" className=" col-12 btn my-btn text-white text-center shadow-md font-bold btn-block">Registrarse</button>
                                <Link to="/login" type="button" className=" col-12 my-outlined-button mt-3 text-center font-bold rounded-md shadow-md">Iniciar sesión</Link>

                                <Link to="/login" type="button"   className="col-12 my-outlined-button mt-3 text-center font-bold rounded-md shadow-md">Ingresar con Google</Link>


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
