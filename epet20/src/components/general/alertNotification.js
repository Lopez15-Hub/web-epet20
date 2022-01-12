import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { Alert } from 'reactstrap'


export const AlertNotification = ({ variant, color, dimiss, message }) => {
    const [show, setShow] = React.useState(true);
    useEffect(() => {
        setTimeout(() => {
            setShow(false);

        }, 3000);
        return () => {
            setShow(show);
            console.log("Cerrando alerta")
        }
    }, [])

    return (
        show ? <motion.div exit={{ opacity: 1 }} initial={{ opacity: 0 }} animate={{ opacity: 2 }}><Alert color={color} toggle={dimiss} variant={variant}>{message}</Alert></motion.div> : ''
    )
}
