import React from 'react'

import Navbar from '../components/inicio/navbar'
import { Title } from '../components/text-styles/title';
import Footer from '../components/inicio/footer';
import { motion } from 'framer-motion';
import { ContactoProgramador } from '../components/contacto/contacto_programador';
import { ComoLlegar } from '../components/contacto/comoLlegar';
import { SocialLinks } from '../components/contacto/social_links';
import { Contactanos } from '../components/contacto/contactanos';
export const Contacto = () => {
    return (
        <>
            <Navbar />
            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mt-4 ">
                <div className=" p-6 shadow-lg rounded-t-xl">
                    {/*Sección de contacto de la escuela */}
                    <Title text="Contactanos" />
                    <Contactanos />
                    <hr className="mt-4" />
                    {/*Redes sociales */}
                    <Title text="Siguenos en nuestras redes sociales" />
                    <SocialLinks />
                    <hr className="mt-4" />
                    {/*Cómo llegar*/}
                    <Title text="Cómo llegar" />
                    <ComoLlegar />
                    {/*Contacto programador*/}
                    <hr className="mt-4" />
                    <div className="mt-2 mb-2">
                        <Title text="Contacto programador" />
                    </div>

                    <ContactoProgramador />
                </div>
                <Footer />
            </motion.div>
        </>
    )
}
