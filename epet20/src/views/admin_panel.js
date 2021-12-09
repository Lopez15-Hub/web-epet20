
import React from 'react'
import { Title } from '../components/text-styles/title'
import { Menu } from '../components/admin_panel/menu';
import { motion } from 'framer-motion';
import { Main } from '../components/admin_panel/main';
export const AdminPanel = () => {
    return (

        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="container-fluid rounded-md">
                <div className="row">
                    <Menu />
                    <Main />

                </div>
            </div>
        </motion.div>
    )
}
