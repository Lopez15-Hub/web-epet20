
import MyCarousel from '../components/inicio/carousel';

import Footer from '../components/inicio/footer';
import Section from '../components/inicio/section';
import React from 'react'
import { Title } from '../components/text-styles/title';

import { motion } from 'framer-motion';

import { Signatures } from '../components/inicio/signatures';



export const Inicio = () => {

    return (
        <>
            {/*Barra de navegación*/}


            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container shadow-xl bg-white rounded-xl p-6 " >

                <div className="row">

                    <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                        <div className="mb-4">
                            <Title text="Bienvenido a nuestra institución" />
                        </div>
                        {/*Carousel de imágenes*/}
                        <MyCarousel />
                        {/*Stack de materias*/}
                        <div className="mt-4">
                            <Title text="En esta escuela aprenderás" />
                        </div>
                        <Signatures />
                    </div>

                    <Section />



                </div>


            </motion.div>
            {/*FOOOTER*/}
            <Footer />
        </>

    )
}
