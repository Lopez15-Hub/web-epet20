import React from 'react'


import { Title } from '../components/text-styles/title'
import { motion } from 'framer-motion'
import Advertisements from '../components/novedades/Advertisements'
import BoxComments from '../components/novedades/BoxComments'
import Footer from '../components/inicio/footer'
export const Novedades = () => {
    return (
        <>
            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mt-4 ">
            <div className=" p-6 shadow-lg rounded-t-xl">
               {/*  Area de novedades de la escuela */}
            <Title text="Área de novedades" />
            {/* Sección de Anuncios */}
            <Advertisements/>
            {/* Caja de comentarios */}
            <BoxComments/>
            <br />
            <Footer/>
            </div>
            </motion.div>
        </>
    )
}
