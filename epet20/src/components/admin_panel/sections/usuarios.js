import { deleteDoc, doc } from 'firebase/firestore'
import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Container, ListGroup, ListGroupItem, Row } from 'reactstrap'
import { db } from '../../../firebase/firebaseConfig'
import { useGet } from '../../../hooks/query_hooks/useGet'
import { UseLoading } from '../../../hooks/useLoading'
import { useScreenWidth } from '../../../hooks/useScreenWidth'
import { Subtitle } from '../../text-styles/subtitle'

import { Title } from '../../text-styles/title'
import { UserTable } from '../table/user_table'
import { Loading } from './loading'



export const Usuarios = () => {
    const { users } = useGet();
    const { loading, setLoading } = UseLoading();
    const { screenWidth } = useScreenWidth();
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

    const deleteUser = async (id) => {
        var confirm = window.confirm("Esta seguro que desea eliminar a este usuario? Esta acción es irreversible.");
        if (confirm) {

            setLoading(true);
            const userRef = doc(db, 'users', id);
            await deleteDoc(userRef).then(() => {
                window.alert("Usuario eliminado correctamente.");
                setLoading(false);
                window.location.reload();
            }).catch(err => {

            });
            setLoading(false);

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
                            <Title text="Lista de usuarios" /><Subtitle text={`Usuarios totales: ${users.length}`} />
                            {screenWidth >= 1366 ? <UserTable /> : <>

                                {users.map(user =>
                                    <ListGroup key={user.id} className='p-2'>
                                        <ListGroupItem>
                                            <p className='font-bold'> Identificador de usuario</p>
                                            <p> {user.id + " "}</p>
                                        </ListGroupItem>

                                        <ListGroupItem>
                                            <p className='font-bold'> Nombre</p>
                                            <p> {user.name + " "}{user.apellido ? user.apellido : ''}</p>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <p className='font-bold'> Teléfono </p>
                                            <p>{user.phone ? user.phone : 'Teléfono: Sin especificar'}</p>
                                        </ListGroupItem>
                                        <ListGroupItem                                        >
                                            <p className='font-bold'> Email </p>
                                            <p>{user.email ? user.email : 'Email sin especificar.'}</p>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                            <p className='font-bold'>Rol</p><p>{user.role}</p>
                                        </ListGroupItem>

                                        <ListGroupItem className='d-flex'>
                                            <Link to={"./" + user.id} className=' btn main-color d-flex' id="exampleSelect" ><p className='mr-2'>Editar</p><FaEdit /></Link>
                                            <button type="button" className='btn red d-flex' id="exampleSelect" onClick={() => deleteUser(user.id)}  ><p className='mr-2'>Eliminar</p><FaTrash /></button>
                                        </ListGroupItem>

                                    </ListGroup>


                                )}

                            </>}
                        </motion.div> : <div>

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
