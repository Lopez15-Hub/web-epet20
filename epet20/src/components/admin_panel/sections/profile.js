
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, FormGroup, Form, Input, Label, Row } from 'reactstrap'
import { handleRoute } from '../../../actions/handleRoute'
import { auth } from '../../../firebase/firebaseConfig'
import { useForm } from '../../../hooks/useForm'
import { AlertNotification } from '../../general/alertNotification'
import { Subtitle } from '../../text-styles/subtitle'
import { Title } from '../../text-styles/title'
import { CardCredential } from '../profile/cardCredential'
import { Loading } from './loading'

export const Profile = () => {
    const [isLoading, setLoading] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [isError, setError] = useState(false);
    const [isWarning, setWarning] = useState(false);
    const { handleChange, values } = useForm();
    const { name, email, password } = values;
    const navigate = useNavigate();
    const isLoad = (loading) => {
        setLoading(loading);


    }
    const showSuccess = () => {
        setTimeout(() => {

            isLoad(false);
            setSuccess(true);
            setTimeout(() => {
                console.log("Sesión iniciada");
                setSuccess(false);
                handleRoute(navigate, 'usuario');
            }, 2000)
        })
    }
    const showError = () => {
        isLoad(false);
        setError(true);
        setTimeout(() => {
            console.log("Usuario o contraseña incorrectos")
            setSuccess(false);
            setError(false);
        }, 3000)
    }
    const showWarning = () => {
        isLoad(false);
        setWarning(true);
        setTimeout(() => {
            console.log("Debe ingresar todos los datos")
            setSuccess(false);
            setWarning(false);
        }, 3000)
    }
    const redirect = () => {
        setTimeout(() => {
            window.location.reload();
            window.location.replace("./")
        }, 1500)
    }

    const handleName = () => {
        updateProfile(auth.currentUser, {
            displayName: name
        }).then(() => {
            showSuccess();
            redirect();
        }).catch((error) => {
            showError();
            console.log(error)
        });
    }
    const handleEmail = () => {
        updateEmail(auth.currentUser, email).then(() => {
            showSuccess()
            redirect();
        }).catch((error) => {
            showError();
            console.log(error)
        });
    }
    const handlePassword = () => {
        updatePassword(auth.currentUser, password).then(() => {
            showSuccess()
            redirect();
        }).catch((error) => {
            showError();
            console.log(error)
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        isLoad(true)
        if (name) {
            handleName();

        } else if (email) {
            handleEmail();
        } else if (password) {
            handlePassword();

        } else if (!name && !email && !password) {
            showWarning();
        } else if (name && email && password) {
            handleName();
            handleEmail();
            handlePassword();
           

        }


    }
    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Container>
                <Row>

                    <div className='col-5'>   <CardCredential /></div>

                    <div className='mt-4 col-7'>
                        <div>
                            {isSuccess ? <AlertNotification variant="success" dimiss={() => setSuccess(false)} message="Datos Actualizados" /> : null}
                            {isError ? <AlertNotification color="danger" dimiss={() => setError(false)} message="Error algo salió mal" /> : null}
                            {isWarning ? <AlertNotification color="warning" dimiss={() => setWarning(false)} message="Debe rellenar al menos un campo" /> : null}
                        </div>

                        <Form className='mx-auto p-6 col-6 border shadow-md rounded-xl' onSubmit={handleSubmit}>
                            <Title text="Actualizar datos" />
                            <Subtitle text="Editar datos personales" />
                            <FormGroup>
                                <Label>
                                    Nombre
                                </Label>
                                <Input
                                    onChange={handleChange}

                                    name="name"
                                    placeholder={auth.currentUser.displayName ? auth.currentUser.displayName : 'Cargando...'}
                                    type="text" />


                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">
                                    Email
                                </Label>
                                <Input
                                    id="exampleEmail"
                                    name="email"
                                    placeholder={auth.currentUser.email}
                                    type="email"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">
                                    Contraseña
                                </Label>
                                <Input
                                    id="examplePassword"
                                    name="Actualizar contraseña"
                                    placeholder="Nueva contraseña"
                                    type="password"
                                />
                            </FormGroup>
                            <button type="submit" className=" col-12 btn my-btn text-white text-center shadow-md font-bold btn-block" >Guardar cambios </button>

                        </Form>
                        {isLoading ? <Loading text="Actualizando datos..." /> : null}
                    </div>
                </Row>
            </Container>
        </motion.div>
    )
}
