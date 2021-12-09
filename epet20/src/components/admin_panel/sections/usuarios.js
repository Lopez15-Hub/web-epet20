import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row } from 'reactstrap'
import { useGet } from '../../../hooks/useGet'
import { Subtitle } from '../../text-styles/subtitle'

import { Title } from '../../text-styles/title'
import { UserTable } from '../table/user_table'



export const Usuarios = () => {
    const { users } = useGet();

    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

            <Container>
                <Title text="Usuarios" />
                <Row>
                    <div>
                        <Link to="users/add" className='shadow-md btn my-outlined-button'>Añadir usuario</Link>
                    </div>
                </Row>
            </Container>
            <Container>
                <Title text="Lista de usuarios" />
                <Subtitle text={`Usuarios totales: ${users.length}`} />
                <UserTable />
            </Container>

        </motion.div>
    )
}
