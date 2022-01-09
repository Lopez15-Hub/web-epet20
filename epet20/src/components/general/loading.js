import { motion } from 'framer-motion'
import React from 'react'
import { Spinner, Row } from 'reactstrap'
import { Subtitle } from '../text-styles/subtitle'

export const LoadingSpinner = ({ text }) => {
    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Row>
                <Spinner className='main-color text-center  mt-5 mx-auto p-4 top-50  ' />
                <div className='text-center mt-4'>  <Subtitle text={text} /></div>
            </Row>
        </motion.div>
    )
}
