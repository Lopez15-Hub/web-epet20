import React, { useEffect } from 'react'
import { Subtitle } from '../components/text-styles/subtitle'
import { Title } from '../components/text-styles/title'
import Image from '../assets/weWorking.jpg';
import { motion } from 'framer-motion';
export const PaginaEnConstruccion = () => {
    useEffect(() => {
        document.title = "Sitio en construcción - E.P.E.T. N°20";
    },[])
    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='pt-5 mt-5'>


            <div className="me-auto">

                <img className="img-fluid img  w-auto mx-auto shadow-lg rounded-xl " src={Image} alt="estamos trabajando" />



                <div className="text-center">

                    <Title text="¡Oops! Continuamos trabajando. Muy pronto podrás visitar esta sección." />
                    <Subtitle text="¡Inténtalo de nuevo más tarde! ;))" />


                </div>
            </div>
        </motion.div>
    )
}
