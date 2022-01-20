
import { updateEmail, updatePassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { Container, FormGroup, Form, Input, Label, Row } from 'reactstrap'

import { auth, db } from '../../../firebase/firebaseConfig'
import { useForm } from '../../../hooks/useForm'
import { UseLoading } from '../../../hooks/useLoading'
import { useRole } from '../../../hooks/useRole'
import { AlertNotification } from '../../general/alertNotification'
import { Subtitle } from '../../text-styles/subtitle'
import { Title } from '../../text-styles/title'
import { CardCredential } from '../profile/cardCredential'
import { Loading } from './loading'
export const updateUserInFirestore = async (loginType, name, apellido, email, password, role) => {
    const usersRef = doc(db, 'users', auth.currentUser.uid)
    await setDoc(usersRef, {
        "name": name ? name : auth.currentUser.displayName,
        "apellido": apellido ? apellido : "",
        "email": email ? email : auth.currentUser.email,
        "password": password ? password : "",
        "role": role,
        "loginType": loginType,


    }).then(() => {
        console.log("Usuario creado correctamente en la base de datos.");
    }).catch(err => {
        console.log("Ha ocurrido un error al guardar en la bd: ", err.code)
    });

}
export const Profile = () => {
    const { loading, success, error, warning, alertMessage, setLoading, setSuccess, setError, setWarning, setAlertMessage, restartAlertsState } = UseLoading();
    const { handleChange, values } = useForm();
    const { name, email, newPassword } = values;
    const { role } = useRole();

    const redirect = () => {
        setTimeout(() => {
            window.location.reload();
            window.location.replace("./perfil")
        }, 1500)
    }

    const handleName = () => {
        updateProfile(auth.currentUser, {
            displayName: name
        }).then(() => {
            setAlertMessage("Datos actualizados exitosamente.")
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
            setAlertMessage("Datos actualizados exitosamente.")
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
        updatePassword(auth.currentUser, newPassword).then(() => {


            setAlertMessage("Datos actualizados exitosamente.")
            console.log("Contraseña actualizada.")
            console.log("nueva contraseña", newPassword);
            setLoading(false);
            setSuccess(true);
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
        if (!values) {
            setAlertMessage("Debes rellenar al menos un campo para actualizar tu perfil.")
            setLoading(false);
            setWarning(true);
            restartAlertsState();

        } else {
            handleName();
            handleEmail();
            handlePassword();

        }


    }
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user && role) {
                console.log(role);
                updateUserInFirestore("FirebaseAuth", auth.currentUser.displayName, '', auth.currentUser.email, newPassword, role);
            }
        })
    })
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

                        <Form className='mx-auto p-6 col-sm-12 col-xs-12 col-md-12 border shadow-md rounded-xl mb-4' onSubmit={handleSubmit}>
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
                                <Label htmlFor="exampleEmail">
                                    Email
                                </Label>
                                <Input
                                    id="exampleEmail"
                                    name="email"
                                    onChange={handleChange}
                                    placeholder={auth.currentUser.email}
                                    type="email"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="examplePassword">
                                    Contraseña
                                </Label>
                                <Input
                                    id="examplePassword"
                                    name="newPassword"
                                    onChange={handleChange}
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
