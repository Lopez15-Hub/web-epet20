import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/inicio/navbar'
import { PaginaEnConstruccion } from './we_working'
export const Secretaria = () => {
    return (
        <>
            <Navbar />
            <motion.div exit={{ opacity: 0, x: 200 }} initial={{ opacity: 1, x: 0 }} animate={{ opacity: 0, x: 200 }}>

                <PaginaEnConstruccion />
            </motion.div>
        </>
    )
}
