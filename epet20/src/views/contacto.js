import React from 'react'

import Navbar from '../components/inicio/navbar'
import { Subtitle } from '../components/text-styles/subtitle';
import { Title } from '../components/text-styles/title';
import Footer from '../components/inicio/footer';
import { motion } from 'framer-motion';
export const Contacto = () => {
    return (
        <>
            <Navbar />
            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container">
                <div className=" p-6 shadow-lg">
                    <Title text="Contactanos" />


                    <div className="d-flex ">
                        <div className="col-8">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12 "><Subtitle text="Horarios de atención" /></div>
                            <p className="col-xs-12 col-sm-12  col-md-4 col-xl-4">Lunes a viernes de 08:00 a 18:00</p>
                        </div>
                        <div className="col-6">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12 "><Subtitle text="Horarios de teoría" /></div>
                            <p className="col-xs-12 col-sm-12  col-md-6 col-xl-6 p-2">08:00 a 13:00 Turno mañana  - 08:00 a 13:30 Turno tarde</p>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12 "><Subtitle text="Horarios de taller" /></div>
                            <p className="col-xs-12 col-sm-12  col-md-6 col-xl-6 p-2">08:00 a 11:40 Turno mañana - 13:30 a 16:50 Turno tarde</p>
                        </div>
                    </div>
                    <div className="d-flex ">
                        <div className="col-8">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12 "><Subtitle text="Nuestro email" /></div>
                            <a href="mailto:epet20@gmail.com" className="col-xs-12 col-sm-12  col-md-4 col-xl-4  ">epet20@gmail.com</a>
                        </div>
                        <div className="col-6">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12 "><Subtitle text="Email de asesoría" /></div>
                            <a href="mailto:epet20@gmail.com" className="col-xs-12 col-sm-12  col-md-4 col-xl-4  ">epet20asesoria@gmail.com</a>

                        </div>
                    </div>
                    <hr className="mt-4" />
                    <div className="mt-4">



                        <div className="mb-2"> <Subtitle text="Redes sociales" /></div>
                        <div className="d-flex">
                            <div className="col-xs-12 col-sm-12 col-md-2 col-xl-2 "><Subtitle text="Instagram" /></div>
                            <a href="https://www.instagram.com/epet20educacion/" className="col-xs-12 col-sm-12  col-md-4 col-xl-4 ">@epet20educacion</a>
                        </div>
                        <div className="d-flex">
                            <div className="col-xs-12 col-sm-12 col-md-2 col-xl-2 "><Subtitle text="Facebook" /></div>
                            <a href="https://www.facebook.com/EPET20" className="col-xs-12 col-sm-12  col-md-4 col-xl-4 uppercase">Epet 20</a>
                        </div>
                        <div className="d-flex">
                            <div className="col-xs-12 col-sm-12 col-md-2 col-xl-2 "><Subtitle text="Twitter" /></div>
                            <a href="https://twitter.com/epet20educacion" className="col-xs-12 col-sm-12  col-md-4 col-xl-4">@epet20educacion</a>
                        </div>

                    </div>
                    <hr className="mt-4" />
                    <div>
                        <div className="mt-2 mb-4 font-bold"> <Subtitle text="Cómo llegar a nuestra escuela" /></div>
                        <div className="d-flex ">
                            <div className="col-8">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12 "><Subtitle text="Dirección del lugar" /></div>
                                <a href="https://www.google.com.ar/maps/place/Escuela+Provincial+de+Educaci%C3%B3n+T%C3%A9cnica+N%C2%B0+20/@-38.9648652,-68.0899264,17z/data=!3m1!4b1!4m5!3m4!1s0x960a33b795c819a7:0x65c00b69eb2c3f1d!8m2!3d-38.9647969!4d-68.0877371" className="col-xs-12 col-sm-12  col-md-4 col-xl-4  ">Lanin 2020</a>
                            </div>
                            <div className="col-6">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12 "><Subtitle text="Lineas de colectivo" /></div>
                                <p>Linea 4</p> <p>Linea 5B</p> <p>Linea 5A</p>

                            </div>
                        </div>
                    </div>
                   <div className="mt-2 mb-2">
                   <Title text="Contacto programador" />
                   </div>

                    <div>
                        <div className="d-flex ">
                            <div className="col-4">
                                <Subtitle text="Ezequiel López" />
                                <a href="mailto:contacto.ezequiel.lopez@gmail.com" className="col-xs-12 col-sm-12  col-md-4 col-xl-4  ">contacto.ezequiel.lopez@gmail.com</a>
                                <div className="d-flex">
                                    <a href="https://www.linkedin.com/in/ezequiel-l%C3%B3pez-94193b1b9" className="col-xs-12 col-sm-12  col-md-4 col-xl-4 main-color ">Linkedln</a>
                                    <a href="https://instagram.com/ezequielopez18" className="col-xs-12 col-sm-12  col-md-4 col-xl-4 main-color  ">Instagram</a>
                                </div>
                            </div>
                            <div className="col-4">
                                <Subtitle text="Tomás Castro" />
                                <a href="mailto:ttomycastro@gmail.com" className="col-xs-12 col-sm-12  col-md-4 col-xl-4 ">ttomycastro@gmail.com</a>
                                <div className="d-flex">
                                    <a href="..." className="col-xs-12 col-sm-12  col-md-4 col-xl-4 main-color ">Linkedln</a>
                                    <a href="..." className="col-xs-12 col-sm-12  col-md-4 col-xl-4  main-color">Instagram</a>
                                </div>
                            </div>
                            <div className="col-4">
                                <Subtitle text="Ayrton Sandoval" />
                                <a href="mailto:juanayrtonsandoval@gmail.com" className="col-xs-12 col-sm-12  col-md-4 col-xl-4  ">juanayrtonsandoval@gmail.com</a>
                                <div className="d-flex">
                                    <a href="..." className="col-xs-12 col-sm-12  col-md-4 col-xl-4 main-color ">Linkedln</a>
                                    <a href="..." className="col-xs-12 col-sm-12  col-md-4 col-xl-4 main-color ">Instagram</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </motion.div>
        </>
    )
}
