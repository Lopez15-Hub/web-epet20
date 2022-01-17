import React from 'react'
import { Subtitle } from '../components/text-styles/subtitle'
import { Title } from '../components/text-styles/title'
import Image from '../assets/weWorking.jpg';
import { motion } from 'framer-motion';
import { LoadingSpinner } from '../components/general/loading';
export const PaginaEnConstruccion = () => {
    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>


            <div className="container-fluid top-40  position-absolute ">


                <div className="row ">
                    <div className="col-12" />
                   { 
                   
                   Image?
                   <img className="img-fluid img p-2 w-auto mx-auto shadow-lg rounded-xl" src={Image} alt="estamos trabajando" />: <LoadingSpinner />
                   
                   }


                </div>

                <div className="row">

                    <div className="text-center col-12">

                        <Title text="¡Oops! Continuamos trabajando. Muy pronto podrás visitar esta sección." />
                        <Subtitle text="¡Inténtalo de nuevo más tarde! ;))" />

                    </div>

                </div>
            </div>
        </motion.div>
    )
}
