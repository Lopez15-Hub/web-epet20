import React from 'react'
import { Subtitle } from '../components/text-styles/subtitle'
import { Title } from '../components/text-styles/title'
import Image from '../assets/weWorking.jpg';
import { motion } from 'framer-motion';
import { LoadingSpinner } from '../components/general/loading';
export const PaginaEnConstruccion = () => {
    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>


            <div className="me-auto">

                <img className="img-fluid position-fixed top-40 right-0 left-0 img  w-auto mx-auto shadow-lg rounded-xl" src={Image} alt="estamos trabajando" />



                <div className="text-center position-fixed top-50 right-0 left-0 ">

                    <Title text="¡Oops! Continuamos trabajando. Muy pronto podrás visitar esta sección." />
                    <Subtitle text="¡Inténtalo de nuevo más tarde! ;))" />


                </div>
            </div>
        </motion.div>
    )
}
