import { motion } from 'framer-motion'
import React from 'react'
import { Alert } from 'reactstrap'


export const AlertNotification = ({ variant, color, dimiss, message }) => {


    return (
        <motion.div exit={{ opacity: 1 }} initial={{ opacity: 0 }} animate={{ opacity: 2 }}><Alert color={color} toggle={dimiss} variant={variant}>{message}</Alert></motion.div>
    )
}
