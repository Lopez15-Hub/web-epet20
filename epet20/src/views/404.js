import { motion } from 'framer-motion'
import React from 'react'
import { Subtitle } from '../components/text-styles/subtitle'
import { Title } from '../components/text-styles/title'

export const Error404 = () => {
    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>


            <div className="me-auto ">



                <div className="text-center position-fixed top-40 bottom-50 right-0 left-0">
                    <h1 className='text-1xl error_404'>404</h1>
                    <div className=''>

                        <Title text="¡Oops! Esta sección no existe en nuestra web." />
                    </div>

                </div>


            </div>
        </motion.div>
    )
}
