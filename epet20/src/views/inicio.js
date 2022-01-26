
import MyCarousel from '../components/inicio/carousel';

import Footer from '../components/inicio/footer';
import Section from '../components/inicio/section';
import React, { useEffect } from 'react'
import { Title } from '../components/text-styles/title';

import { motion } from 'framer-motion';

import { Signatures } from '../components/inicio/signatures';



export const Inicio = () => {
    useEffect(() => {
        document.title = "Inicio - E.P.E.T. N°20";
    },[])
    return (
        <>
            {/*Barra de navegación*/}


            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container  me-auto p-6 " >

                <div className="p-2 row my-shadow rounded-xl ">

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
