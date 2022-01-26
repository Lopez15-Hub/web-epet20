import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { Alert } from 'reactstrap'


export const AlertNotification = ({ variant, color, dimiss, message }) => {
    const [show, setShow] = React.useState(true);
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            setTimeout(() => {
                setShow(false);

            }, 3000);
        }


        return () => {
            setShow(true);
            console.log("Cerrando alerta")
            mounted = false;
        }
    }, [show, setShow])


    return (
        show ? <motion.div exit={{ opacity: 1 }} initial={{ opacity: 0 }} animate={{ opacity: 2 }}><Alert color={color} toggle={dimiss} variant={variant}>{message}</Alert></motion.div> : ''
    )
}
