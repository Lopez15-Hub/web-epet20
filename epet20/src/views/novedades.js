import React from 'react'
import Navbar from '../components/inicio/navbar'
import { PaginaEnConstruccion } from './we_working'
import { motion } from 'framer-motion'
export const Novedades = () => {
    return (
        <>
            <Navbar />
            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

                <PaginaEnConstruccion />
            </motion.div>
        </>
    )
}
