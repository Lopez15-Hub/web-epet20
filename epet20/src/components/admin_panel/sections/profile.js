
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth'
import { motion } from 'framer-motion'
import React from 'react'
import { Container, FormGroup, Form, Input, Label, Row } from 'reactstrap'

import { auth } from '../../../firebase/firebaseConfig'
import { useForm } from '../../../hooks/useForm'
import { UseLoading } from '../../../hooks/useLoading'
import { AlertNotification } from '../../general/alertNotification'
import { Subtitle } from '../../text-styles/subtitle'
import { Title } from '../../text-styles/title'
import { CardCredential } from '../profile/cardCredential'
import { Loading } from './loading'

export const Profile = () => {
    const { loading, success, error, warning, alertMessage, setLoading, setSuccess, setError, setWarning, setAlertMessage } = UseLoading();
    const { handleChange, values } = useForm();
    const { name, email, password } = values;


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
            setAlertMessage("Nombre actualizado exitosamente.")
            setSuccess(true);
            setLoading(false);
            redirect();
        }).catch((error) => {
            setAlertMessage("Ha ocurrido un error al actualizar el nombre: " + error.code)
            setError();
            setLoading(false);
            console.log(error)
        });
    }
    const handleEmail = () => {
        updateEmail(auth.currentUser, email).then(() => {
            setAlertMessage("Email actualizado exitosamente.")
            setSuccess(true);
            setLoading(false);
            redirect();
        }).catch((error) => {
            setAlertMessage("Ha ocurrido un error al actualizar el email: " + error.code);
            setError();
            setLoading(false);
            console.log(error)
        });
    }
    const handlePassword = () => {
        updatePassword(auth.currentUser, password).then(() => {
            setSuccess(true);
            setLoading(false);
            redirect();
        }).catch((error) => {
            setAlertMessage("Ha ocurrido un error al actualizar la contraseña: " + error.code);
            setError(true);
            setLoading(false);

            console.log(error)
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        if (name) {
            handleName();

        } else if (email) {
            handleEmail();
        } else if (password) {
            handlePassword();

        } else if (!name && !email && !password) {
            setAlertMessage("Debes rellenar al menos un campo para actualizar tu perfil.")
            setLoading(false);
            setWarning(true);
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

                    <div className='col-sm-12 col-xs-12 col-md-6'>   <CardCredential /></div>

                    <div className='mt-4 col-sm-12 col-xs-12 col-md-6'>
                        <div>
                            {success ?
                                <AlertNotification variant="success" dimiss={() => setSuccess(false)} message={alertMessage} /> :
                                error ? <AlertNotification color="danger" dimiss={() => setError(false)} message={alertMessage} /> : warning ?
                                    <AlertNotification color="warning" dimiss={() => setWarning(false)} message={alertMessage} /> : ''
                            }
                        </div>

                        <Form className='mx-auto p-6 col-sm-12 col-xs-12 col-md-12 border shadow-md rounded-xl' onSubmit={handleSubmit}>
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
                        {loading ? <Loading text="Actualizando datos..." /> : null}
                    </div>
                </Row>
            </Container>
        </motion.div>
    )
}
