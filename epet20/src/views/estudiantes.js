import { motion } from 'framer-motion'
import React from 'react'
import { PaginaEnConstruccion } from './we_working'
export const Estudiantes = () => {
    return (
        <>
            
            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

                <PaginaEnConstruccion />
            </motion.div>
        </>
    )
}
