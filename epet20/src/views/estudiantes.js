import { motion } from 'framer-motion'
import React from 'react'
import Navbar from '../components/inicio/navbar'
import { PaginaEnConstruccion } from './we_working'
export const Estudiantes = () => {
    return (
        <>
            <Navbar />
            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

                <PaginaEnConstruccion />
            </motion.div>
        </>
    )
}
