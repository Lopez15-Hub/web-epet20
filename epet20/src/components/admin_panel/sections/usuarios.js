import { motion } from 'framer-motion'
import React, { useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Container, Row } from 'reactstrap'
import { useGet } from '../../../hooks/query_hooks/useGet'
import { UseLoading } from '../../../hooks/useLoading'
import { Subtitle } from '../../text-styles/subtitle'

import { Title } from '../../text-styles/title'
import { UserTable } from '../table/user_table'
import { Loading } from './loading'



export const Usuarios = () => {
    const { users } = useGet();
    const { loading, setLoading } = UseLoading();
    useEffect(() => {
        getId();
    })
    const getId = () => {
        setLoading(true);
        const id = users.map(user => user.id);
        if (id.length > 0) {
            setLoading(false);
            return id;
        }

    }


    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

            <Container>

                {
                    loading ? <Loading text="Cargando usuarios..." /> :

                        users.length !== 0 ? <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

                            <Row>
                                <div className='mt-4'>
                                    <Link to="./add" className='shadow-md btn my-outlined-button'>Añadir usuario</Link>
                                </div>
                            </Row>
                            <Title text="Lista de usuarios" /><Subtitle text={`Usuarios totales: ${users.length}`} /><UserTable /></motion.div> : <div>

                            <Row>
                                <div className='mt-4'>
                                    <Link to="./add" className='shadow-md btn my-outlined-button'>Añadir usuario</Link>
                                </div>
                            </Row>
                            <Title text="No hay usuarios disponibles" />
                        </div>


                }



            </Container>

        </motion.div>
    )
}
