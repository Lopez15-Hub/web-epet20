import React from 'react'
import { PaginaEnConstruccion } from './we_working'
import { motion } from 'framer-motion'
export const Novedades = () => {
    return (
        <>
            
            <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

                <PaginaEnConstruccion />
            </motion.div>
        </>
    )
}
