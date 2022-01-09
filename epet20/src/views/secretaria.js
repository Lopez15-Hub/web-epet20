import React from 'react'
import { motion } from 'framer-motion'
import { Title } from '../components/text-styles/title'
import Footer from '../components/inicio/footer'
import { AboutTutorial } from '../components/secretaria/about_tutorial'
import { Anuncios } from '../components/secretaria/sectores/anuncios'
import { Sectores } from '../components/secretaria/sectores'
export const Secretaria = () => {
    return (
        <>
            {/*Barra de navegación*/}
            

            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container shadow-xl bg-white rounded-xl mt-7 " >

                <div className="row ">
                    <Title text="Area de secretaría" />
                    {/*Lateral izquierdo con información de la sección y tutorial */}
                    <AboutTutorial />
                    {/*Anuncios realizados por la administración */}
                    <Anuncios />

                    <hr className="mt-4" />
                    <Title text="Elije un sector" />

                    {/*Selección de sector */}
                    <Sectores />
                </div>


            </motion.div>
            {/*Footer*/}
            <Footer />

        </>
    )
}
