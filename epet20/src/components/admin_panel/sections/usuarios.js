import { deleteDoc, doc } from 'firebase/firestore'
import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Container, ListGroup, ListGroupItem, Row } from 'reactstrap'
import { db } from '../../../firebase/firebaseConfig'
import { useGet } from '../../../hooks/query_hooks/useGet'
import { useLoading } from '../../../hooks/useLoading'
import { useScreenWidth } from '../../../hooks/useScreenWidth'
import { AlertNotification } from '../../general/alertNotification'
import { Subtitle } from '../../text-styles/subtitle'

import { Title } from '../../text-styles/title'
import { UserTable } from '../table/user_table'
import { Loading } from './loading'



export const Usuarios = () => {
    const { users } = useGet();
    const { loading, setLoading, alertMessage, setAlertMessage, setSuccess, success, warning, error, setError, setWarning, restartAlertsState } = useLoading();
    const { screenWidth } = useScreenWidth();

    useEffect(() => {
        let mounted = true;
        const getId = () => {
            setLoading(true);
            const id = users.map(user => user.id);
            if (id.length > 0) {
                setLoading(false);
                return id;
            }

        }
        if (mounted) {
            getId();
        }
        return () => mounted = false;

    })


    const deleteUser = async (id) => {
        var confirm = window.confirm("Esta seguro que desea eliminar a este usuario? Esta acción es irreversible.");
        if (confirm) {

            setLoading(true);
            const userRef = doc(db, 'users', id);
            await deleteDoc(userRef).then(() => {

                setLoading(false);
                console.log("Usuario eliminado.")
                setAlertMessage("Usuario eliminado correctamente.")
                setSuccess(true)
                restartAlertsState();
            }).catch(err => {
                setLoading(false);
                setAlertMessage("Ha ocurrido un error al eliminar al usuario: " + err.code)
                setError(true)
                restartAlertsState();
            });
            setLoading(false);

        }


    }

    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

            <Container>
                {success ?
                    <AlertNotification variant="success" dimiss={() => setSuccess(false)} message={alertMessage} /> :
                    error ? <AlertNotification color="danger" dimiss={() => setError(false)} message={alertMessage} /> : warning ?
                        <AlertNotification color="warning" dimiss={() => setWarning(false)} message={alertMessage} /> : ''
                }
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
