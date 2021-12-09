import { motion } from 'framer-motion';
import React from 'react'
import { Title } from '../text-styles/title'
import { Usuarios } from './sections/usuarios';

export const Main = () => {
    const View = ({view}) => {
        switch (view) {
            case 0:
                return <Usuarios />;
            case 1:
                return <Title text="vista 1" />;
            case 2:
                return <Title text="vista 2" />;
            case 3:
                return <Title text="vista 3" />;
            default:
                return null;
        }
    };

    return (
        <motion.div>

            <div className="col-10 "><View view={0} /></div>


        </motion.div>
    )
}
