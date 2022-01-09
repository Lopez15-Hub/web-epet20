import { addDoc, collection } from 'firebase/firestore'
import { motion } from 'framer-motion'
import React from 'react'
import { Button, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { auth, db } from '../../../../firebase/firebaseConfig'
import { useForm } from '../../../../hooks/useForm'
import { UseLoading } from '../../../../hooks/useLoading'
import { AlertNotification } from '../../../general/alertNotification'
import { LoadingSpinner } from '../../../general/loading'
import { Title } from '../../../text-styles/title'

export const AñadirAnuncio = () => {
    const { handleChange, values } = useForm();
    const { loading, success, error, warning, alertMessage, setLoading, setSuccess, setError, setWarning, setAlertMessage } = UseLoading();
    const { title, description, } = values;
    const date = new Date();

    const createForm = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "anuncios"), {
                title: title,
                description: description,
                submitAt: date,
                submitBy: auth.currentUser.displayName,
            });

            console.log("Document written with ID: ", docRef.id);
            setAlertMessage("Anuncio guardado exitosamente.")
            setLoading(false);
            setSuccess(true);

        } catch (err) {
            if (title === null || title === "" || description === null || description === "") {
                setLoading(false);
                setWarning(true);
                setAlertMessage("Debes rellenar todos los campos para crear un anuncio.");
            } else {
                setAlertMessage("Ha ocurrido un error al añadir los documentos: " + err.code)
                setLoading(false);
                setError(true);

                console.error("Error adding document: ", e);
            }


        }
    }
    const handleClick = (loading) => {
        setLoading(loading);
    }
    return (
        <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Container>
                {success ?
                    <AlertNotification variant="success" dimiss={() => setSuccess(false)} message={alertMessage} /> :
                    error ? <AlertNotification color="danger" dimiss={() => setError(false)} message={alertMessage} /> : warning ?
                        <AlertNotification color="warning" dimiss={() => setWarning(false)} message={alertMessage} /> : ''
                }
                <Row>
                    <Title text="Añadir un anuncio" />


                    <Form onSubmit={createForm}>
                        <FormGroup>
                            <Label htmlFor="exampleEmail">
                                Titulo
                            </Label>
                            <Input
                                onChange={handleChange}
                                id="exampleEmail"
                                name="title"
                                placeholder="Ingrese un titulo"
                                type="text"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="exampleEmail">
                                Descripción
                            </Label>
                            <Input
                                onChange={handleChange}
                                id="exampleEmail"
                                name="description"

                                type="textarea"
                                maxLength="500"
                            />
                        </FormGroup>

                        <Button type='submit' onClick={() => handleClick(true)} className='my-btn btn' >Añadir anuncio</Button>
                        {loading ? <LoadingSpinner text="Subiendo..." /> : ''}
                    </Form>


                </Row>
            </Container>
        </motion.div>)
}
